import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollAnimations from "@/components/ui/ScrollAnimations";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TokenPilot — Manage Tokens. Transfer AI Chats. Stay in Control.",
  description:
    "TokenPilot counts tokens, scores your prompts, and lets you export any AI chat to continue on another platform — in seconds.",
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
