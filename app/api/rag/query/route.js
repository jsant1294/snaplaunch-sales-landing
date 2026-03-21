import { NextResponse } from "next/server";
import { loadStore, embedQuery, cosineSimilarity } from "@/lib/rag/store";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const TOP_K = 5;

export async function POST(req) {
  try {
    const { question, conversationHistory = [] } = await req.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // 1. Load the vector store
    const store = await loadStore();
    if (!store || store.length === 0) {
      return NextResponse.json({
        answer: "I don't have any knowledge loaded yet. Please ingest a URL first.",
      });
    }

    // 2. Embed the question
    const queryEmbedding = await embedQuery(question);

    // 3. Score all chunks by cosine similarity
    const scored = store.map((entry) => ({
      ...entry,
      score: cosineSimilarity(queryEmbedding, entry.embedding),
    }));

    // 4. Take top K chunks
    const topChunks = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K)
      .map((c) => c.text);

    const context = topChunks.join("\n\n---\n\n");

    // 5. Build messages for GPT-4o
    const systemPrompt = `You are Lucio, a friendly and knowledgeable AI assistant.
Answer the user's question using ONLY the context provided below.
If the answer is not in the context, say "I don't have that information — please contact us directly."
Keep answers concise, helpful, and conversational.

CONTEXT:
${context}`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-6), // keep last 3 turns
      { role: "user", content: question },
    ];

    // 6. Call Groq (fast + cheap)
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.3,
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content;

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("[RAG query error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
