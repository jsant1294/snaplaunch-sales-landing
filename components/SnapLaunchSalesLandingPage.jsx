"use client";

import { useState } from "react";
import LucioFloatingWidget from "../components/LucioFloatingWidget";
import Footer from "../components/Footer";

const content = {
  en: {
    nav: {
      howItWorks: "How it works",
      whoIsLucio: "Who is Lucio?",
      industries: "Industries",
      pricing: "Pricing",
      bookDemo: "Book Demo",
    },
    hero: {
      title: "We build high-converting websites powered by Lucio AI —",
      sub: "designed to capture leads, respond instantly, and turn visitors into customers.",
      pill: "Website + AI + SMS in one system",
      ctaPrimary: "Book a Demo",
      ctaSecondary: "See Lucio in Action",
      support:
        "⚡ Not just a website — a full lead capture system that works 24/7",
      proof: [
        { value: "< 60 sec", label: "target first response" },
        { value: "24/7", label: "lead capture coverage" },
        { value: "1 system", label: "site + AI + follow-up" },
      ],
      miniChat: "Lead response coverage",
      miniText: "Instant follow-up flow",
      miniVoice: "Contractors, apartments, Airbnb, more",
    },
    sections: {
      pillars: {
        leadCapture: {
          title: "Instant Lead Capture",
          text: "Lucio greets every visitor, answers questions, and locks in serious leads before they bounce — day or night.",
        },
        smsFollowup: {
          title: "SMS Follow-Up",
          text: "Every qualified lead fires an automatic text follow-up in seconds — so no deal ever goes cold again.",
        },
        industryReady: {
          title: "Industry Ready",
          text: "Built for contractors, apartments, Airbnb hosts, and service businesses that can't afford to miss a lead.",
        },
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "A simple lead engine businesses understand fast.",
        sub: "SnapLaunch is designed to feel simple to the client while doing powerful work behind the scenes.",
        steps: [
          {
            number: "01",
            title: "Visitor lands on your page",
            text: "Lucio appears like a helpful AI receptionist, ready to answer questions and guide the next step.",
          },
          {
            number: "02",
            title: "Lucio qualifies the lead",
            text: "The assistant asks smart questions, captures contact details, and moves the visitor toward booking.",
          },
          {
            number: "03",
            title: "Follow-up happens automatically",
            text: "The system saves the lead, sends SMS, and routes the prospect into your SnapLaunch dashboard.",
          },
        ],
      },
      preview: {
        eyebrow: "Live Preview",
        title: "See Lucio in action with our demo number.",
        sub: "Try calling or texting to experience how leads are captured in real-time.",
        callTitle: "Call Demo",
        textTitle: "Text Demo",
        badgeVoice: "Voice",
        badgeSms: "SMS",
        callButton: "Call Lucio",
        textButton: "Text Lucio",
        fastReply: "⚡ I personally respond within minutes",
        smsMessages: [
          "Hi! Tell me about your project and I'll match you with a specialist.",
          "Looking for a contractor to remodel my kitchen.",
          "Great! I'll send you available contractors. What's your timeline?",
        ],
        smsPlaceholder: "Type your message...",
      },
      industries: {
        eyebrow: "Industries",
        title: "Built for real businesses that lose leads every day.",
        sub: "Start with one vertical, then clone the same Lucio-powered engine across multiple offers.",
        cards: [
          {
            title: "Contractors",
            text: "Turn estimate requests into booked calls with fast, simple lead capture.",
            tag: "Quotes + calls",
          },
          {
            title: "Apartments",
            text: "Answer leasing questions, check availability, and book tours around the clock.",
            tag: "Tours + leasing",
          },
          {
            title: "Airbnb",
            text: "Handle guest questions, check-in info, and direct booking inquiries without being glued to your phone.",
            tag: "Guest support",
          },
          {
            title: "Photography",
            text: "Help prospects ask about sessions, pricing, and availability while Lucio captures every lead.",
            tag: "Bookings + inquiries",
          },
          {
            title: "Plumbers",
            text: "Capture emergency service requests, quote questions, and appointment needs before the prospect calls someone else.",
            tag: "Emergency + service calls",
          },
          {
            title: "Electricians",
            text: "Answer wiring, repair, and install inquiries fast while Lucio routes serious leads into your booking flow.",
            tag: "Repairs + installs",
          },
          {
            title: "Painters",
            text: "Turn quote requests into booked walkthroughs by handling project details, timelines, and follow-up automatically.",
            tag: "Quotes + walkthroughs",
          },
          {
            title: "Custom Industry Setup",
            text: "Not seeing your industry here? We can custom-build Lucio around your business, offer, and follow-up flow.",
            tag: "Custom tailored",
          },
        ],
      },
      caseStudy: {
        eyebrow: "Why clients buy",
        title: "A simple offer potential clients understand immediately.",
        sub: "Instead of selling abstract AI, you are selling faster response, captured leads, and booked work.",
        scenarioTitle: "Example pitch",
        scenarioText:
          '"We install a high-converting website with Lucio AI so your business can answer visitors instantly, capture contact details, and follow up automatically."',
        stats: [
          { value: "Faster", label: "response experience from the first visit" },
          { value: "More", label: "qualified leads captured before they bounce" },
          { value: "Less", label: "manual chasing and missed opportunities" },
        ],
      },
      pricing: {
        eyebrow: "Pricing",
        banner:
          "⚡ Most businesses choose Pro — it gives you everything needed to start booking jobs immediately, but we can create a custom system for your brand",
        title:
          "We build websites that don’t just look good — they capture leads and follow up automatically.",
        sub: "We build everything for you — no technical skills needed.",
        featuredPill: "Best launch offer",
        roiBadge: "🔥 Best ROI — pays for itself with 1–2 jobs",
        plans: [
          {
            name: "Starter",
            note: "+ $250 setup",
            cta: "Start with Starter",
            features: [
              "Mobile-first landing page",
              "Lucio chat widget",
              "Lead capture flow",
              "Basic industry setup",
            ],
          },
          {
            name: "Pro",
            note: "+ $350 setup",
            cta: "Choose Pro",
            features: [
              "Everything in Starter",
              "Booking integration",
              "SMS demo wiring",
              "Conversion-optimized Lucio flow",
              "Best fit for most businesses",
            ],
          },
          {
            name: "Done For You",
            note: "+ $450 setup",
            cta: "Book a Strategy Call",
            features: [
              "Full system build",
              "AI assistant setup",
              "Twilio SMS + voice integration",
              "Advanced automation flow",
              "Strategy + launch support",
            ],
          },
        ],
      },
      book: {
        eyebrow: "Book a demo",
        title: "Let's install Lucio into your business.",
        sub: "Show me your business and I'll map the best SnapLaunch setup for your leads, follow-up flow, and industry use case.",
        fields: {
          name: "Your name",
          business: "Business name",
          email: "Email",
          industry: "Choose industry",
          message: "Tell me what you want Lucio to handle...",
        },
        industries: {
          contractors: "🔨 Contractors",
          apartments: "🏢 Apartments",
          airbnb: "🏡 Airbnb",
          photography: "📷 Photography",
          plumbers: "🪠 Plumbers",
          electricians: "💡 Electricians",
          painters: "🎨 Painters",
        },
        submit: "Request Demo Setup",
        submitting: "Submitting...",
        success: "✓ Demo request received! We'll follow up soon.",
      },
      whyItCloses: {
        eyebrow: "Why it closes",
        title: "This is not a chatbot. It's a lead system.",
        p1: "Lucio gives businesses something they immediately understand: faster replies, captured leads, and follow-up that does not depend on someone checking their phone all day.",
        p2: 'That makes the offer easier to sell than "AI" by itself. You are packaging a clear outcome: more conversations, more bookings, and fewer lost opportunities.',
        boxLabel: "Positioning line",
        boxText:
          '"We build you a high-converting website powered by Lucio — an AI assistant that answers questions, captures leads, and follows up automatically."',
      },
    },
  },
  es: {
    nav: {
      howItWorks: "Cómo funciona",
      whoIsLucio: "¿Quién es Lucio?",
      industries: "Industrias",
      pricing: "Precios",
      bookDemo: "Agendar Demo",
    },
    hero: {
      title: "Creamos sitios web de alta conversión impulsados por Lucio AI —",
      sub: "diseñados para captar clientes, responder al instante y convertir visitantes en ventas.",
      pill: "Sitio web + AI + SMS en un solo sistema",
      ctaPrimary: "Agendar Demo",
      ctaSecondary: "Ver a Lucio en acción",
      support:
        "⚡ No es solo un sitio web — es un sistema completo de captura de clientes que trabaja 24/7",
      proof: [
        { value: "< 60 seg", label: "meta de primera respuesta" },
        { value: "24/7", label: "cobertura de captación" },
        { value: "1 sistema", label: "sitio + AI + seguimiento" },
      ],
      miniChat: "Cobertura de respuestas",
      miniText: "Seguimiento instantáneo",
      miniVoice: "Contratistas, apartamentos, Airbnb y más",
    },
    sections: {
      pillars: {
        leadCapture: {
          title: "Captura instantánea de clientes",
          text: "Lucio recibe a cada visitante, responde preguntas y asegura clientes potenciales antes de que abandonen tu sitio — de día o de noche.",
        },
        smsFollowup: {
          title: "Seguimiento por SMS",
          text: "Cada cliente calificado activa un seguimiento automático por mensaje en segundos — para que ninguna oportunidad se enfríe.",
        },
        industryReady: {
          title: "Listo para tu industria",
          text: "Diseñado para contratistas, apartamentos, Airbnb y negocios de servicios que no pueden darse el lujo de perder clientes.",
        },
      },
      howItWorks: {
        eyebrow: "Cómo funciona",
        title: "Un sistema de captación simple que cualquier negocio entiende rápido.",
        sub: "SnapLaunch está diseñado para sentirse simple para el cliente, mientras hace un trabajo poderoso detrás de escena.",
        steps: [
          {
            number: "01",
            title: "El visitante llega a tu página",
            text: "Lucio aparece como un recepcionista virtual útil, listo para responder preguntas y guiar el siguiente paso.",
          },
          {
            number: "02",
            title: "Lucio califica al cliente",
            text: "El asistente hace preguntas inteligentes, captura los datos de contacto y acerca al visitante a reservar.",
          },
          {
            number: "03",
            title: "El seguimiento ocurre automáticamente",
            text: "El sistema guarda el cliente, envía SMS y dirige al prospecto a tu panel de SnapLaunch.",
          },
        ],
      },
      preview: {
        eyebrow: "Vista en vivo",
        title: "Prueba a Lucio en acción con nuestro número demo.",
        sub: "Llama o envía un mensaje para ver cómo se capturan clientes en tiempo real.",
        callTitle: "Demo por llamada",
        textTitle: "Demo por mensaje",
        badgeVoice: "Voz",
        badgeSms: "SMS",
        callButton: "Llamar a Lucio",
        textButton: "Enviar mensaje a Lucio",
        fastReply: "⚡ Yo personalmente respondo en minutos",
        smsMessages: [
          "¡Hola! Cuéntame sobre tu proyecto y te conectaré con un especialista.",
          "Busco un contratista para remodelar mi cocina.",
          "¡Perfecto! Te enviaré contratistas disponibles. ¿Cuál es tu tiempo estimado?",
        ],
        smsPlaceholder: "Escribe tu mensaje...",
      },
      industries: {
        eyebrow: "Industrias",
        title: "Diseñado para negocios reales que pierden clientes todos los días.",
        sub: "Empieza con un solo nicho y luego replica el mismo sistema impulsado por Lucio en múltiples ofertas.",
        cards: [
          {
            title: "Contratistas",
            text: "Convierte solicitudes de cotización en llamadas agendadas con una captura de clientes rápida y simple.",
            tag: "Cotizaciones + llamadas",
          },
          {
            title: "Apartamentos",
            text: "Responde preguntas de arrendamiento, verifica disponibilidad y agenda tours las 24 horas.",
            tag: "Tours + arrendamiento",
          },
          {
            title: "Airbnb",
            text: "Responde preguntas de huéspedes, información de check-in y reservas directas sin vivir pegado al teléfono.",
            tag: "Soporte a huéspedes",
          },
          {
            title: "Fotografía",
            text: "Ayuda a prospectos a preguntar por sesiones, precios y disponibilidad mientras Lucio captura cada cliente.",
            tag: "Reservas + consultas",
          },
          {
            title: "Plomeros",
            text: "Captura solicitudes urgentes, preguntas de servicio y citas antes de que el prospecto llame a otro negocio.",
            tag: "Emergencias + servicios",
          },
          {
            title: "Electricistas",
            text: "Responde rápido a consultas sobre reparaciones, instalaciones y cableado mientras Lucio dirige clientes serios a tu agenda.",
            tag: "Reparaciones + instalaciones",
          },
          {
            title: "Pintores",
            text: "Convierte solicitudes de cotización en visitas agendadas gestionando detalles del proyecto, tiempos y seguimiento automático.",
            tag: "Cotizaciones + visitas",
          },
          {
            title: "Configuración personalizada",
            text: "¿No ves tu industria aquí? Podemos personalizar Lucio según tu negocio, oferta y flujo de seguimiento.",
            tag: "Hecho a tu medida",
          },
        ],
      },
      caseStudy: {
        eyebrow: "Por qué compran",
        title: "Una oferta simple que los clientes entienden de inmediato.",
        sub: "En lugar de vender AI abstracta, estás vendiendo respuestas rápidas, leads capturados y más trabajo agendado.",
        scenarioTitle: "Ejemplo de pitch",
        scenarioText:
          '"Instalamos un sitio de alta conversión con Lucio AI para que tu negocio responda visitantes al instante, capture datos y haga seguimiento automático."',
        stats: [
          { value: "Más rápida", label: "la experiencia de respuesta desde la primera visita" },
          { value: "Más", label: "leads calificados capturados antes de que se vayan" },
          { value: "Menos", label: "seguimiento manual y oportunidades perdidas" },
        ],
      },
      pricing: {
        eyebrow: "Precios",
        banner:
          "⚡ La mayoría de los negocios eligen Pro — te da todo lo necesario para empezar a agendar trabajos de inmediato, pero también podemos crear un sistema personalizado para tu marca",
        title:
          "Creamos sitios web que no solo se ven bien — capturan clientes y dan seguimiento automáticamente.",
        sub: "Nosotros construimos todo por ti — no necesitas conocimientos técnicos.",
        featuredPill: "Mejor oferta de lanzamiento",
        roiBadge: "🔥 Mejor retorno — se paga solo con 1–2 trabajos",
        plans: [
          {
            name: "Starter",
            note: "+ $250 de configuración",
            cta: "Empezar con Starter",
            features: [
              "Landing page optimizada para móvil",
              "Widget de chat Lucio",
              "Flujo de captura de clientes",
              "Configuración básica para tu industria",
            ],
          },
          {
            name: "Pro",
            note: "+ $350 de configuración",
            cta: "Elegir Pro",
            features: [
              "Todo lo de Starter",
              "Integración de reservas",
              "Conexión demo de SMS",
              "Flujo de Lucio optimizado para convertir",
              "La mejor opción para la mayoría",
            ],
          },
          {
            name: "Done For You",
            note: "+ $450 de configuración",
            cta: "Agendar llamada estratégica",
            features: [
              "Construcción completa del sistema",
              "Configuración del asistente AI",
              "Integración Twilio SMS + voz",
              "Flujo avanzado de automatización",
              "Estrategia y soporte de lanzamiento",
            ],
          },
        ],
      },
      book: {
        eyebrow: "Agendar demo",
        title: "Vamos a instalar Lucio en tu negocio.",
        sub: "Muéstrame tu negocio y te diré cuál es la mejor configuración de SnapLaunch para tus clientes, seguimiento y tipo de industria.",
        fields: {
          name: "Tu nombre",
          business: "Nombre del negocio",
          email: "Correo electrónico",
          industry: "Elige tu industria",
          message: "Cuéntame qué quieres que Lucio gestione...",
        },
        industries: {
          contractors: "🔨 Contratistas",
          apartments: "🏢 Apartamentos",
          airbnb: "🏡 Airbnb",
          photography: "📷 Fotografía",
          plumbers: "🪠 Plomeros",
          electricians: "💡 Electricistas",
          painters: "🎨 Pintores",
        },
        submit: "Solicitar demo",
        submitting: "Enviando...",
        success: "✓ ¡Solicitud recibida! Te contactaremos pronto.",
      },
      whyItCloses: {
        eyebrow: "Por qué funciona",
        title: "Esto no es un chatbot. Es un sistema de clientes.",
        p1: "Lucio le da a los negocios algo que entienden al instante: respuestas más rápidas, clientes capturados y seguimiento sin depender de estar revisando el teléfono todo el día.",
        p2: 'Eso hace que sea más fácil vender esta oferta que vender solo "AI". Estás vendiendo un resultado claro: más conversaciones, más reservas y menos oportunidades perdidas.',
        boxLabel: "Línea de posicionamiento",
        boxText:
          '"Te construimos un sitio web de alta conversión impulsado por Lucio — un asistente AI que responde preguntas, captura clientes y da seguimiento automáticamente."',
      },
    },
  },
};

const pillars = [
  {
    title: "Instant Lead Capture",
    stat: "24/7",
    text: "",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #6358ff 0%, #a78bfa 100%)",
    accent: "#a78bfa",
    colorClass: "pillar-purple",
  },
  {
    title: "SMS Follow-Up",
    stat: "Instant",
    text: "",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #0d9488 0%, #34d399 100%)",
    accent: "#34d399",
    colorClass: "pillar-teal",
  },
  {
    title: "Industry Ready",
    stat: "4+",
    text: "",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)",
    accent: "#fb923c",
    colorClass: "pillar-amber",
  },
];

const steps = [
  {
    number: "01",
    title: "",
    text: "",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="14" rx="3" />
        <path d="M8 20h8" />
        <path d="M12 18v2" />
        <path d="M7.5 9.5h4" />
        <circle cx="15.5" cy="11.5" r="2.5" />
        <path d="m17.3 13.3 1.7 1.7" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "",
    text: "",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
        <path d="m15.5 8.5 1 1 2-2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "",
    text: "",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="6" height="4" rx="1.5" />
        <rect x="15" y="5" width="6" height="4" rx="1.5" />
        <rect x="9" y="15" width="6" height="4" rx="1.5" />
        <path d="M9 7h6" />
        <path d="M12 9v6" />
        <path d="M12 15h0" />
      </svg>
    ),
  },
];

const useCases = [
  {
    title: "",
    text: "",
    tag: "",
    emoji: "🔨",
    accentColor: "#378ADD",
    tagClass: "tag-blue",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "🏢",
    accentColor: "#7F77DD",
    tagClass: "tag-purple",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "🏡",
    accentColor: "#BA7517",
    tagClass: "tag-amber",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "📷",
    accentColor: "#1D9E75",
    tagClass: "tag-teal",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "🚿",
    accentColor: "#378ADD",
    tagClass: "tag-blue",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "⚡",
    accentColor: "#1D9E75",
    tagClass: "tag-teal",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "🖌️",
    accentColor: "#BA7517",
    tagClass: "tag-amber",
  },
  {
    title: "",
    text: "",
    tag: "",
    emoji: "✨",
    accentColor: "#a78bfa",
    tagClass: "tag-purple",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$399",
    note: "",
    features: [],
    cta: "",
    featured: false,
  },
  {
    name: "Pro",
    price: "$599",
    note: "",
    features: [],
    cta: "",
    featured: true,
  },
  {
    name: "Done For You",
    price: "$1299",
    note: "",
    features: [],
    cta: "",
    featured: false,
  },
];

export default function SnapLaunchSalesLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    industry: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const t = content[lang];
  const S = t.sections;

  const translatedPillars = [
    {
      ...pillars[0],
      title: S.pillars.leadCapture.title,
      text: S.pillars.leadCapture.text,
    },
    {
      ...pillars[1],
      title: S.pillars.smsFollowup.title,
      text: S.pillars.smsFollowup.text,
    },
    {
      ...pillars[2],
      title: S.pillars.industryReady.title,
      text: S.pillars.industryReady.text,
    },
  ];

  const translatedSteps = steps.map((step, index) => ({
    ...step,
    ...S.howItWorks.steps[index],
    colorClass:
      index === 0 ? "snap-step--purple" : index === 1 ? "snap-step--teal" : "snap-step--amber",
  }));

  const translatedUseCases = useCases.map((item, index) => ({
    ...item,
    ...S.industries.cards[index],
  }));

  const translatedPricing = pricing.map((plan, index) => ({
    ...plan,
    name: S.pricing.plans[index].name,
    note: S.pricing.plans[index].note,
    cta: S.pricing.plans[index].cta,
    features: S.pricing.plans[index].features,
  }));

  const navLinks = [
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.whoIsLucio, href: `/lucio?lang=${lang}`, className: "snap-nav-link-lucio" },
    { label: t.nav.industries, href: "#industries" },
    { label: t.nav.pricing, href: "#pricing" },
  ];

  const cardDetails = {
    [S.pillars.leadCapture.title]: {
      title: S.pillars.leadCapture.title,
      description: S.pillars.leadCapture.text,
      benefits:
        lang === "en"
          ? [
              "24/7 AI-powered engagement",
              "No missed leads",
              "Qualifies and routes prospects instantly",
            ]
          : [
              "Atención con AI 24/7",
              "Sin clientes perdidos",
              "Califica y dirige prospectos al instante",
            ],
      cta: lang === "en" ? "See Lucio in Action" : "Ver a Lucio en acción",
      href: "#lucio-in-action-section",
    },
    [S.pillars.smsFollowup.title]: {
      title: S.pillars.smsFollowup.title,
      description: S.pillars.smsFollowup.text,
      benefits:
        lang === "en"
          ? [
              "Instant SMS to every lead",
              "Automated follow-up flow",
              "No more cold or lost deals",
            ]
          : [
              "SMS instantáneo para cada cliente",
              "Seguimiento automatizado",
              "No más oportunidades frías o perdidas",
            ],
      cta: lang === "en" ? "Book a Demo" : "Agendar Demo",
      href: "#book",
    },
    [S.pillars.industryReady.title]: {
      title: S.pillars.industryReady.title,
      description: S.pillars.industryReady.text,
      benefits:
        lang === "en"
          ? [
              "Custom flows for your industry",
              "Works for contractors, apartments, Airbnb, and more",
              "Easy to launch and scale",
            ]
          : [
              "Flujos personalizados para tu industria",
              "Funciona para contratistas, apartamentos, Airbnb y más",
              "Fácil de lanzar y escalar",
            ],
      cta: lang === "en" ? "Get Started" : "Comenzar",
      href: "#industries",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({
        name: "",
        business: "",
        email: "",
        industry: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCardClick = (title) => {
    setModalContent(cardDetails[title]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <div>
      <nav className="snap-nav">
        <div
          className="snap-container snap-nav-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <a
            className="snap-brand"
            href="#"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 0,
            }}
          >
            <div className="snap-brand-badge">
              <img
                src="/lucio-logo.png"
                alt="Lucio logo"
              />
            </div>
            <div className="snap-brand-copy">
              <strong>SnapLaunch AI</strong>
              <span>Lucio-powered sales system</span>
            </div>
          </a>

          <div className="snap-links snap-links--desktop">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className={link.className}>
                {link.label}
              </a>
            ))}

            <a className="snap-btn" href="#book">
              {t.nav.bookDemo}
            </a>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`snap-nav-lang-btn ${lang === "en" ? "is-active" : ""}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`snap-nav-lang-btn ${lang === "es" ? "is-active" : ""}`}
              >
                ES
              </button>
            </div>
          </div>

          <div
            className="snap-mobile-controls"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              className="snap-mobile-lang"
              style={{
                display: "flex",
                gap: 6,
              }}
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background:
                    lang === "en"
                      ? "#2563eb"
                      : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => setLang("es")}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background:
                    lang === "es"
                      ? "#2563eb"
                      : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                ES
              </button>
            </div>

            <button
              className="snap-hamburger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="snap-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`snap-mobile-link ${link.className || ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div
              style={{
                display: "flex",
                gap: 10,
                padding: "12px 0",
                width: "100%",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setLang("en");
                  setMenuOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 8,
                  border: "none",
                  background: lang === "en" ? "#6358ff" : "#1f2937",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                EN
              </button>

              <button
                type="button"
                onClick={() => {
                  setLang("es");
                  setMenuOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 8,
                  border: "none",
                  background: lang === "es" ? "#6358ff" : "#1f2937",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                ES
              </button>
            </div>

            <a
              className="snap-btn snap-mobile-cta"
              href="#book"
              onClick={() => setMenuOpen(false)}
            >
              {t.nav.bookDemo}
            </a>
          </div>
        )}
      </nav>

      <section
        className="snap-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100svh",
        }}
      >
        <picture
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <source
            media="(min-width: 1024px)"
            srcSet="/desktop.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/tablet.webp"
            type="image/webp"
          />
          <source srcSet="/mobile.webp" type="image/webp" />
          <img
            src="/mobile.png"
            alt="Hero"
            loading="eager"
            fetchPriority="high"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </picture>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.55)",
            zIndex: 1,
          }}
        />

        <div
          className="snap-container snap-hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="snap-hero-content">
            <h1 className="snap-title">{t.hero.title}</h1>

            <p
              className="snap-sub"
              style={{
                color: "#fb923c",
                fontWeight: 800,
                fontSize: "2rem",
                margin: "16px 0",
              }}
            >
              {t.hero.sub}
            </p>

            <span className="snap-pill">{t.hero.pill}</span>

            <div className="snap-cta-row">
              <a className="snap-btn" href="#book">
                {t.hero.ctaPrimary}
              </a>

              <a className="snap-btn-secondary snap-btn-secondary--action" href="#call-demo">
                <span className="snap-btn-icon snap-btn-icon--action" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                {t.hero.ctaSecondary}
              </a>

              <a
                className="snap-btn-secondary snap-btn-secondary--chat"
                href={`/lucio?lang=${lang}`}
              >
                <span className="snap-btn-icon snap-btn-icon--chat" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                {lang === "es" ? "¿Quién es Lucio?" : "Who is Lucio?"}
              </a>
            </div>

            <p style={{ fontSize: 13, opacity: 0.7, marginTop: 14 }}>
              {t.hero.support}
            </p>

            <div className="snap-proof-strip">
              {t.hero.proof.map((item) => (
                <div key={item.label} className="snap-proof-pill">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div
              className="snap-mini-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 16,
                marginTop: 24,
                maxWidth: "760px",
              }}
            >
              <div
                className="snap-mini-card snap-mini-card--accent"
                style={{
                  borderTop: "3px solid #a78bfa",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => {
                  window.dispatchEvent(new Event("open-lucio-chat"));
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#6358ff",
                    opacity: 0.15,
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />
                <strong
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#6358ff,#a78bfa)",
                      borderRadius: 8,
                      padding: "4px 6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <span style={{ color: "#a78bfa" }}>CHAT</span>
                </strong>
                <span>{t.hero.miniChat}</span>
              </div>

              <a
                className="snap-mini-card snap-mini-card--accent"
                href="sms:+14049925807"
                style={{
                  borderTop: "3px solid #34d399",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#0d9488",
                    opacity: 0.15,
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />
                <strong
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#0d9488,#34d399)",
                      borderRadius: 8,
                      padding: "4px 6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <line x1="9" y1="7" x2="15" y2="7" />
                      <line x1="9" y1="11" x2="15" y2="11" />
                      <line x1="9" y1="15" x2="13" y2="15" />
                    </svg>
                  </span>
                  <span style={{ color: "#34d399" }}>TEXT</span>
                </strong>
                <span>{t.hero.miniText}</span>
              </a>

              <a
                className="snap-mini-card snap-mini-card--accent"
                href="tel:+14049925807"
                style={{
                  borderTop: "3px solid #fb923c",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#f59e0b",
                    opacity: 0.15,
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />
                <strong
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg,#f59e0b,#fb923c)",
                      borderRadius: 8,
                      padding: "4px 6px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                  </span>
                  <span style={{ color: "#fb923c" }}>VOICE</span>
                </strong>
                <span>{t.hero.miniVoice}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-container">
          <div className="snap-card-grid">
            {translatedPillars.map((item) => (
              <div
                key={item.title}
                className={`snap-panel snap-panel--icon ${item.colorClass}`}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderTop: `3px solid ${item.accent}`,
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(item.title)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -30,
                    right: -30,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: item.accent,
                    opacity: 0.12,
                    filter: "blur(30px)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <div
                    className="snap-icon-tile"
                    style={{
                      background: item.gradient,
                      border: "none",
                      padding: 12,
                      borderRadius: 14,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span className="snap-panel-stat">{item.stat}</span>
                </div>
                <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && modalContent && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,16,32,0.82)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#181f2e",
              borderRadius: 18,
              maxWidth: 380,
              width: "90vw",
              padding: 32,
              boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
              color: "#fff",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>
              {modalContent.title}
            </h2>
            <p style={{ fontSize: 16, marginBottom: 18 }}>
              {modalContent.description}
            </p>
            <ul style={{ marginBottom: 18, paddingLeft: 18 }}>
              {modalContent.benefits.map((b, i) => (
                <li key={i} style={{ marginBottom: 6, fontSize: 15 }}>
                  • {b}
                </li>
              ))}
            </ul>
            <a
              href={modalContent.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(90deg,#6358ff,#a78bfa)",
                color: "#fff",
                borderRadius: 8,
                padding: "12px 28px",
                fontWeight: 700,
                fontSize: 16,
                marginTop: 8,
                textDecoration: "none",
              }}
              onClick={closeModal}
            >
              {modalContent.cta}
            </a>
          </div>
        </div>
      )}

      <section id="how-it-works" className="snap-section-alt">
        <div className="snap-container">
          <div className="snap-how-it-works-header">
            <div className="snap-section-head">
              <p>{S.howItWorks.eyebrow}</p>
              <h2>{S.howItWorks.title}</h2>
              <span>{S.howItWorks.sub}</span>
            </div>
          </div>

          <div className="snap-steps snap-steps--connected">
            {translatedSteps.map((item, index) => (
              <div key={item.title} className={`snap-step snap-step--card ${item.colorClass}`}>
                {index < translatedSteps.length - 1 && (
                  <div className="snap-step-connector" />
                )}
                <div className="snap-step-top">
                  <div className="snap-step-icon-wrap">{item.icon}</div>
                  <span className="snap-step-number">{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="snap-section" id="lucio-in-action-section">
        <div className="snap-container">
          <div className="snap-section-head">
            <p>{S.preview.eyebrow}</p>
            <h2>{S.preview.title}</h2>
            <span>{S.preview.sub}</span>
          </div>

          <div className="snap-preview-grid">
            <div
              className="snap-preview-card"
              id="call-demo"
              style={{ scrollMarginTop: "120px" }}
            >
              <div className="snap-preview-header">
                <h3>{S.preview.callTitle}</h3>
                <span className="snap-preview-badge">
                  {S.preview.badgeVoice}
                </span>
              </div>

              <div className="snap-call-preview">
                <div className="snap-call-card">
                  <div className="snap-call-content">
                    <div className="snap-call-screen">
                      <div className="snap-call-display">
                        <div className="snap-call-avatar">
                          <img src="/lucio-avatar.png" alt="Lucio AI" />
                        </div>
                        <p className="snap-call-name">Lucio AI</p>
                        <p className="snap-call-status">
                          {lang === "en" ? "In Call..." : "En llamada..."}
                        </p>
                        <div className="snap-call-duration">00:45</div>
                      </div>

                      <div className="snap-call-buttons">
                        <button className="snap-call-btn snap-call-btn--mute">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          </svg>
                        </button>
                        <button className="snap-call-btn snap-call-btn--end">
                          {lang === "en" ? "End" : "Finalizar"}
                        </button>
                        <button className="snap-call-btn snap-call-btn--speaker">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="snap-call-footer">
                    <div className="snap-demo-footer">
                      <p className="snap-demo-number">(404) 992-5807</p>
                      <a
                        href="tel:+14049925807"
                        className="snap-btn snap-demo-action"
                      >
                        {S.preview.callButton}
                      </a>
                      <span className="snap-demo-pill">
                        {S.preview.fastReply}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="snap-preview-card">
              <div className="snap-preview-header">
                <h3>{S.preview.textTitle}</h3>
                <span className="snap-preview-badge">{S.preview.badgeSms}</span>
              </div>

              <div className="snap-text-preview">
                <div className="snap-text-screen">
                  <div className="snap-text-header">
                    <p>Lucio AI</p>
                    <span>{lang === "en" ? "Lead Capture Bot" : "Bot de captura de clientes"}</span>
                  </div>

                  <div className="snap-text-messages">
                    <div className="snap-text-msg snap-text-msg--incoming">
                      <p>{S.preview.smsMessages[0]}</p>
                    </div>
                    <div className="snap-text-msg snap-text-msg--outgoing">
                      <p>{S.preview.smsMessages[1]}</p>
                    </div>
                    <div className="snap-text-msg snap-text-msg--incoming">
                      <p>{S.preview.smsMessages[2]}</p>
                    </div>
                  </div>

                  <div className="snap-text-input">
                    <input
                      type="text"
                      placeholder={S.preview.smsPlaceholder}
                      readOnly
                    />
                  </div>
                </div>

                <div className="snap-text-footer">
                  <div className="snap-demo-footer">
                    <p className="snap-demo-number">(404) 992-5807</p>
                    <a
                      href="sms:+14049925807"
                      className="snap-btn snap-demo-action"
                    >
                      {S.preview.textButton}
                    </a>
                    <span className="snap-demo-pill">{S.preview.fastReply}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="snap-section">
        <div className="snap-container">
          <div className="snap-section-head">
            <p>{S.industries.eyebrow}</p>
            <h2>{S.industries.title}</h2>
            <span>{S.industries.sub}</span>
          </div>

          <div className="snap-use-grid">
            {translatedUseCases.map((item) => (
              <div
                key={item.title}
                className="snap-use-card snap-use-card--accented"
              >
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

      <section className="snap-section-alt snap-section-proof">
        <div className="snap-container">
          <div className="snap-proof-layout">
            <div className="snap-section-head">
              <p>{S.caseStudy.eyebrow}</p>
              <h2>{S.caseStudy.title}</h2>
              <span>{S.caseStudy.sub}</span>
            </div>

            <div className="snap-proof-box snap-proof-box--case-study">
              <p>{S.caseStudy.scenarioTitle}</p>
              <strong>{S.caseStudy.scenarioText}</strong>
            </div>

            <div className="snap-proof-metrics">
              {S.caseStudy.stats.map((item) => (
                <div key={item.label} className="snap-proof-metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="snap-section-alt">
        <div className="snap-container">
          <div className="snap-section-head">
            <p>{S.pricing.eyebrow}</p>
            <div
              style={{
                background: "#7c3aed",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 10,
                padding: "10px 18px",
                margin: "18px 0 8px 0",
                fontSize: 17,
                display: "inline-block",
              }}
            >
              {S.pricing.banner}
            </div>
            <h2>{S.pricing.title}</h2>
            <span>{S.pricing.sub}</span>
          </div>

          <div className="snap-price-grid">
            {translatedPricing.map((plan) => (
              <div
                key={plan.name}
                className={`snap-price-card ${plan.featured ? "featured" : ""}`}
              >
                {plan.featured && (
                  <div className="snap-price-pill">
                    {S.pricing.featuredPill}
                  </div>
                )}

                <h3>{plan.name}</h3>
                <div className="snap-price-row">
                  <strong>{plan.price}</strong>
                  <span className="snap-price-note">{plan.note}</span>
                </div>

                {plan.featured && (
                  <div
                    style={{
                      background: "#7c3aed",
                      color: "#fff",
                      fontWeight: 700,
                      borderRadius: 8,
                      padding: "7px 14px",
                      margin: "12px 0 8px 0",
                      fontSize: 15,
                      display: "inline-block",
                    }}
                  >
                    {S.pricing.roiBadge}
                  </div>
                )}

                <ul className="snap-feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="snap-check">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#book"
                  className={plan.featured ? "snap-btn" : "snap-btn-secondary"}
                  style={{ width: "100%", marginTop: 24 }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="snap-section">
        <div className="snap-container snap-book-grid">
          <div className="snap-form-card">
            <p className="snap-pill" style={{ display: "inline-flex" }}>
              {S.book.eyebrow}
            </p>
            <h2>{S.book.title}</h2>
            <p>{S.book.sub}</p>

            <form className="snap-form" onSubmit={handleFormSubmit}>
              <input
                className="snap-input snap-input--field"
                placeholder={S.book.fields.name}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                className="snap-input snap-input--field"
                placeholder={S.book.fields.business}
                name="business"
                value={formData.business}
                onChange={handleInputChange}
                required
              />
              <input
                className="snap-input snap-input--field"
                placeholder={S.book.fields.email}
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
                <option value="">{S.book.fields.industry}</option>
                <option value="contractors">{S.book.industries.contractors}</option>
                <option value="apartments">{S.book.industries.apartments}</option>
                <option value="airbnb">{S.book.industries.airbnb}</option>
                <option value="photography">{S.book.industries.photography}</option>
                <option value="plumbers">{S.book.industries.plumbers}</option>
                <option value="electricians">{S.book.industries.electricians}</option>
                <option value="painters">{S.book.industries.painters}</option>
              </select>
              <textarea
                className="snap-textarea snap-textarea--field"
                placeholder={S.book.fields.message}
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
                {submitting ? S.book.submitting : S.book.submit}
              </button>
              {submitted && (
                <div className="snap-form-success">{S.book.success}</div>
              )}
            </form>
          </div>

          <div className="snap-form-card">
            <p className="snap-pill" style={{ display: "inline-flex" }}>
              {S.whyItCloses.eyebrow}
            </p>
            <h2>{S.whyItCloses.title}</h2>
            <p>{S.whyItCloses.p1}</p>
            <p>{S.whyItCloses.p2}</p>

            <div className="snap-proof-box snap-proof-box--accented">
              <p>{S.whyItCloses.boxLabel}</p>
              <strong>{S.whyItCloses.boxText}</strong>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LucioFloatingWidget />
    </div>
  );
}
