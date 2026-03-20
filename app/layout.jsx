import "./globals.css";

export const metadata = {
  title: "SnapLaunch AI",
  description: "Lucio-powered AI lead capture landing page"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
