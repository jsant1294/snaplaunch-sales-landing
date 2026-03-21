import fs from "fs";
import path from "path";

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");

/**
 * Safely read a knowledge file
 */
function readFileSafe(filename) {
  try {
    return fs.readFileSync(path.join(KNOWLEDGE_DIR, filename), "utf8");
  } catch (err) {
    console.warn(`Missing knowledge file: ${filename}`);
    return "";
  }
}

/**
 * Load all knowledge files
 */
export function loadKnowledge() {
  return {
    core: readFileSafe("core.md"),
    pricing: readFileSafe("pricing.md"),
    industries: readFileSafe("industries.md"),
    objections: readFileSafe("objections.md"),
    faq: readFileSafe("faq.md"),
  };
}

/**
 * Build context dynamically based on user intent
 */
export function buildContextByIntent(message = "", industry = "") {
  const text = `${message} ${industry}`.toLowerCase();
  const knowledge = loadKnowledge();

  let sections = [];

  // Always include core
  if (knowledge.core) sections.push(knowledge.core);

  // 💰 Pricing intent
  if (
    text.includes("price") ||
    text.includes("pricing") ||
    text.includes("cost") ||
    text.includes("how much")
  ) {
    if (knowledge.pricing) sections.push(knowledge.pricing);
  }

  // 🏢 Industry intent
  if (
    text.includes("contractor") ||
    text.includes("estimate") ||
    text.includes("apartment") ||
    text.includes("leasing") ||
    text.includes("tour") ||
    text.includes("airbnb") ||
    text.includes("guest") ||
    text.includes("photography") ||
    text.includes("session") ||
    text.includes("photographer")
  ) {
    if (knowledge.industries) sections.push(knowledge.industries);
  }

  // 🧠 Objection handling
  if (
    text.includes("expensive") ||
    text.includes("too much") ||
    text.includes("think about") ||
    text.includes("not sure") ||
    text.includes("later") ||
    text.includes("do i need") ||
    text.includes("chatbot")
  ) {
    if (knowledge.objections) sections.push(knowledge.objections);
  }

  // ❓ General / FAQ intent
  if (
    text.includes("how") ||
    text.includes("what") ||
    text.includes("does") ||
    text.includes("can this") ||
    text.includes("will this")
  ) {
    if (knowledge.faq) sections.push(knowledge.faq);
  }

  // fallback if nothing matched
  if (sections.length === 0 && knowledge.core) {
    sections.push(knowledge.core);
  }

  return sections.join("\n\n---\n\n");
}