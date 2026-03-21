"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLucioRAG } from "@/hooks/useLucioRAG";

const OPTIONS = [
  { value: "contractor", label: "Contractors" },
  { value: "apartment", label: "Apartments" },
  { value: "airbnb", label: "Airbnb" },
  { value: "photography", label: "Photography" }
];

const ACTIONS = {
  contractor: ["Get Pricing", "Book Estimate", "Talk to Human"],
  apartment: ["Check Availability", "Book a Tour", "Pet Policy"],
  airbnb: ["Check Dates", "House Rules", "Parking Info"],
  photography: ["Session Pricing", "Book a Call", "Availability"]
};

let messageIdCounter = 0;
function generateMessageId() {
  return `msg-${++messageIdCounter}`;
}

export default function LucioFloatingWidget() {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState("apartment");
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: generateMessageId(), role: "bot", content: "Hey 👋 I'm Lucio. I can help with pricing, booking, and quick answers. What do you need?" }
  ]);
  const logRef = useRef(null);

  // RAG hook
  const { ask, loading: sending, error, resetHistory } = useLucioRAG();

  const quickActions = useMemo(() => ACTIONS[industry] || ACTIONS.contractor, [industry]);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, open]);

  const industryMessages = useMemo(() => ({
    apartment: "Got it 🏢 I'm in apartment mode. I can help with tours, pricing, and availability.",
    airbnb: "Got it 🏡 I'm in Airbnb mode. I can help with dates, rules, and guest questions.",
    photography: "Got it 📸 I'm in photography mode. I can help with sessions, pricing, and booking.",
    contractor: "Got it 🔧 I'm in contractor mode. I can help with estimates, timelines, and next steps."
  }), []);

  useEffect(() => {
    resetHistory();
    setMessages([
      {
        id: generateMessageId(),
        role: "bot",
        content: industryMessages[industry] || industryMessages.contractor
      }
    ]);
  }, [industry, industryMessages, resetHistory]);

  async function sendMessage(messageText) {
    const trimmed = messageText.trim();
    if (!trimmed || sending) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { id: generateMessageId(), role: "user", content: trimmed }]);
    setInput("");

    // Get answer from RAG
    const answer = await ask(trimmed);

    // Add Lucio's reply
    setMessages((prev) => [...prev, { id: generateMessageId(), role: "bot", content: answer }]);
  }

  return (
    <>
      <button className="lucio-launcher" onClick={() => setOpen((v) => !v)} aria-label="Open Lucio">
        <span className="lucio-pulse" />
        <img src="/lucio-mascot.png" alt="Lucio mascot" />
      </button>

      <section className={`lucio-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="lucio-head">
          <div className="lucio-brand">
            <img src="/lucio-mascot.png" alt="Lucio mascot" />
            <div>
              <strong>Lucio AI</strong>
              <p>SnapLaunch lead assistant</p>
            </div>
          </div>
          <button className="lucio-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>

        <div className="lucio-banner">Ask about pricing, availability, tours, or booking.</div>

        <div className="lucio-select-wrap">
          <label className="lucio-select-label">Industry Mode</label>
          <select className="lucio-select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="lucio-log" ref={logRef}>
          {messages.map((message) => (
            <div key={message.id} className={`lucio-bubble ${message.role === "user" ? "lucio-user" : "lucio-bot"}`}>
              {message.content}
            </div>
          ))}
          {sending && (
            <div className="lucio-bubble lucio-bot">
              <span className="lucio-typing">Lucio is thinking...</span>
            </div>
          )}
        </div>

        <div className="lucio-actions">
          {quickActions.map((label) => (
            <button key={label} className="lucio-chip" onClick={() => sendMessage(label)} type="button">
              {label}
            </button>
          ))}
        </div>

        <div className="lucio-lead-grid">
          <input
            className="lucio-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
          />
          <button className="lucio-book-btn" type="button" onClick={() => sendMessage("Book now")}>
            Book now
          </button>
        </div>

        <div className="lucio-compose">
          <input
            className="lucio-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage(input);
            }}
          />
          <button className="lucio-send" type="button" disabled={sending} onClick={() => sendMessage(input)}>
            {sending ? "..." : "Send"}
          </button>
        </div>

        {error && <div className="lucio-error">{error}</div>}
      </section>
    </>
  );
}
