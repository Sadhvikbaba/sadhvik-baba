"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CERTIFICATES, CERTIFICATION_ILLUSTRATIONS } from "./certificates";
import CertificateSelector from "./CertificateSelector";
import CertificateCard from "./CertificateCard";
import { fadeIn, parallaxMountain } from "./motion";

export default function CredentialsSection() {
  const [selectedId, setSelectedId] = useState<string>(CERTIFICATES[0].id);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Observe class changes on html element for theme toggling
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkNow = document.documentElement.classList.contains("dark");
          setTheme(isDarkNow ? "dark" : "light");
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const selectedCertificate = useMemo(() => {
    return CERTIFICATES.find(c => c.id === selectedId) || CERTIFICATES[0];
  }, [selectedId]);

  return (
    <section id="certifications" className="relative w-full py-24 md:py-32 bg-[var(--color-site-bg)] border-b border-[#E6E1D3]/50 dark:border-slate-900/40 overflow-hidden transition-colors duration-500">
      {/* Background radial gradient subtle highlight */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[var(--color-hero-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16 md:mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="flex flex-col w-full lg:w-[55%] max-w-2xl relative z-10 items-start"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2">
              Certifications
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
              <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-hero-heading)] mb-5 leading-[1.1] font-sans">
              Credentials That <span className="font-serif italic font-medium text-[var(--color-hero-accent)]">Matter</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-hero-description)] transition-colors duration-500 font-sans max-w-xl">
              Industry-recognized certifications earned through continuous learning, hands-on practice, and technical excellence.
            </p>
            <div className="w-16 h-1.5 rounded-full mt-6 bg-[var(--color-hero-accent)]" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={parallaxMountain}
            className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] lg:w-[45%] aspect-[16/9] md:aspect-[16/9] mx-auto md:mx-0  pointer-events-none relative flex-shrink-0"
          >
            <Image 
              src={theme === "dark" ? CERTIFICATION_ILLUSTRATIONS.dark : CERTIFICATION_ILLUSTRATIONS.light}
              alt="Decorative Building"
              fill
              className="object-contain object-center md:object-right-bottom"
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
              priority
            />
          </motion.div>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Left: Selector (30%) */}
          <div className="w-full md:w-[35%] lg:w-[30%] md:sticky md:top-32 self-start z-20">
            <CertificateSelector 
              certificates={CERTIFICATES}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          {/* Right: Card (70%) */}
          <div className="w-full md:w-[65%] lg:w-[70%] z-10">
            <CertificateCard certificate={selectedCertificate} />
          </div>

        </div>
      </div>
    </section>
  );
}
