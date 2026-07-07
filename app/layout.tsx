import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import LoaderProvider from "@/components/providers/LoaderProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sadhvik Baba Patibandla",
  description: "Portfolio of Sadhvik Baba - Full Stack Engineer & Software Engineer building scalable software, real-time systems, and intelligent applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden md:overflow-x-visible max-w-[100vw] md:max-w-none`}>
      <body className="font-sans antialiased w-full min-h-screen bg-white overflow-x-hidden md:overflow-x-visible max-w-[100vw] md:max-w-none">
        <LoaderProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}

