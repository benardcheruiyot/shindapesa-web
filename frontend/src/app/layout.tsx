import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SHINDAPESA - Win Real M-Pesa Cash",
  description: "Join SHINDAPESA today, spin the wheel of fortune, and win instant cash prizes sent directly to your M-Pesa wallet.",
  keywords: ["M-Pesa", "SHINDAPESA", "Kenya Cash Games", "Spin and Win", "Online Earnings"],
  authors: [{ name: "SHINDAPESA Team" }],
  openGraph: {
    title: "SHINDAPESA - Win Real Cash",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
