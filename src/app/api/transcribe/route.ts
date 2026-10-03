import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatbotConfig } from "@/lib/chatbot/knowledge";

/**
 * Voice → text for the chat mic button.
 * The browser records audio (webm/ogg/mp4) and posts it here as base64.
 * Gemini transcribes it (handles English, Urdu, Roman Urdu, Hindi & code-mixing),
 * then the client sends the transcript through the normal /api/chat flow.
 */

const MAX_BYTES = 8 * 1024 * 1024; // ~8 MB (≈ several minutes of opus audio)

const rateLimitMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 15) return false;
  entry.count++;
  return true;
}

const TRANSCRIBE_PROMPT = `Transcribe this voice message from a visitor on Atif Malik's website (an AI video production & automation agency).

Rules:
- Output ONLY the transcript text. No quotes, no labels, no commentary.
- Write exactly what was said, cleaned of filler sounds (um, uh) and with natural punctuation.
- English speech → English.
- Urdu/Hindi or mixed Urdu-English speech → write it in Roman Urdu (Latin letters), keeping English words in English. Example: "mujhe apne business ke liye AI video ad chahiye".
- Arabic or other languages → write in that language's normal script.
- Correctly spell tech terms: n8n, GoHighLevel (GHL), ElevenLabs, Kling, Higgsfield, Veo, Sora, Runway, Midjourney, WhatsApp, Shopify, ChatGPT, Claude, Gemini, CRM, API.
- If there is no intelligible speech, output exactly: [NO_SPEECH]`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json({ error: "Too many voice messages. Please wait a moment." }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "Voice is currently unavailable." }, { status: 503 });

  let body: { audio?: string; mimeType?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const audio = body.audio;
  // Strip codec params ("audio/webm;codecs=opus" → "audio/webm")
  const mimeType = (body.mimeType || "audio/webm").split(";")[0].trim();
  if (!audio || typeof audio !== "string" || !mimeType.startsWith("audio/")) {
    return Response.json({ error: "No audio received." }, { status: 400 });
  }
  if (audio.length * 0.75 > MAX_BYTES) {
    return Response.json({ error: "Voice message is too long. Please keep it under a minute." }, { status: 413 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const models = Array.from(
    new Set([process.env.GEMINI_MODEL || chatbotConfig.defaultModel, chatbotConfig.defaultModel, ...chatbotConfig.fallbackModels])
  );

  let lastErr: unknown = null;
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ inlineData: { mimeType, data: audio } }, { text: TRANSCRIBE_PROMPT }],
          },
        ],
        generationConfig: { temperature: 0, maxOutputTokens: 1024 },
      });
      const text = result.response.text().trim();
      if (!text || text.includes("[NO_SPEECH]")) {
        return Response.json({ text: "", error: "I couldn't hear anything clearly. Please try again a bit closer to the mic." });
      }
      return Response.json({ text });
    } catch (err) {
      lastErr = err;
      console.warn(`Transcribe: model ${modelName} failed:`, (err as { status?: number })?.status || (err as Error)?.message);
    }
  }

  console.error("Transcribe: all models failed", lastErr);
  return Response.json({ error: "Couldn't process the voice message right now. Please type it instead." }, { status: 502 });
}
