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
  title: "PGLoom – Rent. Room. Routine. Sorted.",
  authors: [{ name: "Sameer Gautam", url: "https://sameergautam.vercel.app" }],
  creator: "Sameer Gautam",
  description: "PGLoom is a smart PG management platform for owners and tenants to manage rent, rooms, mess menus, and laundry — all in one seamless dashboard.",
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
        {children}
      </body>
    </html>
  );
}
