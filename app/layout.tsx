import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Autoparts Logistics",
  description: "Move globally",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSans.variable} h-screen antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
