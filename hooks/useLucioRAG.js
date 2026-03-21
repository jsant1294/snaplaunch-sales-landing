import { useState, useCallback } from "react";

export function useLucioRAG() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const ask = useCallback(
    async (question) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/rag/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, conversationHistory: history }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Query failed");
        }
        const { answer } = await res.json();
        setHistory((prev) => [
          ...prev,
          { role: "user", content: question },
          { role: "assistant", content: answer },
        ]);
        return answer;
      } catch (err) {
        setError(err.message);
        return "Sorry, I ran into an issue. Please try again.";
      } finally {
        setLoading(false);
      }
    },
    [history]
  );

  const resetHistory = useCallback(() => setHistory([]), []);

  return { ask, loading, error, resetHistory };
}