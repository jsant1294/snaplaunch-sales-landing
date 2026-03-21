import { NextResponse } from "next/server";
import { chunkText, embedChunks, saveStore } from "@/lib/rag/store";

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch URL: ${res.status}`);
    const html = await res.text();

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!text || text.length < 100)
      return NextResponse.json({ error: "Not enough content found at URL" }, { status: 422 });

    const chunks = chunkText(text, 500, 50);
    const store = await embedChunks(chunks, url);
    await saveStore(store);

    return NextResponse.json({ success: true, chunksIngested: chunks.length, source: url });
  } catch (err) {
    console.error("[RAG ingest error]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}