import { NextRequest, after } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt, chatbotConfig } from "@/lib/chatbot/knowledge";
import { isValidConversationId, logMessage, requestMeta, upsertConversation, type VisitorInfo } from "@/lib/chat-log";

const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

// Models that just failed (429 quota / 503 overload) are skipped for a minute.
const modelCooldown = new Map<string, number>();
const COOLDOWN_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        content:
          "Chat is currently unavailable. Please use the contact page to reach Atif directly.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  // Resolved with the final bot reply (or fallback) so the background logger can save it.
  let finishReply: (reply: { text: string; model?: string }) => void = () => {};
  const replyDone = new Promise<{ text: string; model?: string; latencyMs: number }>((resolve) => {
    const startedAt = Date.now();
    finishReply = (reply) => resolve({ ...reply, latencyMs: Date.now() - startedAt });
  });

  try {
    // ── Safely parse the request body ──
    let body: {
      messages?: { role: string; content: string }[];
      /** Optional: lets the admin panel record this conversation */
      conversationId?: string;
      visitor?: VisitorInfo;
      visitorId?: string;
      sessionId?: string;
      isVoice?: boolean;
    };
    try {
      body = await req.json();
    } catch (parseErr) {
      console.error("Chat API: Failed to parse request body:", parseErr);
      return new Response(
        JSON.stringify({ content: "Hey! Something went wrong with your message. Please try again." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const messages = (body.messages || [])
      .filter((m) => m && typeof m.content === "string" && m.content.trim())
      .slice(-30)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? ("model" as const) : ("user" as const),
        content: m.content.slice(0, 4000),
      }));

    if (!messages.length) {
      return new Response(
        JSON.stringify({ error: "No messages" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Merge consecutive same-role messages (the chat UI sends multi-bubble replies)
    // so Gemini always receives a clean user/model alternating history.
    const merged: { role: "user" | "model"; parts: { text: string }[] }[] = [];
    for (const m of messages) {
      const prev = merged[merged.length - 1];
      if (prev && prev.role === m.role) prev.parts[0].text += `\n\n${m.content}`;
      else merged.push({ role: m.role, parts: [{ text: m.content }] });
    }

    // Gemini requires history to start with "user" — drop leading "model" turns
    while (merged.length > 0 && merged[0].role === "model") merged.shift();

    const last = merged.pop();
    if (!last || last.role !== "user") {
      return new Response(
        JSON.stringify({ error: "Last message must be from the user" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const history = merged;
    const lastMessage = last.parts[0].text;

    // ── Admin panel logging: runs after the response, never slows the reply ──
    const conversationId = body.conversationId;
    if (isValidConversationId(conversationId)) {
      const meta = requestMeta(req.headers);
      const visitorText = messages[messages.length - 1].content;
      const visitor = body.visitor ?? {};
      const ids = { visitorId: body.visitorId, sessionId: body.sessionId, page: "/chat" };
      const isVoice = body.isVoice === true;
      after(async () => {
        await upsertConversation(conversationId, visitor, meta, ids);
        await logMessage(conversationId, "user", visitorText, { isVoice, page: "/chat" });
        const reply = await replyDone;
        await logMessage(conversationId, "assistant", reply.text, { model: reply.model, latencyMs: reply.latencyMs, page: "/chat" });
      });
    }

    // ── Failover model chain (benchmarked Oct 2026) ──
    // Working + fast models first. The configured model (GEMINI_MODEL) stays in the chain
    // but no longer goes first: it was hitting 429 quota limits and stalling every reply.
    const candidateModels = Array.from(
      new Set([
        "gemini-3.5-flash",
        "gemini-flash-lite-latest",
        process.env.GEMINI_MODEL || chatbotConfig.defaultModel,
        ...chatbotConfig.fallbackModels,
      ])
    );
    // Skip models that failed recently (429/503) so visitors don't wait on them again.
    const now = Date.now();
    const available = candidateModels.filter((m) => (modelCooldown.get(m) ?? 0) < now);
    const ordered = available.length ? available : candidateModels;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = null;
    let lastErr: unknown = null;
    let usedModel = "";

    for (const modelName of ordered) {
      try {
        const model = genAI.getGenerativeModel(
          { model: modelName, systemInstruction: systemPrompt },
          { timeout: 10_000 } // don't let one stuck model hang the reply
        );

        const chat = model.startChat({
          history,
          generationConfig: {
            maxOutputTokens: chatbotConfig.maxTokens,
            temperature: 0.7,
          },
        });

        result = await chat.sendMessageStream(lastMessage);
        usedModel = modelName;
        break; // Stream successfully started
      } catch (err: unknown) {
        lastErr = err;
        modelCooldown.set(modelName, Date.now() + COOLDOWN_MS);
        console.warn(`Model ${modelName} unavailable, trying next:`, (err as { status?: number })?.status || (err as Error)?.message);
        continue;
      }
    }

    if (!result) {
      throw lastErr || new Error("All candidate models failed");
    }

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        let full = "";
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              full += text;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          finishReply({ text: full, model: usedModel });
        } catch (err) {
          console.error("Stream error:", err);
          const fallback = "Hey! We're experiencing momentary high demand. Feel free to explore the topics above, or connect directly on WhatsApp (+92 319 6780720)!";
          finishReply({ text: full + fallback, model: `${usedModel} (stream error)` });
          try {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ text: fallback })}\n\n`
              )
            );
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch {
            /* visitor already disconnected */
          }
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const fallback =
      "Hey! We are currently experiencing high server traffic. Atif specializes in AI Video Production, n8n Automation, and AI Agents. Feel free to use the topics below or reach out directly via WhatsApp (+92 319 6780720) or /book!";
    finishReply({ text: fallback, model: "fallback (all models failed)" });
    return new Response(
      JSON.stringify({
        content: fallback,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
