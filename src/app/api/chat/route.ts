import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt, chatbotConfig } from "@/lib/chatbot/knowledge";

const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

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

  try {
    // ── Safely parse the request body ──
    let body: { messages?: { role: string; content: string }[] };
    try {
      body = await req.json();
    } catch (parseErr) {
      console.error("Chat API: Failed to parse request body:", parseErr);
      return new Response(
        JSON.stringify({ content: "Hey! Something went wrong with your message. Please try again." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const messages = (body.messages || []).slice(-20).map(
      (m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, 2000),
      })
    );

    if (!messages.length) {
      return new Response(
        JSON.stringify({ error: "No messages" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Convert messages to Gemini format (history + last message)
    let history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Gemini requires history to start with "user" role — drop leading "model" messages
    while (history.length > 0 && history[0].role === "model") {
      history = history.slice(1);
    }

    const lastMessage = messages[messages.length - 1].content;

    // ── Failover model chain — verified against ListModels API ──
    const candidateModels = Array.from(
      new Set([
        process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
        "gemini-flash-lite-latest",
        "gemini-2.5-flash-lite",
        "gemini-2.5-flash",
      ])
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = null;
    let lastErr: unknown = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemPrompt,
        });

        const chat = model.startChat({
          history,
          generationConfig: {
            maxOutputTokens: chatbotConfig.maxTokens,
            temperature: 0.7,
          },
        });

        result = await chat.sendMessageStream(lastMessage);
        break; // Stream successfully started
      } catch (err: unknown) {
        lastErr = err;
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
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: "Hey! We're experiencing momentary high demand. Feel free to explore the topics above, or connect directly on WhatsApp (+92 319 6780720)!" })}\n\n`
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
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
    return new Response(
      JSON.stringify({
        content:
          "Hey! We are currently experiencing high server traffic. Atif specializes in AI Video Production, n8n Automation, and AI Agents. Feel free to use the topics below or reach out directly via WhatsApp (+92 319 6780720) or /book!",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
