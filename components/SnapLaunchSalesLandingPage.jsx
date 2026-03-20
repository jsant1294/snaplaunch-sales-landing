"use client";

import { useState } from "react";
import LucioFloatingWidget from "@/components/LucioFloatingWidget";
import Footer from "@/components/Footer";

const pillars = [
  {
    title: "Instant Lead Capture",
    text: "Lucio greets visitors, answers questions, and captures serious leads before they bounce.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#a8a0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    colorClass: "pillar-purple",
  },
  {
    title: "SMS Follow-Up",
    text: "Every qualified lead triggers automated text follow-up so businesses stop losing money to slow replies.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#a8a0ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="9" y1="7" x2="15" y2="7"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
        <line x1="9" y1="15" x2="13" y2="15"/>
      </svg>
    ),
    colorClass: "pillar-teal",
  },
  {
    title: "Industry Ready",
    text: "Built for contractors, apartment communities, Airbnb hosts, and service businesses that need fast responses.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="#6358ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    colorClass: "pillar-amber",
  },
];

const steps = [
  {
    number: "01",
    title: "Visitor lands on your page",
    text: "Lucio appears like a helpful AI receptionist, ready to answer questions and guide the next step.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#6358ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Lucio qualifies the lead",
    text: "The assistant asks smart questions, captures contact details, and moves the visitor toward booking.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#6358ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Follow-up happens automatically",
    text: "The system saves the lead, sends SMS, and routes the prospect into your SnapLaunch dashboard.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#6358ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

const useCases = [
  {
    title: "Contractors",
    text: "Turn estimate requests into booked calls with fast, simple lead capture.",
    tag: "Quotes + calls",
    emoji: "🔨",
    accentColor: "#378ADD",
    tagClass: "tag-blue",
  },
  {
    title: "Apartments",
    text: "Answer leasing questions, check availability, and book tours around the clock.",
    tag: "Tours + leasing",
    emoji: "🏢",
    accentColor: "#7F77DD",
    tagClass: "tag-purple",
  },
  {
    title: "Airbnb",
    text: "Handle guest questions, check-in info, and direct booking inquiries without being glued to your phone.",
    tag: "Guest support",
    emoji: "🏡",
    accentColor: "#BA7517",
    tagClass: "tag-amber",
  },
  {
    title: "Photography",
    text: "Help prospects ask about sessions, pricing, and availability while Lucio captures every lead.",
    tag: "Bookings + inquiries",
    emoji: "📷",
    accentColor: "#1D9E75",
    tagClass: "tag-teal",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$500",
    note: "Setup",
    features: [
      "Mobile-first landing page",
      "Lucio chat widget",
      "Lead capture flow",
      "Basic industry setup"
    ],
    cta: "Start with Starter",
    featured: false
  },
  {
    name: "Growth",
    price: "$1,500",
    note: "Setup",
    features: [
      "Everything in Starter",
      "SMS follow-up wiring",
      "Tenant-ready backend",
      "Dashboard lead view"
    ],
    cta: "Choose Growth",
    featured: true
  },
  {
    name: "Custom",
    price: "Custom",
    note: "Buildout",
    features: [
      "Multi-page demos",
      "Custom industry flows",
      "Advanced automations",
      "Future voice AI expansion"
    ],
    cta: "Book a Strategy Call",
    featured: false
  }
];

export default function SnapLaunchSalesLandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    industry: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Simulate form submission - in production, send to backend
      console.log("Form submitted:", formData);
      
      // Reset form and show success
      setSubmitted(true);
      setFormData({ name: "", business: "", email: "", industry: "", message: "" });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <nav className="snap-nav">
        <div className="snap-container snap-nav-inner">
          <div className="snap-brand">
            <div className="snap-brand-badge">
              <img src="/lucio-mascot.png" alt="Lucio mascot" />
            </div>
            <div className="snap-brand-copy">
              <strong>SnapLaunch AI</strong>
              <span>Lucio-powered sales system</span>
            </div>
          </div>

          <div className="snap-links">
            <a href="#how-it-works">How it works</a>
            <a href="#industries">Industries</a>
            <a href="#pricing">Pricing</a>
            <a className="snap-btn" href="#book">Book Demo</a>
          </div>
        </div>
      </nav>

      <section className="snap-hero">
        <div className="snap-container snap-hero-grid">
          <div className="snap-hero-content">
            <div className="snap-hero-lucio">
              <img src="/lucio-mascot.png" alt="Lucio AI Assistant" />
            </div>
            <h1 className="snap-title">
              Turn your website into a <span>24/7 AI sales rep</span> with Lucio.
            </h1>
            <p className="snap-sub">
              SnapLaunch installs a branded AI assistant that answers questions, captures leads, triggers SMS follow-up,
              and helps businesses book more calls without hiring more staff.
            </p>

            <div className="snap-cta-row">
              <a className="snap-btn" href="#book">Book a Demo</a>
              <a className="snap-btn-secondary" href="#demo">See How It Works</a>
            </div>

            <div className="snap-mini-grid">
              <div className="snap-mini-card snap-mini-card--accent">
                <strong>
                  CHAT
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6358ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', flexShrink: 0 }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </strong>
                <span>Lead response coverage</span>
              </div>
              <div className="snap-mini-card snap-mini-card--accent">
                <strong>
                  <span className="snap-live-dot" />
                  TEXT
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6358ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', flexShrink: 0 }}>
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <line x1="9" y1="7" x2="15" y2="7"/>
                    <line x1="9" y1="11" x2="15" y2="11"/>
                    <line x1="9" y1="15" x2="13" y2="15"/>
                  </svg>
                </strong>
                <span>Instant follow-up flow</span>
              </div>
              <div className="snap-mini-card snap-mini-card--accent">
                <strong>
                  VOICE
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6358ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', flexShrink: 0 }}>
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                </strong>
                <span>Contractors, apartments, Airbnb, more</span>
              </div>
            </div>
          </div>

          <div id="demo" className="snap-demo-wrap">
            <div className="snap-demo-phone">
              <div className="snap-demo-screen">
                <div className="snap-demo-head">
                  <div className="snap-demo-head-left">
                    <div className="snap-avatar">
                      <img src="/lucio-mascot.png" alt="Lucio mascot" />
                    </div>
                    <div>
                      <strong>Lucio AI</strong>
                      <p>Lead capture assistant</p>
                    </div>
                  </div>
                  <div className="snap-live">
                    <span className="snap-dot" />
                    Live
                  </div>
                </div>

                <div className="snap-chat-box">
                  <div className="snap-bubble-bot">
                    Hey 👋 I’m Lucio. I can help with pricing, booking, and quick answers. What do you need?
                  </div>
                  <div className="snap-bubble-user">
                    Do you have apartment availability this month?
                  </div>
                  <div className="snap-bubble-bot">
                    Yes — I can help with pricing, tours, and availability. What move-in date are you targeting?
                  </div>
                </div>

                <div className="snap-chip-row">
                  <button className="snap-chip">Check Availability</button>
                  <button className="snap-chip">Book a Tour</button>
                  <button className="snap-chip">Pet Policy</button>
                </div>

                <div className="snap-input-row">
                  <input className="snap-input" readOnly value="Type your message..." />
                  <button className="snap-btn">Send</button>
                </div>
              </div>
            </div>

            <div className="snap-system-card">
              <p>Lead system</p>
              <strong>Chat → Capture → SMS → Dashboard</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-container">
          <div className="snap-card-grid">
            {pillars.map((item) => (
              <div key={item.title} className={`snap-panel snap-panel--icon ${item.colorClass}`}>
                <div className="snap-icon-tile">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="snap-section-alt">
        <div className="snap-container">
          <div className="snap-how-it-works-header">
            <div className="snap-how-lucio">
              <img src="/lucio-mascot.png" alt="Lucio Avatar" />
            </div>
            <div className="snap-section-head">
              <p>How it works</p>
              <h2>A simple lead engine businesses understand fast.</h2>
              <span>
                SnapLaunch is designed to feel simple to the client while doing powerful work behind the scenes.
              </span>
            </div>
          </div>

          <div className="snap-steps snap-steps--connected">
            {steps.map((item, index) => (
              <div key={item.title} className="snap-step snap-step--card">
                {/* connector line between steps */}
                {index < steps.length - 1 && <div className="snap-step-connector" />}

                <div className="snap-step-top">
                  <div className="snap-step-icon-wrap">
                    {item.icon}
                  </div>
                  <span className="snap-step-number">{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-container">
          <div className="snap-section-head">
            <p>Live Preview</p>
            <h2>See Lucio in action with our demo number.</h2>
            <span>Try calling or texting to experience how leads are captured in real-time.</span>
          </div>

          <div className="snap-preview-grid">
            {/* Call Preview */}
            <div className="snap-preview-card">
              <div className="snap-preview-header">
                <h3>Call Demo</h3>
                <span className="snap-preview-badge">Voice</span>
              </div>
              <div className="snap-call-preview">
                <div className="snap-call-screen">
                  <div className="snap-call-display">
                    <div className="snap-call-avatar"></div>
                    <p className="snap-call-name">Lucio AI</p>
                    <p className="snap-call-status">In Call...</p>
                    <div className="snap-call-duration">00:45</div>
                  </div>
                  <div className="snap-call-buttons">
                    <button className="snap-call-btn snap-call-btn--mute">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      </svg>
                    </button>
                    <button className="snap-call-btn snap-call-btn--end">End</button>
                    <button className="snap-call-btn snap-call-btn--speaker">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="snap-call-number">
                  <p>Call this number:</p>
                  <strong>(470) 570-4973</strong>
                </div>
              </div>
            </div>

            {/* Text Preview */}
            <div className="snap-preview-card">
              <div className="snap-preview-header">
                <h3>Text Demo</h3>
                <span className="snap-preview-badge">SMS</span>
              </div>
              <div className="snap-text-preview">
                <div className="snap-text-screen">
                  <div className="snap-text-header">
                    <p>Lucio AI</p>
                    <span>Lead Capture Bot</span>
                  </div>
                  <div className="snap-text-messages">
                    <div className="snap-text-msg snap-text-msg--incoming">
                      <p>Hi! Tell me about your project and I'll match you with a specialist.</p>
                    </div>
                    <div className="snap-text-msg snap-text-msg--outgoing">
                      <p>Looking for a contractor to remodel my kitchen.</p>
                    </div>
                    <div className="snap-text-msg snap-text-msg--incoming">
                      <p>Great! I'll send you available contractors. What's your timeline?</p>
                    </div>
                  </div>
                  <div className="snap-text-input">
                    <input type="text" placeholder="Type your message..." readOnly />
                  </div>
                </div>
                <div className="snap-text-number">
                  <p>Text this number:</p>
                  <strong>(470) 570-4973</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="snap-section">
        <div className="snap-container">
          <div className="snap-section-head">
            <p>Industries</p>
            <h2>Built for real businesses that lose leads every day.</h2>
            <span>
              Start with one vertical, then clone the same Lucio-powered engine across multiple offers.
            </span>
          </div>

          <div className="snap-use-grid">
            {useCases.map((item) => (
              <div key={item.title} className="snap-use-card snap-use-card--accented">
                {/* colored top stripe */}
                <div
                  className="snap-use-stripe"
                  style={{ background: item.accentColor }}
                />
                <span className="snap-use-emoji">{item.emoji}</span>
                <span className={`snap-tag ${item.tagClass}`}>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="snap-section-alt">
        <div className="snap-container">
          <div className="snap-section-head">
            <p>Pricing</p>
            <h2>Productized offers that are easy to explain and easy to sell.</h2>
          </div>

          <div className="snap-price-grid">
            {pricing.map((plan) => (
              <div key={plan.name} className={`snap-price-card ${plan.featured ? "featured" : ""}`}>
                {plan.featured && <div className="snap-price-pill">Best launch offer</div>}
                <h3>{plan.name}</h3>
                <div className="snap-price-row">
                  <strong>{plan.price}</strong>
                  <span>{plan.note}</span>
                </div>
                <ul className="snap-feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="snap-check">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#book" className={plan.featured ? "snap-btn" : "snap-btn-secondary"} style={{ width: "100%", marginTop: 24 }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="snap-section">
        <div className="snap-container snap-book-grid">
          <div className="snap-form-card">            <div className="snap-book-lucio">
              <img src="/lucio-mascot.png" alt="Lucio Guide" />
            </div>            <p className="snap-pill" style={{ display: "inline-flex" }}>Book a demo</p>
            <h2>Let’s install Lucio into your business.</h2>
            <p>
              Show me your business and I’ll map the best SnapLaunch setup for your leads, follow-up flow, and industry use case.
            </p>

            <form className="snap-form" onSubmit={handleFormSubmit}>
              <input 
                className="snap-input snap-input--field" 
                placeholder="Your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input 
                className="snap-input snap-input--field" 
                placeholder="Business name"
                name="business"
                value={formData.business}
                onChange={handleInputChange}
                required
              />
              <input 
                className="snap-input snap-input--field" 
                placeholder="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <select 
                className="snap-select snap-select--field"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose industry</option>
                <option value="contractors">🔨 Contractors</option>
                <option value="apartments">🏢 Apartments</option>
                <option value="airbnb">🏡 Airbnb</option>
                <option value="photography">📷 Photography</option>
              </select>
              <textarea 
                className="snap-textarea snap-textarea--field" 
                placeholder="Tell me what you want Lucio to handle..."
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              <button 
                className="snap-btn snap-submit" 
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Request Demo Setup"}
              </button>
              {submitted && (
                <div className="snap-form-success">
                  ✓ Demo request received! We'll follow up soon.
                </div>
              )}
            </form>
          </div>

          <div className="snap-form-card">
            <p className="snap-pill" style={{ display: "inline-flex" }}>Why it closes</p>
            <h2>This is not a chatbot. It’s a lead system.</h2>
            <p>
              Lucio gives businesses something they immediately understand: faster replies, captured leads, and follow-up that does not depend on someone checking their phone all day.
            </p>
            <p>
              That makes the offer easier to sell than “AI” by itself. You are packaging a clear outcome: more conversations, more bookings, and fewer lost opportunities.
            </p>

            <div className="snap-proof-box snap-proof-box--accented">
              <p>Positioning line</p>
              <strong>
                “We install Lucio — an AI assistant that answers questions, captures leads, and follows up automatically.”
              </strong>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <LucioFloatingWidget />
    </div>
  );
}
