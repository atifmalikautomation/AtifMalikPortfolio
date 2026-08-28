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
    const body = await req.json();
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
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });

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

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: chatbotConfig.maxTokens,
        temperature: 0.7,
      },
    });

    // Streaming response
    const result = await chat.sendMessageStream(lastMessage);
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
              `data: ${JSON.stringify({ text: "Sorry, something went wrong. Please try the contact page." })}\n\n`
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
          "Something went wrong. Please try the contact form instead.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
