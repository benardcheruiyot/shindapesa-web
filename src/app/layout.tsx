import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../utils/registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShindaPesa - Spin & Win Real M-Pesa Cash",
  description: "Join ShindaPesa today, spin the wheel of fortune, and win instant cash prizes sent directly to your M-Pesa wallet.",
  keywords: ["M-Pesa", "Spin and Win", "Kenya Cash Games", "ShindaPesa", "Online Earnings"],
  authors: [{ name: "ShindaPesa Team" }],
  openGraph: {
    title: "ShindaPesa - Win Real Cash",
    description: "Instant M-Pesa payouts. Spin now!",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
