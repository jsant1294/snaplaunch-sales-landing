function getCloserBoost(message = "", memory: any = {}) {
  const text = message.toLowerCase();

  if (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("how much")
  ) {
    if (memory?.industry === "contractor" || memory?.industry === "contractors") {
      return `For contractors like you, I recommend our Pro system.\n\n👉 $599 + $350 setup\n\nThis includes:\n• Lead capture\n• Instant responses\n• Booking flow\n• SMS follow-up\n\n⚡ Most clients start seeing results in the first 1–2 weeks.\n\nWe only onboard a few businesses per week to set everything up properly.\n\n👉 Do you want to get started today or see a quick demo first?`;
    }
    const industryText = memory?.industry ? ` for ${memory.industry} businesses` : "";
    return ` Most businesses${industryText} go with Pro: $599 + $350 setup. The fastest next step is to call or text now so we can map your setup.`;
  }

  if (
    text.includes("interested") ||
    text.includes("get started") ||
    text.includes("ready")
  ) {
    return ` Great — the fastest next step is to call or text now so we can get this moving today.`;
  }

  return "";
}
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildContextByIntent } from "../../../lib/knowledge";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isLikelyEmail(value: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim());
}

function isLikelyPhone(value: string) {
  return /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(value.trim());
}

function isLikelyName(value: string) {
  return /^[a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})?$/.test(value.trim());
}

function extractMemory(message: string, memory: any) {
  const text = message.toLowerCase().trim();

  // If Lucio is waiting for a specific field, capture it directly
  if (memory.pendingField === "name" && isLikelyName(message)) {
    memory.name = message.trim();
    delete memory.pendingField;
  } else if (memory.pendingField === "email" && isLikelyEmail(message)) {
    memory.email = message.trim();
    delete memory.pendingField;
  } else if (memory.pendingField === "phone" && isLikelyPhone(message)) {
    memory.phone = message.trim();
    delete memory.pendingField;
  }

  // Also support explicit patterns
  const nameMatch = message.match(/my name is\s+([a-zA-Z]+)/i);
  if (nameMatch?.[1]) {
    memory.name = nameMatch[1];
    delete memory.pendingField;
  }

  const emailMatch = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (emailMatch) {
    memory.email = emailMatch[0];
    delete memory.pendingField;
  }

  const phoneMatch = message.match(/(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  if (phoneMatch) {
    memory.phone = phoneMatch[0];
    delete memory.pendingField;
  }

  // Industry detection
  if (text.includes("contractor")) memory.industry = "contractor";
  if (text.includes("photography")) memory.industry = "photography";
  if (text.includes("apartment")) memory.industry = "apartments";
  if (text.includes("airbnb")) memory.industry = "airbnb";
  if (text.includes("cleaning")) memory.industry = "cleaning";

  // Intent detection
  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("how much") ||
    text.includes("pricing")
  ) {
    memory.intent = "pricing";
  }

  if (text.includes("demo")) {
    memory.intent = "demo";
  }

  if (
    text.includes("get started") ||
    text.includes("interested") ||
    text.includes("call me") ||
    text.includes("text me")
  ) {
    memory.intent = "buying";
  }

  return memory;
}

function getMissingLeadField(memory: any) {
  if (!memory.name) return "name";
  if (!memory.email) return "email";
  if (!memory.phone) return "phone";
  return null;
}

function getLeadPrompt(field: string, memory: any) {
  if (field === "name") {
    memory.pendingField = "name";
    return "Before we continue, what’s your first name?";
  }

  if (field === "email") {
    memory.pendingField = "email";
    return memory.name
      ? `Got it, ${memory.name}. What’s the best email for follow-up?`
      : "What’s the best email for follow-up?";
  }

  if (field === "phone") {
    memory.pendingField = "phone";
    return "Perfect. What’s the best phone number to text or call you?";
  }

  return "What’s the best way to reach you?";
}

function fallbackReply(message = "", industry = "") {
  const lower = message.toLowerCase();
  if (lower.includes("yes")) {
    return "🔥 Perfect. Let’s get you set up.\n\n👉 Tap ‘Start My Setup’ below or call now and I’ll personally walk you through it in minutes.";
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const message = body.message || "";
  const industry = body.industry || "general";
  const memory = body.memory || {};

  const lower = message.toLowerCase();
  try {

    // Auto CTA push for strong buying intent
    if (
      lower.includes("interested") ||
      lower.includes("start") ||
      lower.includes("sign up") ||
      lower.includes("how do i begin")
    ) {
      return NextResponse.json({
        ok: true,
        reply: "🔥 Perfect. Let’s get you set up.\n\n👉 Call now or text me and I’ll personally walk you through it in minutes.",
      });
    }
    // Yes intent CTA
    if (lower.includes("yes")) {
      return NextResponse.json({
        ok: true,
        reply: "🔥 Perfect. Let’s get you set up.\n\n👉 Tap ‘Start My Setup’ below or call now and I’ll personally walk you through it in minutes.",
      });
    }

    const updatedMemory = extractMemory(message, { ...memory });
    // removed duplicate 'lowered' variable

    const shouldCaptureLead =
      updatedMemory.intent === "demo" ||
      updatedMemory.intent === "pricing" ||
      updatedMemory.intent === "buying" ||
      lower.includes("get started") ||
lower.includes("interested") ||
lower.includes("call me") ||
lower.includes("text me")
    const missingField = getMissingLeadField(updatedMemory);

    if (shouldCaptureLead && missingField) {
      const prompt = getLeadPrompt(missingField, updatedMemory);

      return NextResponse.json({
        reply: prompt,
        memory: updatedMemory,
        leadCaptured: false,
        lead: null,
      });
    }

    const leadComplete =
      !!updatedMemory.name && !!updatedMemory.email && !!updatedMemory.phone;

    if (leadComplete) {
      if (!updatedMemory.confirmed) {
        updatedMemory.confirmed = true;
        return NextResponse.json({
          reply: `Perfect — I’ve got your info, ${updatedMemory.name}. The fastest next step is to call or text now so we can map your setup.`,
          memory: updatedMemory,
          leadCaptured: true,
          lead: {
            name: updatedMemory.name,
            email: updatedMemory.email,
            phone: updatedMemory.phone,
            industry: updatedMemory.industry || industry || "",
          },
          hardClose: true,
        });
      }
      // prevent repeat, but send hard close
      return NextResponse.json({
        reply: "You can call or text anytime to get started 👍",
        memory: updatedMemory,
        leadCaptured: true,
        hardClose: true,
      });
    }

    const context = buildContextByIntent(message, industry);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: fallbackReply(message, industry),
        memory: updatedMemory,
        leadCaptured: false,
        lead: null,
      });
    }

    const systemPrompt = `
You are Lucio, a high-converting AI sales assistant for SnapLaunch.

Your job:
- qualify the visitor
- recommend the right SnapLaunch package
- reduce hesitation
- move the visitor toward calling or texting now

Offer:
- Starter: $399 + $250 setup
- Pro: $599 + $350 setup
- Done For You: $1299 + $450 setup

Rules:
- Keep replies short, confident, and clear
- Default to recommending Pro unless the user clearly needs lighter or bigger
- Speak like a sales assistant, not a generic chatbot
- If the user shows buying intent, guide toward direct action
- If the user hesitates, handle the objection simply and confidently
- If name exists, use it naturally
- If industry exists, tailor the response
- End most replies with one next step question

Closing behavior:
- After pricing questions, push toward demo or direct setup
- After lead capture, push toward call or text now
- Use phrases like:
  - "Most businesses like yours go with Pro"
  - "The fastest next step is to call or text now"
  - "We can get this set up quickly"
  - "Want to get started or see a quick demo first?"
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "system",
          content: `Context:\n${context}`,
        },
        {
          role: "user",
          content: `Industry: ${industry || "unknown"}\nMessage: ${message}`,
        },
      ],
    });



    let reply = completion?.choices?.[0]?.message?.content;
    if (!reply || reply.length < 5) {
      reply = fallbackReply(message, industry);
    }

    // Logging AI completion and text
    console.log("AI RAW:", completion);
    console.log("AI TEXT:", completion?.choices?.[0]?.message?.content);

    reply += getCloserBoost(message, updatedMemory);

    return NextResponse.json({
      reply,
      memory: updatedMemory,
      leadCaptured: false,
      lead: null,
    });
  } catch (err) {
    return NextResponse.json({
      reply: "I can help with pricing, demos, and setup. Want to get started?",
      memory: {},
      leadCaptured: false,
      lead: null,
    });
  }
}