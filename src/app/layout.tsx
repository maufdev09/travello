import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LogoutSuccessToast from "@/components/shared/LogoutSuccessToast";
import LoginSuccessToast from "@/components/shared/LoginSuccessToast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://travello-ashy.vercel.app"
  ),
  title: "Travello",
  description: "Your personal travel companion",
  icons: {
    icon: [{ url: "/travello-logo.svg", type: "image/svg+xml" }],
    shortcut: "/travello-logo.svg",
    apple: "/travello-logo.svg",
  },
  openGraph: {
    title: "Travello",
    description: "Your personal travel companion",
    images: ["/travello-logo.svg"],
  },
  twitter: {
    card: "summary",
    title: "Travello",
    description: "Your personal travel companion",
    images: ["/travello-logo.svg"],
  },
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
        <Toaster position="top-right"  richColors/>
        <Suspense fallback={null}>
          <LoginSuccessToast/>
        </Suspense>
        <Suspense fallback={null}>
          <LogoutSuccessToast/>
        </Suspense>

      </body>
    </html>
  );
}
