"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope, FaHeart } from "react-icons/fa";
import { FiArrowUpRight, FiArrowUp } from "react-icons/fi";

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
      <div className="relative z-20 max-w-6xl mx-auto w-full px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between items-center md:items-stretch gap-12 md:gap-8 my-auto">
        
        {/* Left Column */}
        <div className="flex flex-row items-stretch gap-4 w-full md:w-[22%] justify-center md:justify-start md:self-start md:pt-6 text-left">
          <div className="flex items-start pt-1.5 shrink-0">
            <svg className="w-5 h-5 text-[var(--footer-accent)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
            </svg>
          </div>
          <div className="w-[1.5px] bg-[var(--footer-accent)]/30 shrink-0" />
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[var(--footer-accent)] mb-1 select-none">
              Thanks for stopping by!
            </p>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-[var(--footer-title)] opacity-90">
              Let's keep building<br className="hidden md:inline" /> the future together.
            </p>
          </div>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-[56%] select-none md:self-center">
          {/* Monogram Logo */}
          <div className="mb-4 relative">
            <div className="relative font-serif text-3xl font-semibold text-[var(--footer-title)] leading-none h-12 w-12 flex items-center justify-center select-none">
              <span className="absolute -translate-y-1.5 -translate-x-1.5">S</span>
              <span className="absolute translate-y-1.5 translate-x-1.5">B</span>
              <div className="absolute top-0 right-[-8px]">
                <svg className="w-2.5 h-2.5 text-[var(--footer-accent)] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-5.5xl font-medium tracking-tight text-[var(--footer-title)] leading-none mb-3 animate-fade-in">
            Sadhvik Baba
          </h2>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[var(--footer-accent)] mb-4 block leading-none">
            Software Engineer
          </span>
          <p className="text-xs sm:text-sm text-[var(--footer-text)] opacity-90 font-sans max-w-sm mx-auto leading-relaxed mb-8">
            Building scalable digital experiences<br className="hidden md:inline" /> from ideas to production.
          </p>

          {/* Social Row of Buttons */}
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-3 w-full">
            <a
              href="https://github.com/Sadhvikbaba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-transparent text-[var(--hero-heading-gradient-mid)] dark:text-[var(--footer-text)] border border-[var(--footer-title)]/15 dark:border-[var(--footer-text)]/30 hover:text-[var(--footer-accent)] hover:border-[var(--footer-accent)] hover:bg-[var(--footer-accent)]/5 transition-all duration-300 group"
            >
              <FaGithub className="text-sm shrink-0" />
              <span>GitHub</span>
              <FiArrowUpRight className="text-xs opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/sadhvik-baba-patibandla-563964278"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-transparent text-[var(--hero-heading-gradient-mid)] dark:text-[var(--footer-text)] border border-[var(--footer-title)]/15 dark:border-[var(--footer-text)]/30 hover:text-[var(--footer-accent)] hover:border-[var(--footer-accent)] hover:bg-[var(--footer-accent)]/5 transition-all duration-300 group"
            >
              <FaLinkedin className="text-sm shrink-0" />
              <span>LinkedIn</span>
              <FiArrowUpRight className="text-xs opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>

            <a
              href="https://drive.google.com/file/d/1aQM8IO26xb8tdmBR3IWiuUeY4fIat9XA/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-transparent text-[var(--hero-heading-gradient-mid)] dark:text-[var(--footer-text)] border border-[var(--footer-title)]/15 dark:border-[var(--footer-text)]/30 hover:text-[var(--footer-accent)] hover:border-[var(--footer-accent)] hover:bg-[var(--footer-accent)]/5 transition-all duration-300 group"
            >
              <FaFileAlt className="text-sm shrink-0" />
              <span>Resume</span>
              <FiArrowUpRight className="text-xs opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>

            <a
              href="mailto:contact@sadhvik.com"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-transparent text-[var(--hero-heading-gradient-mid)] dark:text-[var(--footer-text)] border border-[var(--footer-title)]/15 dark:border-[var(--footer-text)]/30 hover:text-[var(--footer-accent)] hover:border-[var(--footer-accent)] hover:bg-[var(--footer-accent)]/5 transition-all duration-300 group"
            >
              <FaEnvelope className="text-sm shrink-0" />
              <span>Email</span>
              <FiArrowUpRight className="text-xs opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center md:items-start gap-1 w-full md:w-[22%] text-center md:text-left md:self-end md:pb-6">
          <span className="font-serif text-5xl font-extrabold text-[var(--footer-accent)] opacity-60 leading-none select-none">
            “
          </span>
          <div className="flex flex-row items-stretch gap-4 justify-center md:justify-start">
            <div className="w-[1.5px] bg-[var(--footer-accent)]/30 shrink-0" />
            <div className="text-left flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-[var(--hero-subtitle)] opacity-90">
                Curious enough to learn.<br />Determined enough to build.
              </p>
            </div>
          </div>
          <div className="w-10 h-[2px] bg-[var(--footer-accent)]/60 mt-3 rounded-full self-center md:self-start" />
        </div>

      </div>

      {/* 4. FOOTER DETAILS BAR */}
      <div className="relative z-30 max-w-6xl mx-auto w-full px-6 pt-6 pb-2 flex flex-col gap-4 border-t border-[#EBE1D4]/45 dark:border-slate-800/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright & Crafted info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-xs text-[var(--footer-title)] font-medium">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--footer-title)]/75 dark:text-[var(--footer-text)]/75">
              <FaHeart className="text-[10px] text-[var(--footer-accent)] shrink-0 animate-pulse" />
              <span>© 2026 Sadhvik Baba</span>
            </div>
            
            <span className="hidden md:inline text-[var(--footer-title)]/30 dark:text-[var(--footer-text)]/30 font-light">|</span>
            
            <div className="hidden md:flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] tracking-wide text-[var(--footer-text)]/85 dark:text-[var(--footer-text)]/70">
              <span>Crafted with</span>
              <span className="text-[var(--footer-title)] dark:text-[var(--footer-text)] font-semibold opacity-95">Next.js</span>
              <span className="text-[var(--footer-accent)] font-bold">•</span>
              <span className="text-[var(--footer-title)] dark:text-[var(--footer-text)] font-semibold opacity-95">TypeScript</span>
              <span className="text-[var(--footer-accent)] font-bold">•</span>
              <span className="text-[var(--footer-title)] dark:text-[var(--footer-text)] font-semibold opacity-95">Tailwind CSS</span>
              <span className="text-[var(--footer-accent)] font-bold">•</span>
              <span className="text-[var(--footer-title)] dark:text-[var(--footer-text)] font-semibold opacity-95">Framer Motion</span>
              <span className="text-[var(--footer-accent)] font-bold">•</span>
              <span className="text-[var(--footer-title)] dark:text-[var(--footer-text)] font-semibold opacity-95">Redis</span>
              <span className="text-[var(--footer-accent)] font-bold">•</span>
              <span className="text-[var(--footer-title)] dark:text-[var(--footer-text)] font-semibold opacity-95">AWS</span>
            </div>
          </div>

          {/* Right: Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2.5 text-[var(--hero-heading-gradient-mid)] dark:text-[var(--footer-text)] hover:text-[var(--footer-accent)] dark:hover:text-[var(--footer-accent)] text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full border border-[var(--footer-title)]/15 dark:border-[var(--footer-text)]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[var(--footer-accent)]/40 group-hover:bg-[var(--footer-accent)]/5">
              <FiArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 text-[var(--hero-heading-gradient-mid)] dark:text-[var(--footer-text)] group-hover:text-[var(--footer-accent)] dark:group-hover:text-[var(--footer-accent)]" />
            </div>
            <span>Back to top</span>
          </button>
        </div>
      </div>

    </footer>
  );
}
