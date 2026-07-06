import { Suspense } from "react";
import Hero from "@/components/hero/Hero";
import AboutMe from "@/components/about/AboutMe";
import LeetCodeSection from "@/components/sections/leetcode/LeetCodeSection";
import EngineeringToolbox from "@/components/sections/toolbox/EngineeringToolbox";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 selection:bg-slate-800 dark:selection:bg-slate-700 selection:text-white">
      {/* 1. Cinematic Parallax Hero Section (Occupies 180vh track, 100vh sticky viewport, holds Light/Dark Toggle) */}
      <Hero />
      
      {/* 2. About Me Section */}
      <AboutMe />

      {/* 3. LeetCode Journey Analytics Dashboard */}
      <Suspense fallback={
        <div className="w-full py-24 bg-[#F5F2EB] dark:bg-[#08111F] border-b border-[#E6E1D3]/50 dark:border-slate-900/40" />
      }>
        <LeetCodeSection />
      </Suspense>
      
      {/* 4. Engineering Toolbox */}
      <EngineeringToolbox />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}

