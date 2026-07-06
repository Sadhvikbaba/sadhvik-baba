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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden w-full min-h-screen bg-white">
        <LoaderProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}

