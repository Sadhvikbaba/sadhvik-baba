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
  metadataBase: new URL("https://sadhvik-baba.vercel.app"),
  title: {
    default: "Sadhvik Baba Patibandla | Software Engineer Portfolio",
    template: "%s | Sadhvik Baba Patibandla",
  },
  description: "Portfolio of Sadhvik Baba Patibandla - Software Engineer & Full Stack Developer studying at SRM AP. Specializing in building scalable distributed systems, cloud architecture, real-time web applications, and clean interfaces.",
  keywords: [
    "Sadhvik Baba Patibandla",
    "Sadhvik Baba",
    "Sadhvik",
    "Patibandla",
    "SRM AP",
    "SRM University AP",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Sadhvik Baba Portfolio",
    "Sadhvik Baba SRM AP",
    "Sadhvik Baba Patibandla SRM AP",
    "Software Engineer SRM AP",
    "Distributed Systems",
    "Cloud Architecture"
  ],
  authors: [{ name: "Sadhvik Baba Patibandla", url: "https://sadhvik-baba.vercel.app" }],
  creator: "Sadhvik Baba Patibandla",
  publisher: "Sadhvik Baba Patibandla",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google : "Po7Ls--6WZuhoIZwS7aHdl15TnB1ERDowY-tBVNlbCg"
  },
  openGraph: {
    title: "Sadhvik Baba Patibandla | Software Engineer",
    description: "Explore the portfolio of Sadhvik Baba Patibandla - Full Stack Engineer at SRM AP building scalable web apps and high-performance digital systems.",
    url: "https://sadhvik-baba.vercel.app",
    siteName: "Sadhvik Baba Patibandla Portfolio",
    images: [
      {
        url: "/me.png",
        width: 800,
        height: 800,
        alt: "Sadhvik Baba Patibandla - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadhvik Baba Patibandla | Software Engineer",
    description: "Explore the portfolio of Sadhvik Baba Patibandla - Full Stack Engineer at SRM AP building scalable web apps.",
    images: ["/me.png"],
    creator: "@Sadhvikbaba",
  },
  alternates: {
    canonical: "https://sadhvik-baba.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} overflow-x-clip max-w-[100vw] md:max-w-none`}>
      <body suppressHydrationWarning className="font-sans antialiased w-full min-h-screen bg-white overflow-x-clip max-w-[100vw] md:max-w-none">
        <LoaderProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </LoaderProvider>
      </body>
    </html>
  );
}

