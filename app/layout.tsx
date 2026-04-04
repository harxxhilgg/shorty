import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shorty – Free URL Shortener",
  description: "Create short, manageable URLs in seconds. No login required.",
  keywords: ["url shortener", "short url", "qr code generator", "free", "next.js"],
  authors: [{ name: "Shorty Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#09090b",
  openGraph: {
    title: "Shorty – Free URL Shortener",
    description: "Create short, manageable URLs in seconds. No login required.",
    url: "https://shorty.vercel.app",
    siteName: "Shorty",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
