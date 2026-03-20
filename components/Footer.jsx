export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="snap-footer-simple">
      <div className="snap-container">
        <div className="snap-footer-simple-content">
          <div>
            <strong>SnapLaunch AI • Lucio-powered sales systems</strong>
            <p>Built for mobile-first demos, outbound selling, and client conversion.</p>
          </div>
          <div className="snap-footer-links">
            <a href="#how-it-works">How it works</a>
            <a href="#industries">Industries</a>
            <a href="#pricing">Pricing</a>
            <a href="#book">Book Demo</a>
          </div>
        </div>
        <div className="snap-footer-simple-copy">
          <p>&copy; {currentYear} SnapLaunch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
