"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read theme initially from localStorage or system preferences
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    // Set up MutationObserver to detect theme switches on documentElement
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Define subtle float animations for depth layering
  const floatLeftBack: Variants = {
    animate: {
      x: [0, 8, -6, 0],
      y: [0, -10, 6, 0],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatRightBack: Variants = {
    animate: {
      x: [0, -8, 6, 0],
      y: [0, 10, -6, 0],
      transition: {
        duration: 27,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatLeftFront: Variants = {
    animate: {
      x: [0, 12, -8, 0],
      y: [0, -15, 10, 0],
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatRightFront: Variants = {
    animate: {
      x: [0, -12, 8, 0],
      y: [0, 15, -10, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Compute theme visibility states to prevent hydration mismatches and enforce active themes
  const isDarkActive = mounted && theme === "dark";

  return (
    <footer className="relative w-full overflow-hidden bg-[#F5F2EB] dark:bg-[#08111F] transition-colors duration-500 pt-20 pb-12 sm:pb-16 flex flex-col justify-between min-h-[600px] sm:min-h-[620px]">
      
      {/* Blending top overlay - transitions from the background color to transparent */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 z-[15] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--sky-main) 0%, transparent 100%)"
        }}
      />
      {/* 1. BACKGROUND LAYER (SKY) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Light Sky (Morning Sunrise) */}
        <div
          style={{
            opacity: isDarkActive ? 0 : 1,
            visibility: isDarkActive ? "hidden" : "visible",
            transition: "opacity 1000ms ease, visibility 1000ms ease",
          }}
          className="absolute inset-0 bg-gradient-to-b from-[#FFF3E3] via-[#FAF0E1] to-[#F5F2EB]"
        >
          <Image
            src="/light/sky2.png"
            alt="Morning Sky"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover opacity-95"
            priority
          />
          {/* Volumetric Morning Sunburst Glow */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,200,140,0.4)_0%,rgba(255,235,210,0.15)_40%,transparent_70%)] blur-3xl" />
          {/* Soft color-grading and bottom integration gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFE6C4]/20 via-[#FFF9F2]/10 to-[#F5F2EB]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,186,116,0.18)_0%,transparent_60%)] mix-blend-color-burn" />
        </div>

        {/* Dark Sky */}
        <div
          style={{
            opacity: isDarkActive ? 1 : 0,
            visibility: isDarkActive ? "visible" : "hidden",
            transition: "opacity 1000ms ease, visibility 1000ms ease",
          }}
          className="absolute inset-0 bg-[#08111F]"
        >
          <Image
            src="/dark/sky.png"
            alt="Starry Night Sky"
            fill
            sizes="100vw"
            quality={80}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08111F]/40 via-transparent to-[#08111F]" />
        </div>
      </div>

      {/* 2. CLOUDS LAYERS (MIDGROUND & FOREGROUND) */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none">
        
        {/* LIGHT MODE CLOUDS */}
        <div
          style={{
            opacity: isDarkActive ? 0 : 1,
            visibility: isDarkActive ? "hidden" : "visible",
            transition: "opacity 1000ms ease, visibility 1000ms ease",
          }}
          className="absolute inset-0"
        >
          {/* Back Left Cloud */}
          <motion.div
            variants={floatLeftBack}
            animate="animate"
            className="absolute left-[-20%] sm:left-[-15%] top-[-8%] w-[80%] sm:w-[60%] md:w-[35%] aspect-[16/10] opacity-40 blur-[3px]"
          >
            <Image
              src="/light/1.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Back Right Cloud */}
          <motion.div
            variants={floatRightBack}
            animate="animate"
            className="absolute right-[-20%] sm:right-[-15%] top-[-6%] w-[80%] sm:w-[60%] md:w-[35%] aspect-[16/10] opacity-40 blur-[3px]"
          >
            <Image
              src="/light/2.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Mid Left Cloud */}
          <motion.div
            variants={floatLeftBack}
            animate="animate"
            className="absolute left-[-25%] sm:left-[-20%] bottom-[15%] w-[75%] sm:w-[55%] md:w-[30%] aspect-[16/10] opacity-50 blur-[1px]"
          >
            <Image
              src="/light/3.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Mid Right Cloud */}
          <motion.div
            variants={floatRightBack}
            animate="animate"
            className="absolute right-[-25%] sm:right-[-20%] bottom-[18%] w-[75%] sm:w-[55%] md:w-[30%] aspect-[16/10] opacity-50 blur-[1px]"
          >
            <Image
              src="/light/4.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Front Left Cloud (Sweeping in) */}
          <motion.div
            variants={floatLeftFront}
            animate="animate"
            className="absolute left-[-15%] sm:left-[-12%] bottom-[-10%] w-[85%] sm:w-[65%] md:w-[42%] aspect-[16/10] opacity-95"
          >
            <Image
              src="/light/5.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Front Right Cloud (Sweeping in) */}
          <motion.div
            variants={floatRightFront}
            animate="animate"
            className="absolute right-[-15%] sm:right-[-12%] bottom-[-12%] w-[88%] sm:w-[68%] md:w-[45%] aspect-[16/10] opacity-95"
          >
            <Image
              src="/light/3.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* DARK MODE CLOUDS */}
        <div
          style={{
            opacity: isDarkActive ? 1 : 0,
            visibility: isDarkActive ? "visible" : "hidden",
            transition: "opacity 1000ms ease, visibility 1000ms ease",
          }}
          className="absolute inset-0"
        >
          {/* Back Left Cloud */}
          <motion.div
            variants={floatLeftBack}
            animate="animate"
            className="absolute left-[-20%] sm:left-[-15%] top-[-8%] w-[80%] sm:w-[60%] md:w-[35%] aspect-[16/10] opacity-45 blur-[3px]"
          >
            <Image
              src="/dark/1.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Back Right Cloud */}
          <motion.div
            variants={floatRightBack}
            animate="animate"
            className="absolute right-[-20%] sm:right-[-15%] top-[-6%] w-[80%] sm:w-[60%] md:w-[35%] aspect-[16/10] opacity-45 blur-[3px]"
          >
            <Image
              src="/dark/2.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Front Left Cloud */}
          <motion.div
            variants={floatLeftFront}
            animate="animate"
            className="absolute left-[-15%] sm:left-[-12%] bottom-[-10%] w-[85%] sm:w-[65%] md:w-[42%] aspect-[16/10] opacity-90"
          >
            <Image
              src="/dark/3.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>

          {/* Front Right Cloud */}
          <motion.div
            variants={floatRightFront}
            animate="animate"
            className="absolute right-[-15%] sm:right-[-12%] bottom-[-12%] w-[88%] sm:w-[68%] md:w-[45%] aspect-[16/10] opacity-90"
          >
            <Image
              src="/dark/4.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </motion.div>
        </div>

      </div>

      {/* 3. CORE CONTENT POCKET */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-6 flex flex-col items-center justify-center text-center my-auto pt-8">
        
        {/* Animated Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#E2E8F0] transition-colors duration-500 mb-6 leading-tight select-none"
        >
          Let's Build Something Great
        </motion.h2>

        {/* Subtitle / CTA text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-slate-600 dark:text-[#90A7C7] font-sans max-w-xl mx-auto leading-relaxed mb-10 transition-colors duration-500"
        >
          Whether you have a project in mind, an opportunity, or simply want to connect, I'd love to hear from you.
        </motion.p>

        {/* Premium Social Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-5"
        >
          {/* GitHub */}
          <a
            href="https://github.com/sadhvikbaba"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/10 hover:backdrop-blur-md hover:border-slate-500 hover:shadow-[0_0_15px_rgba(144,167,199,0.15)] group cursor-pointer"
            aria-label="GitHub Profile"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/sadhvikbaba"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/10 hover:backdrop-blur-md hover:border-slate-500 hover:shadow-[0_0_15px_rgba(144,167,199,0.15)] group cursor-pointer"
            aria-label="LinkedIn Profile"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:scale-105"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Mail */}
          <a
            href="mailto:contact@sadhvik.com"
            className="w-12 h-12 rounded-full border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/10 hover:backdrop-blur-md hover:border-slate-500 hover:shadow-[0_0_15px_rgba(144,167,199,0.15)] group cursor-pointer"
            aria-label="Email Contact"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:scale-105"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/sadhvikbaba"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-white/10 hover:backdrop-blur-md hover:border-slate-500 hover:shadow-[0_0_15px_rgba(144,167,199,0.15)] group cursor-pointer"
            aria-label="Twitter / X Profile"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:scale-105"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* 4. FOOTER DETAILS BAR */}
      <div className="relative z-30 max-w-6xl mx-auto w-full px-6 md:px-12 pt-10 sm:pt-16 flex flex-col gap-4 border-t border-slate-800/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Name & Title */}
          <div className="flex items-center gap-2.5 text-slate-300 text-sm font-medium transition-colors">
            <span className="text-gray-700 dark:text-slate-300">Sadhvik Baba</span>
            <span className="text-slate-700 dark:text-slate-700">|</span>
            <span className="text-[#71B7FF] font-semibold">Software Engineer</span>
          </div>

          {/* Back to top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer group"
          >
            <span>Back to top</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Copyright info */}
        <p className="text-center sm:text-left font-mono text-[11px] text-slate-500 leading-normal transition-colors">
          © {new Date().getFullYear()} · Built with Next.js.
        </p>
      </div>

    </footer>
  );
}
