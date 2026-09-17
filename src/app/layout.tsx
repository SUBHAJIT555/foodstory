import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gilroy-sub",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-russolo-sub",
  display: "swap",
});

export const metadata: Metadata = {
  title: "foodstory",
  description: "Come find yourself. Gourmet grocery, gifting, and recipes from foodstory.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
