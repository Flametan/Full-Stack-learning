import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full-Stack Lernpfad",
  description:
    "Interaktive Lernplattform für moderne Full-Stack-Webentwicklung – Schritt für Schritt vom Grundwissen zur ersten vollständigen Anwendung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen text-ink antialiased">{children}</body>
    </html>
  );
}
