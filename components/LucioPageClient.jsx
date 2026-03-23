"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Footer from "./Footer";
import LucioFloatingWidget from "./LucioFloatingWidget";
import Navbar from "./Navbar";

const content = {
  en: {
    navHome: "← Back to Home",
    switchLabel: "Language",
    switchEn: "EN",
    switchEs: "ES",
    badge: "LUCIO AI SALES ENGINE",
    headline: "Make Your Business Respond, Capture, and Sell With Lucio AI",
    subheadline:
      "Lucio works like a digital sales assistant for your business — answering questions, qualifying leads, capturing contact details, and helping you close more customers automatically.",
    ctaPrimary: "I Want Lucio for My Business",
    ctaSecondary: "See Lucio in Action",
    proof: [
      { value: "24/7", label: "always answering" },
      { value: "< 1 min", label: "target response window" },
      { value: "More jobs", label: "from captured leads" },
    ],
    quickBenefits: [
      "Responds instantly",
      "Qualifies leads automatically",
      "Captures contact details",
      "Follows up by SMS",
      "Helps close more sales",
    ],
    desireTitle: "Lucio is not just a chatbot.",
    desireText:
      "It is a digital sales assistant that responds for your business, captures leads, follows up automatically, and helps you close more customers without relying on manual replies.",
    desirePills: ["24/7 active", "More leads", "More speed", "More closes"],
    demoTitle: "This is what Lucio looks like in action",
    compareTitle: "Before Lucio / After Lucio",
    compareLeftTitle: "Without Lucio",
    compareRightTitle: "With Lucio",
    frontendTitle: "Frontend Power",
    frontendText:
      "Lucio is the part your customers see. It lives on your website, welcomes visitors, answers questions, guides them, and pushes them toward action with a clean, mobile-first experience.",
    backendTitle: "Backend Power",
    backendText:
      "Behind the scenes, Lucio runs on AI, business logic, lead tracking, and automation. It organizes conversations, stores leads, triggers follow-ups, and supports your sales process 24/7.",
    roiTitle: "Why Lucio Pays for Itself",
    roiText:
      "If one extra booking covers the monthly cost, Lucio becomes a profit tool — not an expense. Faster response times, better lead handling, and automated follow-up turn missed opportunities into revenue.",
    benefitsTitle: "Key Benefits",
  },
  es: {
    navHome: "← Volver al Inicio",
    switchLabel: "Idioma",
    switchEn: "EN",
    switchEs: "ES",
    badge: "MOTOR DE VENTAS LUCIO AI",
    headline: "Haz Que Tu Negocio Responda, Capture y Venda con Lucio AI",
    subheadline:
      "Lucio funciona como un asistente digital de ventas para tu negocio — responde preguntas, califica clientes, captura datos y te ayuda a cerrar más ventas automáticamente.",
    ctaPrimary: "Quiero a Lucio en Mi Negocio",
    ctaSecondary: "Mira Lucio en Acción",
    proof: [
      { value: "24/7", label: "siempre respondiendo" },
      { value: "< 1 min", label: "meta de respuesta" },
      { value: "Más ventas", label: "desde leads capturados" },
    ],
    quickBenefits: [
      "Responde al instante",
      "Califica clientes automáticamente",
      "Captura datos sin esfuerzo",
      "Da seguimiento por SMS",
      "Te ayuda a cerrar más ventas",
    ],
    desireTitle: "Lucio no es solo un chatbot.",
    desireText:
      "Es un asistente digital que responde por tu negocio, captura clientes, da seguimiento automáticamente y te ayuda a vender más sin depender de respuestas manuales.",
    desirePills: ["24/7 activo", "Más leads", "Más velocidad", "Más cierres"],
    demoTitle: "Así se ve Lucio trabajando",
    compareTitle: "Antes de Lucio / Después de Lucio",
    compareLeftTitle: "Sin Lucio",
    compareRightTitle: "Con Lucio",
    frontendTitle: "Poder del Frontend",
    frontendText:
      "Lucio es la parte que ven tus clientes. Vive en tu sitio, recibe visitantes, responde preguntas, guía a las personas y las lleva hacia la acción con una experiencia limpia y optimizada para móvil.",
    backendTitle: "Poder del Backend",
    backendText:
      "Detrás del sistema, Lucio funciona con inteligencia artificial, lógica de negocio, seguimiento de clientes y automatización. Organiza conversaciones, guarda leads y activa seguimientos 24/7.",
    roiTitle: "Por Qué Lucio Se Paga Solo",
    roiText:
      "Si una sola reserva adicional cubre el costo mensual, Lucio deja de ser un gasto y se convierte en una herramienta de ganancia. Respuestas más rápidas, mejor manejo de clientes y seguimiento automático se traducen en ingresos.",
    benefitsTitle: "Beneficios Clave",
  },
};

function MiniCard({ title, text, accentClass }) {
  return (
    <div className={`lucio-mini-card ${accentClass || ""}`}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default function LucioPageClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "es" ? "es" : "en";
  const t = content[lang];

  const navLinks = [
    {
      label: lang === "es" ? "Inicio" : "Home",
      href: `/?lang=${lang}`,
      desktopClassName: "text-sm text-white/75 hover:text-white",
    },
    {
      label: lang === "es" ? "Quién es Lucio" : "Who is Lucio?",
      href: "#top",
      desktopClassName: "text-sm font-semibold text-sky-300 hover:text-sky-200",
    },
    {
      label: lang === "es" ? "Beneficios" : "Benefits",
      href: "#benefits",
      desktopClassName: "text-sm text-white/75 hover:text-white",
    },
    {
      label: lang === "es" ? "Demo" : "Demo",
      href: "#video",
      desktopClassName: "text-sm text-white/75 hover:text-white",
    },
    {
      label: lang === "es" ? "Retorno" : "ROI",
      href: "#buy",
      desktopClassName: "text-sm text-white/75 hover:text-white",
    },
  ];

  return (
    <main className="lucio-page" style={{ position: "relative", overflow: "hidden" }}>
      <Navbar
        navLinks={navLinks}
        brandHref={`/?lang=${lang}`}
        ctaHref="#buy"
        ctaLabel={lang === "es" ? "Quiero Lucio" : "Get Lucio"}
        currentLang={lang}
        langHrefMap={{
          en: "/lucio?lang=en",
          es: "/lucio?lang=es",
        }}
      />
      <section className="lucio-shell">
        <section id="top" className="lucio-hero" style={{ position: "relative", overflow: "hidden" }}>
          <div
            className="lucio-hero-bg"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              pointerEvents: "none",
              opacity: 0.58,
            }}
          >
            <picture style={{ width: "100%", height: "100%", display: "block" }}>
              <source media="(min-width: 1024px)" srcSet="/desktop.webp" type="image/webp" />
              <source media="(min-width: 640px)" srcSet="/tablet.webp" type="image/webp" />
              <source srcSet="/moblie.webp" type="image/webp" />
              <img
                src="/moblie.png"
                alt="Lucio Background"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </picture>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(5,10,25,0.4) 0%, rgba(5,10,25,0.74) 100%)",
                zIndex: 1,
              }}
            />
          </div>
          <div className="lucio-hero-copy">
            <div className="lucio-badge">{t.badge}</div>
            <h1>{t.headline}</h1>
            <p className="lucio-subheadline">{t.subheadline}</p>

            <div className="lucio-hero-actions">
              <a href="#buy" className="lucio-btn lucio-btn-primary">
                {t.ctaPrimary}
              </a>
              <a href="#video" className="lucio-btn lucio-btn-secondary lucio-btn-secondary-action">
                {t.ctaSecondary}
              </a>
            </div>

            <section className="lucio-quick-strip">
              {t.quickBenefits.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </section>

            <section className="lucio-proof-strip">
              {t.proof.map((item) => (
                <div key={item.label} className="lucio-proof-pill">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </section>

            <section className="lucio-desire-band">
              <h2>{t.desireTitle}</h2>
              <p>{t.desireText}</p>
              <div className="lucio-desire-pills">
                {t.desirePills.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          </div>

          <div className="lucio-video-card" id="video">
            <div className="lucio-video-label">{t.ctaSecondary}</div>
            <div className="lucio-video-placeholder">
              <div className="lucio-play">▶</div>
              <p>{lang === "es" ? "Mira a Lucio en acción muy pronto" : "Watch Lucio in action soon"}</p>
            </div>
          </div>
        </section>

        <section className="lucio-card-grid">
          <MiniCard
            accentClass="lucio-mini-card--purple"
            title={lang === "es" ? "Respuesta Instantánea" : "Instant Response"}
            text={
              lang === "es"
                ? "Lucio responde de inmediato para que los clientes no se enfríen."
                : "Lucio answers right away so leads do not go cold while you are busy."
            }
          />
          <MiniCard
            accentClass="lucio-mini-card--teal"
            title={lang === "es" ? "Calificación de Leads" : "Lead Qualification"}
            text={
              lang === "es"
                ? "Hace preguntas inteligentes para identificar clientes serios."
                : "It asks smart questions to filter serious buyers from casual visitors."
            }
          />
          <MiniCard
            accentClass="lucio-mini-card--amber"
            title={lang === "es" ? "Seguimiento Automático" : "Automatic Follow-Up"}
            text={
              lang === "es"
                ? "Lucio ayuda a mantener leads activos con SMS y automatización."
                : "Lucio helps keep leads warm with SMS and workflow automation."
            }
          />
          <MiniCard
            accentClass="lucio-mini-card--blue"
            title={lang === "es" ? "Enfocado en ROI" : "ROI Focused"}
            text={
              lang === "es"
                ? "Una reserva o venta extra puede pagar el sistema."
                : "One extra booking or sale can easily pay for the system."
            }
          />
        </section>

        <section className="lucio-demo-band">
          <div className="lucio-demo-header">
            <span className="lucio-section-tag">{t.demoTitle}</span>
          </div>

          <div className="lucio-demo-chat">
            <div className="lucio-demo-bubble is-user">
              <strong>{lang === "es" ? "Cliente" : "Customer"}:</strong>{" "}
              {lang === "es" ? "¿Tienen disponibilidad esta semana?" : "Do you have availability this week?"}
            </div>

            <div className="lucio-demo-bubble is-lucio">
              <strong>Lucio:</strong>{" "}
              {lang === "es"
                ? "Sí. ¿Qué servicio necesitas y cuál es tu mejor número para contactarte?"
                : "Yes. What service do you need and what’s the best number to reach you?"}
            </div>

            <div className="lucio-demo-bubble is-user">
              <strong>{lang === "es" ? "Cliente" : "Customer"}:</strong>{" "}
              {lang === "es"
                ? "Quiero más información para empezar pronto."
                : "I want more information so I can get started soon."}
            </div>

            <div className="lucio-demo-bubble is-lucio">
              <strong>Lucio:</strong>{" "}
              {lang === "es"
                ? "Perfecto. Ya estoy capturando tu solicitud para que te contacten rápido."
                : "Perfect. I’m capturing your request now so someone can reach out quickly."}
            </div>
          </div>
        </section>

        <section className="lucio-compare-band">
          <h2>{t.compareTitle}</h2>

          <div className="lucio-compare-grid">
            <div className="lucio-compare-card is-left">
              <h3>{t.compareLeftTitle}</h3>
              <ul>
                <li>{lang === "es" ? "Respondes tarde" : "Slow replies"}</li>
                <li>{lang === "es" ? "Se pierden mensajes" : "Missed messages"}</li>
                <li>{lang === "es" ? "Leads fríos" : "Cold leads"}</li>
                <li>{lang === "es" ? "Poco seguimiento" : "Weak follow-up"}</li>
                <li>{lang === "es" ? "Menos ventas" : "Fewer sales"}</li>
              </ul>
            </div>

            <div className="lucio-compare-card is-right">
              <h3>{t.compareRightTitle}</h3>
              <ul>
                <li>{lang === "es" ? "Respuesta inmediata" : "Instant response"}</li>
                <li>{lang === "es" ? "Leads capturados" : "Leads captured"}</li>
                <li>{lang === "es" ? "Seguimiento automático" : "Automatic follow-up"}</li>
                <li>{lang === "es" ? "Más confianza" : "More trust"}</li>
                <li>{lang === "es" ? "Más cierres" : "More closes"}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="lucio-two-col">
          <div className="lucio-info-panel lucio-info-panel--purple">
            <h2>{t.frontendTitle}</h2>
            <p>{t.frontendText}</p>
          </div>

          <div className="lucio-info-panel lucio-info-panel--teal">
            <h2>{t.backendTitle}</h2>
            <p>{t.backendText}</p>
          </div>
        </section>

        <section className="lucio-roi-grid">
          <div className="lucio-roi-panel">
            <div className="lucio-section-tag">ROI</div>
            <h2>{t.roiTitle}</h2>
            <p>{t.roiText}</p>

            <div className="lucio-roi-list">
              <div className="lucio-roi-item">
                <span>✓</span>
                <span>
                  {lang === "es"
                    ? "Responde al instante para no perder clientes"
                    : "Responds instantly so you stop losing hot leads"}
                </span>
              </div>
              <div className="lucio-roi-item">
                <span>✓</span>
                <span>
                  {lang === "es"
                    ? "Captura teléfono y email automáticamente"
                    : "Captures phone and email automatically"}
                </span>
              </div>
              <div className="lucio-roi-item">
                <span>✓</span>
                <span>
                  {lang === "es"
                    ? "Da seguimiento sin trabajo manual"
                    : "Follows up without manual chasing"}
                </span>
              </div>
              <div className="lucio-roi-item">
                <span>✓</span>
                <span>
                  {lang === "es"
                    ? "Convierte más interesados en clientes reales"
                    : "Converts more inquiries into paying customers"}
                </span>
              </div>
            </div>
          </div>

          <div className="lucio-roi-visual">
            <div className="lucio-visual-card lucio-visual-card--blue">
              <small>{lang === "es" ? "Costo Mensual de Lucio" : "Monthly Lucio Cost"}</small>
              <strong>$99</strong>
            </div>

            <div className="lucio-visual-card lucio-visual-card--purple">
              <small>{lang === "es" ? "Valor de 1 Reserva Extra" : "1 Extra Booking Value"}</small>
              <strong>$300–$1,500+</strong>
            </div>

            <div className="lucio-visual-card lucio-visual-win">
              <small>{lang === "es" ? "Retorno Potencial" : "Potential Return"}</small>
              <strong>{lang === "es" ? "ROI Positivo" : "Positive ROI"}</strong>
            </div>
          </div>
        </section>

        <section id="benefits" className="lucio-benefits">
          <h2>{t.benefitsTitle}</h2>

          <div className="lucio-benefits-grid">
            <div className="lucio-benefit-item lucio-benefit-item--purple">
              {lang === "es" ? "Más leads capturados" : "More leads captured"}
            </div>
            <div className="lucio-benefit-item lucio-benefit-item--teal">
              {lang === "es" ? "Respuestas más rápidas" : "Faster response times"}
            </div>
            <div className="lucio-benefit-item lucio-benefit-item--amber">
              {lang === "es" ? "Mejor experiencia para el cliente" : "Better customer experience"}
            </div>
            <div className="lucio-benefit-item lucio-benefit-item--blue">
              {lang === "es" ? "Menos seguimiento manual" : "Less manual follow-up"}
            </div>
            <div className="lucio-benefit-item lucio-benefit-item--teal">
              {lang === "es" ? "Más llamadas y ventas agendadas" : "More booked calls and jobs"}
            </div>
            <div className="lucio-benefit-item lucio-benefit-item--purple">
              {lang === "es"
                ? "Una imagen más moderna con AI"
                : "A more modern, AI-powered business image"}
            </div>
          </div>
        </section>

        <section className="lucio-cta-band" id="buy">
          <h2>
            {lang === "es"
              ? "Haz que tu negocio responda y venda como una empresa moderna"
              : "Make your business respond and sell like a modern company"}
          </h2>
          <p>
            {lang === "es"
              ? "Instala a Lucio y convierte más visitantes en clientes sin perder oportunidades por responder tarde."
              : "Install Lucio and turn more visitors into customers without losing opportunities because of slow replies."}
          </p>
          <div className="lucio-hero-actions lucio-cta-actions">
            <Link href="/#book" className="lucio-btn lucio-btn-primary">
              {lang === "es" ? "Quiero a Lucio en Mi Negocio" : "I Want Lucio for My Business"}
            </Link>
            <Link href="/" className="lucio-btn lucio-btn-secondary lucio-btn-secondary-chat">
              {lang === "es" ? "Volver al Inicio" : "Back to Home"}
            </Link>
          </div>
        </section>
      </section>
      <Footer />
      <LucioFloatingWidget lang={lang} />
    </main>
  );
}
