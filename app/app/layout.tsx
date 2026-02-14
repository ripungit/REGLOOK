import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Space_Mono } from "next/font/google";
import "./globals.css";
import SupportBubble from "@/components/global/support-bubble";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reglook - Flow Into Your Domain",
  description: "Find the perfect domain name and register it instantly. Reglook offers a smooth, secure domain registration and management experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
        <SupportBubble />
        {/* Toast notifications */}
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
