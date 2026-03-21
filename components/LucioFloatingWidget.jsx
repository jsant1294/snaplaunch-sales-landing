"use client";

import { useState, useMemo, useEffect, useRef } from "react";

const industryPrompts = {
  contractors: "I run a contracting business and need more estimate requests.",
  apartments: "I manage apartments and want to capture more tour leads.",
  airbnb: "I host Airbnb properties and want to automate guest inquiries.",
  photography: "I run a photography business and want more booked sessions.",
};

const industryReplies = {
  contractors:
    "Perfect — SnapLaunch can help contractors capture estimate requests, qualify leads, and follow up automatically. Want pricing or a demo first?",
  apartments:
    "Perfect — SnapLaunch can help apartment teams answer leasing questions, capture leads, and book tours automatically. Want pricing or a demo first?",
  airbnb:
    "Perfect — SnapLaunch can help automate guest questions, booking inquiries, and follow-up. Want pricing or a demo first?",
  photography:
    "Perfect — SnapLaunch can help photographers capture inquiries, answer pricing questions, and book more sessions. Want pricing or a demo first?",
};

const starterMessage = {
  role: "bot",
  text: "Hey 👋 I’m Lucio. I can help with pricing, demos, and lead capture. What kind of business do you have?",
};

const globalStyles = `
@keyframes lucioPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(46,168,255,0.35);
  }
  70% {
    transform: scale(1.04);
    box-shadow: 0 0 0 18px rgba(46,168,255,0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(46,168,255,0);
  }
}
@keyframes lucioGlow {
  0% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.45;
  }
}
`;

export default function LucioFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [industry, setIndustry] = useState("contractors");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([starterMessage]);
  const [loading, setLoading] = useState(false);
  const [memory, setMemory] = useState({});
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [leadSent, setLeadSent] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickReplies = useMemo(
    () => [
      { label: "See Pricing", value: "pricing" },
      { label: "Book Demo", value: "demo" },
      { label: "How It Works", value: "how-it-works" },
    ],
    []
  );


const handleIndustryChange = (value) => {
  setIndustry(value);

  const userText =
    industryPrompts[value] || `I run a ${value} business.`;

  const botText =
    industryReplies[value] ||
    "Perfect — SnapLaunch can help you capture leads, qualify them, and follow up automatically. Want pricing or a demo first?";

  setMessages([
    starterMessage,
    { role: "user", text: userText },
    { role: "bot", text: botText },
  ]);
};

const handleQuickReply = (value) => {
  if (value === "pricing") {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "Show me pricing." },
      {
        role: "bot",
        text: `Hi ${lead.name || "there"}! 👋\n\nFor ${industry}, most clients go with our Pro system.\n\n👉 $599 + $350 setup\n\nThis includes:\n• Lead capture\n• Instant responses\n• Booking flow\n• SMS follow-up\n\n⚡ Most businesses see results in the first 7–14 days.\n\nWe only take a few new clients per week to set everything up properly.\n\n👉 Do you want me to get you started, or walk you through a quick demo first?`,
      },
    ]);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (value === "demo") {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "I want a demo." },
      {
        role: "bot",
        text: "Great — the fastest next step is to call or text now so we can map the right setup for your business.",
      },
    ]);
    return;
  }

  if (value === "how-it-works") {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "How does it work?" },
      {
        role: "bot",
        text: "SnapLaunch gives you a smart lead-capturing website with Lucio AI, instant responses, and follow-up flow. Want pricing or a demo first?",
      },
    ]);
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (value === "call") {
    window.location.href = "tel:+14049925807";
    return;
  }

  if (value === "text") {
    window.location.href = "sms:+14049925807";
    return;
  }
};

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          industry,
          memory,
        }),
      });

      const data = await res.json();

      setMemory(data.memory || {});

      let hardClose = data.hardClose;

      if (data.lead) {
        setLead(data.lead);
      }

      if (data.leadCaptured && data.lead && !leadSent) {
        await fetch("/api/send-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lead: data.lead,
          }),
        });
        setLeadSent(true);
      }

      const botReply =
        data?.reply ||
        "I can help with pricing, demos, and setup. Want to get started?";

      setMessages((prev) => {
        const last = prev[prev.length - 1];
        let newMessages = prev;
        if (!(last?.role === "bot" && last?.text === botReply)) {
          newMessages = [
            ...prev,
            {
              role: "bot",
              text: botReply,
            },
          ];
        }
        // If hardClose, append a strong CTA
        if (hardClose) {
          newMessages = [
            ...newMessages,
            {
              role: "bot",
              text: "🔥 Ready to launch? Call or text now and I’ll personally walk you through setup in minutes!",
            },
          ];
        }
        return newMessages;
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            "I can help with pricing, demos, and setup. Want to get started?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const pulseStyle = {
    animation: "lucioPulse 2.2s infinite",
  };

  return (
    <>
      <style>{globalStyles}</style>
      {!isOpen && (
        <>
          <span
            style={{
              position: "fixed",
              bottom: 110,
              right: 20,
              background: "rgba(8,17,32,0.95)",
              color: "#fff",
              fontSize: 12,
              padding: "6px 10px",
              borderRadius: 999,
              whiteSpace: "nowrap",
              border: "1px solid rgba(255,255,255,0.1)",
              zIndex: 10000,
              pointerEvents: "none",
            }}
          >
            Ask Lucio
          </span>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Lucio assistant"
            style={{
              ...pulseStyle,
              position: "fixed",
              right: 20,
              bottom: 20,
              width: 78,
              height: 78,
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "linear-gradient(180deg,#071120,#0b1830)",
              zIndex: 9999,
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle, rgba(46,168,255,0.22) 0%, rgba(46,168,255,0) 70%)",
                animation: "lucioGlow 2.2s infinite",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "999px",
                overflow: "hidden",
                boxShadow: "0 18px 40px rgba(0,0,0,0.38)",
              }}
            >
              <img
                src="/lucio-logo.png"
                alt="Lucio"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "999px",
                  display: "block",
                }}
              />
            </div>

            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 12,
                height: 12,
                borderRadius: "999px",
                background: "#34d399",
                border: "2px solid #081120",
              }}
            />
          </button>
        </>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            width: 360,
            maxWidth: "calc(100vw - 24px)",
            background: "linear-gradient(180deg,#081120,#0b1730)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 22,
            padding: 14,
            color: "#fff",
            zIndex: 9999,
            boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div>
              <strong style={{ display: "block", fontSize: 18 }}>Lucio AI</strong>
              <span style={{ fontSize: 13, opacity: 0.72 }}>Lead capture assistant</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.7, marginBottom: 6 }}>
              Industry Mode
            </label>
            <select
              value={industry}
              onChange={(e) => handleIndustryChange(e.target.value)}
              style={{
                width: "100%",
                height: 46,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                padding: "0 12px",
                outline: "none",
              }}
            >
              <option value="contractors" style={{ color: "#000" }}>Contractors</option>
              <option value="apartments" style={{ color: "#000" }}>Apartments</option>
              <option value="airbnb" style={{ color: "#000" }}>Airbnb</option>
              <option value="photography" style={{ color: "#000" }}>Photography</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxHeight: 260,
              overflowY: "auto",
              marginBottom: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "bot" ? "flex-start" : "flex-end",
                  maxWidth: "88%",
                  background:
                    msg.role === "bot"
                      ? "linear-gradient(180deg,#12315e,#0e2648)"
                      : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "12px 14px",
                  fontSize: 14,
                  lineHeight: 1.45,
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "88%",
                  background: "linear-gradient(180deg,#12315e,#0e2648)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "12px 14px",
                  fontSize: 14,
                }}
              >
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            {quickReplies.map((item) => (
              <button
                key={item.value}
                onClick={() => handleQuickReply(item.value)}
                style={{
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  padding: "10px 12px",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>


          {lead?.email && lead?.phone && (
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <a
                href="tel:+14049925807"
                className="snap-btn"
                style={{ textDecoration: "none" }}
              >
                Call Now
              </a>
              <a
                href="sms:+14049925807"
                className="snap-btn-secondary"
                style={{ textDecoration: "none" }}
              >
                Text Me
              </a>
            </div>
          )}


          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                height: 46,
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                padding: "0 14px",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                height: 46,
                padding: "0 18px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(180deg,#2ea8ff,#0b84ff)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>

          {lead?.email && lead?.phone && (
            <div
              style={{
                marginTop: 10,
                fontSize: 12,
                opacity: 0.85,
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "10px 12px",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              Lead captured: {lead.name} • {lead.email} • {lead.phone}
            </div>
          )}

          <div
      className="snap-cta-row"
      style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "center" }}
    >
      <a href="tel:+14049925807" className="snap-btn">
        🔥 Start My Setup
      </a>
      <a href="sms:+14049925807" className="snap-btn-secondary">
        📞 Call Me Now
      </a>
    </div>
  </div>
)}
  </>
);
}