import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollAnimations from "@/components/ui/ScrollAnimations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Live token counter, prompt analysis, and one-click chat transfer across ChatGPT, Claude, Gemini and more.";

export const metadata: Metadata = {
  title: "TokenPilot — Manage Tokens. Transfer AI Chats. Stay in Control.",
  description: SITE_DESCRIPTION,
  icons: { icon: "/icon48_1.png" },
  openGraph: {
    title: "TokenPilot — One-click AI chat transfer",
    description: SITE_DESCRIPTION,
    type: "website",
    images: ["/screenshots/v3-5-send-to-ai.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenPilot — One-click AI chat transfer",
    description: SITE_DESCRIPTION,
    images: ["/screenshots/v3-5-send-to-ai.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <CustomCursor />
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}
