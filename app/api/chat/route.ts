import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildContextByIntent } from "../../../lib/knowledge";

type Memory = {
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  intent?: string;
  pendingField?: "name" | "email" | "phone" | "";
  confirmed?: boolean;
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Lucio, a high-converting AI sales assistant for SnapLaunch.

Your job:
- qualify the visitor
- answer simply and confidently
- move them toward pricing, demo, call, or text
- collect lead data when buying intent is present
- be concise and sales-focused
`;

function isLikelyEmail(value: string) {
  const email = value.trim().toLowerCase();
  if (!email.includes("@")) return false;
  if (!email.includes(".")) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isLikelyPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isLikelyName(value: string) {
  return /^[a-zA-Z][a-zA-Z\s'-]{1,40}$/.test(value.trim());
}

function normalizePhone(value: string) {
  return value.trim();
}

function detectIntent(message: string) {
  const lower = message.toLowerCase();

  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("how much")
  ) {
    return "pricing";
  }

  if (
    lower.includes("interested") ||
    lower.includes("get started") ||
    lower.includes("start") ||
    lower.includes("sign up") ||
    lower.includes("call me") ||
    lower.includes("text me") ||
    lower.includes("ready")
  ) {
    return "buying";
  }

  if (
    lower.includes("demo") ||
    lower.includes("book") ||
    lower.includes("estimate")
  ) {
    return "demo";
  }

  return "";
}

function fallbackReply(message: string = "", industry: string = "") {
  const lower = message.toLowerCase();

  if (lower.includes("yes")) {
    return "🔥 Perfect. Let’s get you set up.\n\n👉 Tap Start My Setup below or call now and I’ll personally walk you through it.";
  }

  if (
    lower.includes("price") ||
    lower.includes("pricing") ||
    lower.includes("cost") ||
    lower.includes("how much")
  ) {
    if (industry === "contractors") {
      return "For contractors, most businesses go with Pro: $599 + $350 setup. It captures leads, responds instantly, and improves follow-up. Want pricing or a demo first?";
    }

    return "Most businesses go with Pro: $599 + $350 setup. Want pricing or a demo first?";
  }

  if (
    lower.includes("interested") ||
    lower.includes("get started") ||
    lower.includes("start") ||
    lower.includes("sign up") ||
    lower.includes("call me") ||
    lower.includes("text me") ||
    lower.includes("ready")
  ) {
    return "Great — the fastest next step is to call or text now so we can get this moving today.";
  }

  return "";
}

function extractMemory(message: string, memory: Memory = {}) {
  const updated: Memory = { ...memory };
  const clean = message.trim();
  const detectedIntent = detectIntent(clean);

  if (detectedIntent) {
    updated.intent = detectedIntent;
  }

  if (!updated.pendingField) {
    updated.pendingField = updated.name
      ? updated.email
        ? updated.phone
          ? ""
          : "phone"
        : "email"
      : "name";
  }

  if (updated.pendingField === "name") {
    if (isLikelyName(clean) && !clean.includes("@")) {
      updated.name = clean;
      updated.pendingField = "email";
    }
    return updated;
  }

  if (updated.pendingField === "email") {
    if (isLikelyEmail(clean)) {
      updated.email = clean;
      updated.pendingField = "phone";
    }
    return updated;
  }

  if (updated.pendingField === "phone") {
    if (isLikelyPhone(clean)) {
      updated.phone = normalizePhone(clean);
      updated.pendingField = "";
    }
    return updated;
  }

  if (!updated.name && isLikelyName(clean) && !clean.includes("@")) {
    updated.name = clean;
    updated.pendingField = "email";
    return updated;
  }

  if (!updated.email && isLikelyEmail(clean)) {
    updated.email = clean;
    updated.pendingField = "phone";
    return updated;
  }

  if (!updated.phone && isLikelyPhone(clean)) {
    updated.phone = normalizePhone(clean);
    updated.pendingField = "";
    return updated;
  }

  return updated;
}

function getMissingLeadField(memory: Memory): "name" | "email" | "phone" | null {
  if (!memory.name) return "name";
  if (!memory.email) return "email";
  if (!memory.phone) return "phone";
  return null;
}

function getLeadPrompt(field: "name" | "email" | "phone", memory: Memory) {
  if (field === "name") {
    return "Before we continue, what’s your first name?";
  }

  if (field === "email") {
    return memory.name
      ? `Got it, ${memory.name}. What’s the best email for follow-up?`
      : "What’s the best email for follow-up?";
  }

  return "Perfect. What’s the best phone number to text or call you?";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = body.message || "";
    const industry = body.industry || "general";
    const memory: Memory = body.memory || {};

    const lower = message.toLowerCase();
    const updatedMemory = extractMemory(message, {
      ...memory,
      industry,
    });

    const isHighIntent =
      updatedMemory.intent === "demo" ||
      updatedMemory.intent === "pricing" ||
      updatedMemory.intent === "buying";

    if (isHighIntent && updatedMemory.phone) {
      return NextResponse.json({
        ok: true,
        reply:
          "🔥 Perfect. You're ready. Tap ‘Start My Setup’ or call now — I’ll personally walk you through everything.",
        memory: updatedMemory,
        leadCaptured: true,
      });
    }

    console.log("🧠 MEMORY STATE:", updatedMemory);

    const hardCloseReply = fallbackReply(message, industry);
    if (hardCloseReply) {
      return NextResponse.json({
        ok: true,
        reply: hardCloseReply,
        memory: updatedMemory,
        leadCaptured: false,
        lead: null,
        hardClose: true,
      });
    }

    const shouldCaptureLead =
      updatedMemory.intent === "demo" ||
      updatedMemory.intent === "pricing" ||
      updatedMemory.intent === "buying" ||
      lower.includes("get started") ||
      lower.includes("interested") ||
      lower.includes("call me") ||
      lower.includes("text me");

    const missingField = getMissingLeadField(updatedMemory);

    if (shouldCaptureLead && missingField) {
      const prompt = getLeadPrompt(missingField, updatedMemory);

      return NextResponse.json({
        ok: true,
        reply: prompt,
        memory: updatedMemory,
        leadCaptured: false,
        lead: null,
      });
    }

    const leadComplete =
      !!updatedMemory.name &&
      !!updatedMemory.email &&
      !!updatedMemory.phone;

    if (leadComplete) {
      try {
        const origin = req.nextUrl.origin;

        const sendLeadRes = await fetch(`${origin}/api/send-lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lead: {
              name: updatedMemory.name,
              email: updatedMemory.email,
              phone: updatedMemory.phone,
              industry: updatedMemory.industry || "general",
            },
          }),
        });

        console.log("✅ Lead sent to email system", sendLeadRes.status);
      } catch (err) {
        console.error("❌ Failed to send lead:", err);
      }

      if (!updatedMemory.confirmed) {
        updatedMemory.confirmed = true;

        return NextResponse.json({
          ok: true,
          reply: `Perfect — I’ve got your info, ${updatedMemory.name}. The fastest next step is to call or text now so we can map your setup.`,
          memory: updatedMemory,
          leadCaptured: true,
          lead: {
            name: updatedMemory.name,
            email: updatedMemory.email,
            phone: updatedMemory.phone,
            industry: updatedMemory.industry || "general",
          },
          hardClose: true,
        });
      }

      return NextResponse.json({
        ok: true,
        reply: "You can call or text anytime to get started 👍",
        memory: updatedMemory,
        leadCaptured: true,
        lead: {
          name: updatedMemory.name,
          email: updatedMemory.email,
          phone: updatedMemory.phone,
          industry: updatedMemory.industry || "general",
        },
        hardClose: true,
      });
    }

    const context = buildContextByIntent(message, industry);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        ok: true,
        reply:
          "I can help with pricing, demos, and setup. Want pricing or a demo first?",
        memory: updatedMemory,
        leadCaptured: false,
        lead: null,
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "system", content: `Context:\n${context}` },
        {
          role: "user",
          content: `Industry: ${industry}\nMessage: ${message}`,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "I can help with pricing, demos, and setup. Want pricing or a demo first?";

    return NextResponse.json({
      ok: true,
      reply,
      memory: updatedMemory,
      leadCaptured: false,
      lead: null,
    });
  } catch (error) {
    console.error("CHAT ROUTE ERROR:", error);

    return NextResponse.json({
      ok: true,
      reply: "Sorry, I ran into an issue. Please try again.",
      memory: {},
      leadCaptured: false,
      lead: null,
    });
  }
}