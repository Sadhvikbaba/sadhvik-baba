"use client";

import { useState, useEffect } from "react";
import ParallaxScene from "./ParallaxScene";

const HERO_CONTENT = {
  name: "Sadhvik Baba Patibandla",
  title: "SOFTWARE ENGINEER",
  subtitle: "I build scalable web applications, real-time experiences, and modern digital products with a focus on performance and clean architecture."
};

export default function Hero() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Read theme on initial client-side mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Sync state with DOM documentElement and update localStorage
  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme, mounted]);

  // Monitor scroll level to transition the theme toggle and header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative w-full overflow-hidden transition-colors duration-500 bg-white dark:bg-slate-950">
      {/* Floating Theme Toggle Container */}
      <div
        className={`fixed z-50 flex flex-col items-center select-none pointer-events-auto transition-all duration-500 ease-in-out ${isScrolled
            ? "top-3 right-6 md:top-4 md:right-8 gap-0"
            : "top-6 right-6 md:top-12 md:right-16 gap-2"
          }`}
      >
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`relative rounded-full bg-toggle-bg hover:scale-[1.06] active:scale-95 transition-all duration-500 flex items-center justify-center cursor-pointer border-[0.1px] border-gray-400 dark:border-gray-700 group overflow-hidden ${isScrolled ? "w-10 h-10 md:w-12 md:h-12 animate-fade-in" : "w-16 h-16 md:w-20 md:h-20"
            }`}
          aria-label="Toggle theme"
        >
          <span className="relative grid h-full w-full place-items-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-active:scale-95">
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" aria-hidden="true" focusable="false">
              <defs>
                <radialGradient id="csun-R4" cx="50%" cy="42%" r="62%">
                  <stop offset="0%" stopColor="#fff7e8" />
                  <stop offset="44%" stopColor="#ffd27a" />
                  <stop offset="100%" stopColor="#f2a046" />
                </radialGradient>
                <radialGradient id="csunh-R4" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,206,128,0.55)" />
                  <stop offset="55%" stopColor="rgba(255,176,92,0.16)" />
                  <stop offset="100%" stopColor="rgba(255,176,92,0)" />
                </radialGradient>
                <radialGradient id="cmoon-R4" cx="38%" cy="36%" r="72%">
                  <stop offset="0%" stopColor="#fbf8f1" />
                  <stop offset="58%" stopColor="#e7e6df" />
                  <stop offset="100%" stopColor="#c6cad4" />
                </radialGradient>
                <radialGradient id="cmoonh-R4" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(205,216,242,0.5)" />
                  <stop offset="55%" stopColor="rgba(158,176,222,0.16)" />
                  <stop offset="100%" stopColor="rgba(158,176,222,0)" />
                </radialGradient>
                <mask id="moon-mask-R4">
                  <circle cx="50" cy="50" r="16" fill="white" />
                  <circle cx="60" cy="52" r="16" fill="black" />
                </mask>
              </defs>

              {/* Sun Glow */}
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="url(#csunh-R4)"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                  opacity: theme === "light" ? 1 : 0,
                  transform: theme === "light" ? "none" : "scale(0.7)"
                }}
              />

              {/* Moon Glow */}
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="url(#cmoonh-R4)"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                  opacity: theme === "dark" ? 1 : 0,
                  transform: theme === "dark" ? "none" : "scale(0.7)"
                }}
              />

              {/* Moon Stars */}
              <g
                style={{
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                  opacity: theme === "dark" ? 1 : 0
                }}
              >
                <circle className="np-star" cx="20" cy="28" r="1.5" fill="#fbf8f1" />
                <circle className="np-star" cx="82" cy="24" r="1.1" fill="#fbf8f1" style={{ animationDelay: "0.7s" }} />
                <circle className="np-star" cx="84" cy="66" r="1" fill="#fbf8f1" style={{ animationDelay: "1.2s" }} />
              </g>

              {/* Sun Rays & Body */}
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                  opacity: theme === "light" ? 1 : 0,
                  transform: theme === "light" ? "none" : "scale(0.5) rotate(45deg)"
                }}
              >
                <g className="hero-sun-rays" style={{ transformOrigin: "50px 50px", animation: "spin 15s linear infinite" }}>
                  <line x1="74" y1="50" x2="81" y2="50" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="70.78460969082653" y1="62" x2="76.84678751731761" y2="65.5" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="62" y1="70.78460969082653" x2="65.5" y2="76.8467875173176" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="50" y1="74" x2="50" y2="81" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="38.00000000000001" y1="70.78460969082653" x2="34.50000000000001" y2="76.84678751731761" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="29.215390309173472" y1="62" x2="23.1532124826824" y2="65.5" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="26" y1="50" x2="19" y2="50.00000000000001" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="29.21539030917347" y1="38.00000000000001" x2="23.153212482682395" y2="34.50000000000001" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="37.999999999999986" y1="29.215390309173475" x2="34.499999999999986" y2="23.153212482682406" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="49.99999999999999" y1="26" x2="49.99999999999999" y2="19" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="62" y1="29.215390309173472" x2="65.5" y2="23.153212482682402" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                  <line x1="70.78460969082653" y1="37.999999999999986" x2="76.8467875173176" y2="34.499999999999986" stroke="#ffce80" strokeWidth="2.4" strokeLinecap="round" opacity="0.92" />
                </g>
                <circle cx="50" cy="50" r="16" fill="url(#csun-R4)" />
              </g>

              {/* Moon Body */}
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)",
                  opacity: theme === "dark" ? 1 : 0,
                  transform: theme === "dark" ? "none" : "scale(0.5) rotate(45deg)"
                }}
              >
                {/* Crescent Moon Masked Group */}
                <g mask="url(#moon-mask-R4)">
                  <circle cx="50" cy="50" r="16" fill="url(#cmoon-R4)" />
                  <circle cx="44" cy="45" r="3.1" fill="rgba(150,160,186,0.34)" />
                  <circle cx="56.5" cy="52" r="2.1" fill="rgba(150,160,186,0.3)" />
                  <circle cx="48.5" cy="57.5" r="1.5" fill="rgba(150,160,186,0.28)" />
                </g>
              </g>
            </svg>
          </span>
        </button>

        {/* DAY / NIGHT stylized indicator text */}
        <div
          className={`text-[10px] md:text-xs font-bold tracking-[0.25em] md:tracking-[0.3em] select-none text-center uppercase flex items-center gap-1.5 transition-all duration-500 ease-in-out origin-top ${isScrolled
              ? "opacity-0 h-0 scale-75 overflow-hidden mt-0 pointer-events-none"
              : "opacity-100 h-4 mt-1 md:mt-2"
            }`}
        >
          <span className={`transition-all duration-300 ${theme === "light" ? "text-neutral-800 font-extrabold" : "text-neutral-400/60 font-semibold"}`}>DAY</span>
          <span className="text-neutral-400/40">/</span>
          <span className={`transition-all duration-300 ${theme === "dark" ? "text-white font-extrabold" : "text-neutral-400/60 font-semibold"}`}>NIGHT</span>
        </div>
      </div>

      {/* Parallax Scene */}
      <ParallaxScene content={HERO_CONTENT} activeTheme={theme} />
    </section>
  );
}
