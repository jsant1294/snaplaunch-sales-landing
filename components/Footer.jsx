export default function Footer({ links }) {
  const currentYear = new Date().getFullYear();
  const resolvedLinks = links || [
    { label: "How it works", href: "#how-it-works" },
    { label: "Industries", href: "#industries" },
    { label: "Pricing", href: "#pricing" },
    { label: "Book Demo", href: "#book" },
  ];

  return (
    <footer className="snap-footer-simple">
      <div className="snap-container">
        <div className="snap-footer-simple-content">
          <div>
            <strong>SnapLaunch AI • Lucio-powered sales systems</strong>
            <p>Built for mobile-first demos, outbound selling, and client conversion.</p>
          </div>
          <div className="snap-footer-links">
            {resolvedLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="snap-footer-simple-copy">
          <p>&copy; {currentYear} SnapLaunch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
