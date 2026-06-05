import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";

import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalFloatingButtons from "@/components/ConditionalFloatingButtons";

export const metadata: Metadata = {
  title: "VT STROY — Строительно-монтажные работы",
  description: "Строительно-монтажные работы в Алматы",
  verification: {
    google: "", 
  },
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
      </head>

      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50`}
      >
        <ConditionalNavbar />
        {children}
        <ConditionalFooter />
        <ConditionalFloatingButtons />
      </body>
    </html>
  );
}