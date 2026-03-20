import { NextResponse } from "next/server";

// Pre-compile regex patterns for performance
const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_REGEX = /(?:\+?1[-\.\s]?)?(\(?\d{3}\)?[-\.\s]?)\d{3}[-\.\s]?\d{4}/;

const INDUSTRY_RESPONSES = {
  apartment: {
    default: "I'm in apartment mode 🏢 I can help with pricing, tours, availability, and pet policy.",
    availability: "Yes — I can help with availability, pricing, and tour scheduling. What move-in date are you targeting?",
    tour: "Perfect. I can help you book a tour. Share your preferred day and best phone number.",
    pet: "I can help with pet policy details. Do you want breed limits, fees, or deposit info?"
  },
  airbnb: {
    default: "I'm in Airbnb mode 🏡 I can help with dates, rules, parking, and direct booking questions.",
    dates: "I can help with dates and stay details. How many guests and what weekend are you checking?",
    parking: "Yes — I can help with parking details and check-in info. What property are you asking about?",
    rules: "I can walk you through house rules and booking steps. Are you asking before booking or after booking?"
  },
  photography: {
    default: "I'm in photography mode 📸 I can help with session pricing, packages, and availability.",
    pricing: "Absolutely. I can help with session pricing, availability, and next-step booking. What type of session do you need?",
    book: "Perfect. I can help you book a session. Share the session type and your preferred date."
  },
  contractor: {
    default: "I'm in contractor mode 🔧 I can help with pricing, estimates, timelines, and next-step booking.",
    pricing: "Absolutely. I can help with pricing. Tell me what service you need and I'll guide you to the next step.",
    estimate: "I can help you move toward an estimate. What type of project are you pricing out?",
    human: "No problem. I can route this to a human follow-up. Share your name and best phone number."
  }
};

function replyFor(industry, message) {
  const m = message.toLowerCase();
  const responses = INDUSTRY_RESPONSES[industry] || INDUSTRY_RESPONSES.contractor;
  
  // Check for keyword matches in order of specificity
  for (const [keyword, response] of Object.entries(responses)) {
    if (keyword !== "default" && m.includes(keyword)) {
      return response;
    }
  }
  
  return responses.default;
}

function extractLead(message) {
  const email = EMAIL_REGEX.exec(message)?.[0] || null;
  const phone = PHONE_REGEX.exec(message)?.[0] || null;
  // Reset regex lastIndex for next use
  EMAIL_REGEX.lastIndex = 0;
  PHONE_REGEX.lastIndex = 0;
  return { email, phone };
}

export async function POST(request) {
  const body = await request.json();
  const { message = "", industry = "contractor", name = "" } = body;
  const extracted = extractLead(message);
  const leadSaved = Boolean(name || extracted.email || extracted.phone);

  return NextResponse.json({
    reply: replyFor(industry, message),
    leadSaved,
    extracted
  });
}
