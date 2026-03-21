import "./globals.css";

export const metadata = {
  title: "SnapLaunch AI — Client Acquisition System",
  description:
    "We build AI systems that capture and close leads for contractors.",

  openGraph: {
    title: "SnapLaunch AI",
    description:
      "AI systems that capture and close leads for contractors.",
    url: "https://snaplaunchnow.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
