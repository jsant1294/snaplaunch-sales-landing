import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getReply(message = "", industry = "") {
  const text = `${message} ${industry}`.toLowerCase().trim();

  if (!text) {
    return "Hey 👋 I can help with pricing, demos, and lead capture. What kind of business do you have?";
  }

  if (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("how much")
  ) {
    return "Most businesses go with Pro: $599 + $350 setup. It includes Lucio, lead capture, booking flow, and SMS demo wiring. Want a demo or want to get started?";
  }

  if (text.includes("demo")) {
    return "Great — book a demo below and we’ll map the best SnapLaunch setup for your business.";
  }

  if (text.includes("how") && text.includes("work")) {
    return "Lucio greets visitors, answers questions, captures lead details, and helps trigger follow-up so you miss fewer leads. Want pricing or a demo first?";
  }

  if (text.includes("contractor") || text.includes("estimate")) {
    return "Perfect — for contractors, SnapLaunch helps capture estimate requests, qualify leads, and follow up automatically. Pro is usually the best fit. Want pricing or a demo first?";
  }

  if (text.includes("apartment") || text.includes("leasing") || text.includes("tour")) {
    return "Perfect — for apartments, SnapLaunch can answer leasing questions, capture leads, and help book tours automatically. Want pricing or a demo first?";
  }

  if (text.includes("airbnb") || text.includes("guest")) {
    return "Perfect — for Airbnb hosts, SnapLaunch can help automate guest questions, booking inquiries, and follow-up. Want pricing or a demo first?";
  }

  if (text.includes("photography") || text.includes("session") || text.includes("photographer")) {
    return "Perfect — for photography businesses, SnapLaunch helps capture inquiries, answer pricing questions, and book more sessions. Want pricing or a demo first?";
  }

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hey 👋 I can help with pricing, demos, and lead capture. What kind of business do you have?";
  }

  return "SnapLaunch helps businesses capture leads, answer questions, and follow up automatically. Want pricing or a demo first?";
}

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message || "";
    const industry = body?.industry || "";

    let knowledgeLoaded = false;

    try {
      fs.readFileSync(path.join(process.cwd(), "knowledge/core.md"), "utf8");
      knowledgeLoaded = true;
    } catch {
      knowledgeLoaded = false;
    }

    return NextResponse.json({
      ok: true,
      reply: getReply(message, industry),
      knowledgeLoaded,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        reply:
          "SnapLaunch helps businesses capture leads, answer questions, and follow up automatically. Want pricing or a demo first?",
        knowledgeLoaded: false,
      },
      { status: 200 }
    );
  }
}