"use client";
import { useState } from "react";

export default function RAGAdminPage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIngest = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/rag/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Ingestion failed." });
      } else {
        setStatus({ type: "success", message: `✓ Ingested ${data.chunksIngested} chunks from ${data.source}` });
        setUrl("");
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f7", padding: "32px 16px" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", maxWidth: 560, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8, color: "#111" }}>Lucio RAG — Knowledge Base</h1>
        <p style={{ color: "#555", marginBottom: 24, lineHeight: 1.6 }}>Paste a URL to teach Lucio about your business.</p>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 6, color: "#333", fontSize: "0.9rem" }}>Website URL</label>
        <input
          style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "1px solid #ddd", fontSize: "1rem", marginBottom: 12, boxSizing: "border-box", outline: "none" }}
          type="url"
          placeholder="https://yourwebsite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleIngest()}
          disabled={loading}
        />
        <button
          style={{ width: "100%", padding: 13, borderRadius: 8, border: "none", background: "#6358ff", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", marginBottom: 16, opacity: loading ? 0.6 : 1 }}
          onClick={handleIngest}
          disabled={loading}
        >
          {loading ? "Ingesting…" : "Ingest URL"}
        </button>
        {status && (
          <div style={{ padding: "12px 14px", borderRadius: 8, background: status.type === "success" ? "#e6f9f0" : "#fdecea", color: status.type === "success" ? "#1a7a4a" : "#b91c1c", fontWeight: 500, marginBottom: 16 }}>
            {status.message}
          </div>
        )}
        <div style={{ background: "#f8f8fb", borderRadius: 8, padding: "14px 16px", fontSize: "0.85rem", color: "#444", lineHeight: 1.8 }}>
          <strong>Tips:</strong><br />
          • Ingest your homepage, pricing page, and FAQ<br />
          • Re-ingest any URL after updating its content<br />
          • Each ingest adds to Lucio's knowledge base
        </div>
      </div>
    </div>
  );
}
