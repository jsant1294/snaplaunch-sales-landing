"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar({
  navLinks,
  brandHref,
  ctaHref,
  ctaLabel,
  currentLang,
  langHrefMap,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lang = currentLang || searchParams.get("lang") || "en";

  const labels = {
    en: {
      howItWorks: "How it works",
      industries: "Industries",
      pricing: "Pricing",
      meetLucio: "Meet Lucio",
      bookDemo: "Book Demo",
    },
    es: {
      howItWorks: "Cómo funciona",
      industries: "Industrias",
      pricing: "Precios",
      meetLucio: "Conoce a Lucio",
      bookDemo: "Agendar Demo",
    },
  };

  const t = labels[lang] || labels.en;

  const resolvedNavLinks = navLinks || [
    { label: t.howItWorks, href: "#how-it-works", desktopClassName: "text-sm text-white/75 hover:text-white" },
    { label: t.industries, href: "#industries", desktopClassName: "text-sm text-white/75 hover:text-white" },
    { label: t.pricing, href: "#pricing", desktopClassName: "text-sm text-white/75 hover:text-white" },
    {
      label: t.meetLucio,
      href: "#lucio-in-action-section",
      desktopClassName: "text-sm font-semibold text-sky-300 hover:text-sky-200",
    },
  ];

  function switchLang(nextLang) {
    if (langHrefMap?.[nextLang]) {
      router.push(langHrefMap[nextLang]);
      setMenuOpen(false);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLang);
    router.push(`${pathname}?${params.toString()}`);
    setMenuOpen(false);
  }

  return (
    <header className="snap-nav">
      <div className="snap-container snap-nav-inner">
        <a href={brandHref || `/?lang=${lang}`} className="snap-brand">
          <div className="snap-brand-badge">
            <img src="/lucio-logo.png" alt="Lucio logo" />
          </div>

          <div className="snap-brand-copy">
            <strong>SnapLaunch AI</strong>
            <span>Lucio-powered sales system</span>
          </div>
        </a>

        <nav className="snap-links snap-links--desktop">
          {resolvedNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={link.desktopClassName}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="snap-nav-actions">
          <div className="snap-nav-lang-wrap">
            <button
              type="button"
              onClick={() => switchLang("en")}
              className={`snap-nav-lang-btn ${lang === "en" ? "is-active" : ""}`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => switchLang("es")}
              className={`snap-nav-lang-btn ${lang === "es" ? "is-active" : ""}`}
            >
              ES
            </button>
          </div>

          <a
            href={ctaHref || "#book"}
            className="snap-btn snap-nav-cta"
          >
            {ctaLabel || t.bookDemo}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="snap-hamburger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="snap-mobile-menu">
          {resolvedNavLinks.map((link) => (
            <a key={link.label} href={link.href} className="snap-mobile-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="snap-mobile-controls">
            <button
              type="button"
              onClick={() => switchLang("en")}
              className={`snap-nav-lang-btn ${lang === "en" ? "is-active" : ""}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLang("es")}
              className={`snap-nav-lang-btn ${lang === "es" ? "is-active" : ""}`}
            >
              ES
            </button>
          </div>
          <a href={ctaHref || "#book"} className="snap-btn snap-mobile-cta" onClick={() => setMenuOpen(false)}>
            {ctaLabel || t.bookDemo}
          </a>
        </div>
      )}
    </header>
  );
}
