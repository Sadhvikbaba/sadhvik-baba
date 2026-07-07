import { Suspense } from "react";
import Hero from "@/components/hero/Hero";
import AboutMe from "@/components/about/AboutMe";
import LeetCodeSection from "@/components/sections/leetcode/LeetCodeSection";
import EngineeringToolbox from "@/components/sections/toolbox/EngineeringToolbox";
import FeaturedProjects from "@/components/sections/featured-projects/FeaturedProjects";
import PageNavigation from "@/components/navigation/PageNavigation";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/sections/contact/ContactSection";
import ExperienceSection from "@/components/sections/experience/ExperienceSection";
import CredentialsSection from "@/components/sections/certifications/CredentialsSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 selection:bg-slate-800 dark:selection:bg-slate-700 selection:text-white">
      <PageNavigation />
      
      {/* 1. Cinematic Parallax Hero Section (Occupies 180vh track, 100vh sticky viewport, holds Light/Dark Toggle) */}
      <Hero />
      
      {/* 2. About Me Section */}
      <AboutMe />

      {/* 3. LeetCode Journey Analytics Dashboard */}
      <section id="leetcode">
        <Suspense fallback={
          <div className="w-full py-24 bg-[#F5F2EB] dark:bg-[#08111F] border-b border-[#E6E1D3]/50 dark:border-slate-900/40" />
        }>
          <LeetCodeSection />
        </Suspense>
      </section>
      
      {/* 4. Engineering Toolbox */}
      <EngineeringToolbox />

      {/* 5. Featured Projects */}
      <FeaturedProjects />

      {/* Placeholder sections for the missing ones to make navigation work for now */}
      {/* 6. Engineering in Practice (Experience Timeline) */}
      <ExperienceSection />

      {/* 7. Credentials That Matter (Certifications) */}
      <CredentialsSection />

      {/* 6. Contact Section (Final CTA) */}
      <section id="contact">
        <Suspense fallback={
          <div className="w-full py-24 bg-[#F5F2EB] dark:bg-[#08111F] border-b border-[#E6E1D3]/50 dark:border-slate-900/40" />
        }>
          <ContactSection />
        </Suspense>
      </section>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}

