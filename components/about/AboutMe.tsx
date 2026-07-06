"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode, FaBriefcase, FaGraduationCap, FaTrophy, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiMongodb, SiTailwindcss } from "react-icons/si";

export default function AboutMe() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Read theme on initial client-side mount and listen for DOM switches
  useEffect(() => {
    setMounted(true);
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

  const isDarkActive = mounted && theme === "dark";

  const techStack = [
    {
      name: "React",
      icon: <FaReact className="w-5.5 h-5.5" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="w-5 h-5" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="w-5 h-5" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="w-5 h-5" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="w-5 h-5" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="w-5.5 h-5.5" />,
    },
  ];

  const stats = [
    {
      id: "leetcode",
      icon: <FaCode className="w-5 h-5" />,
      number: "500+",
      title: "Problems Solved",
      subtitle: "LeetCode",
    },
    {
      id: "projects",
      icon: <FaBriefcase className="w-5 h-5" />,
      number: "15+",
      title: "Projects Built",
      subtitle: "Full Stack",
    },
    {
      id: "learning",
      icon: <FaGraduationCap className="w-5 h-5" />,
      number: "3+",
      title: "Years Learning",
      subtitle: "Programming",
    },
    {
      id: "achievements",
      icon: <FaTrophy className="w-5 h-5" />,
      number: "5+",
      title: "Achievements",
      subtitle: "And Counting",
    },
  ];

  return (
    <section className={`relative z-30 w-full min-h-screen lg:h-screen flex items-center justify-center border-t border-b transition-colors duration-500 py-12 lg:py-0 ${isDarkActive ? "bg-[#08111F] border-slate-900/40 text-white" : "bg-[#F5F2EB] border-[#E6E1D3]/50 text-slate-800"}`}>
      
      {/* Container wrapper */}
      <div className="w-full px-6 md:px-16 lg:px-24 py-6 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10 lg:gap-y-4 items-center">
        
        {/* BLOCK 1: HEADER (Left top on desktop, first on mobile) */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end flex flex-col items-start text-left">
          
          {/* Label */}
          <span className={`text-xs uppercase tracking-[0.3em] font-extrabold mb-3.5 transition-colors duration-500 ${isDarkActive ? "text-[#71B7FF]" : "text-[#B57552]"}`}>
            About Me
          </span>

          {/* Heading */}
          <h2 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-4.5 leading-tight transition-colors duration-500 font-sans ${isDarkActive ? "text-white" : "text-[#1E293B]"}`}>
            Meet the <span className={`transition-colors duration-500 ${isDarkActive ? "text-[#71B7FF]" : "text-[#B57552]"}`}>Engineer</span>
          </h2>

          {/* Underline bar */}
          <div className={`w-16 h-1.5 rounded-full mb-2 lg:mb-4 transition-colors duration-500 ${isDarkActive ? "bg-[#71B7FF]" : "bg-[#B57552]"}`} />

        </div>

        {/* BLOCK 2: PHOTO (Center on desktop, second on mobile) */}
        <div className="col-span-12 lg:col-span-3 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:self-center flex justify-center items-center relative py-12 lg:py-0 select-none">
          
          {/* Animated Orbit Circles in the background */}
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] flex items-center justify-center z-0 pointer-events-none">
            
            {/* Outer Orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
              className={`absolute w-full h-full rounded-full border border-dashed ${isDarkActive ? "border-slate-800/40" : "border-[#E6E1D3]/40"}`}
            />

            {/* Inner Orbit */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className={`absolute w-[80%] h-[80%] rounded-full border ${isDarkActive ? "border-slate-800/60" : "border-[#E6E1D3]/50"}`}
            />

            {/* Orbit Dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className={`absolute w-[60%] h-[60%] rounded-full border ${isDarkActive ? "border-slate-800/20" : "border-[#E6E1D3]/20"}`}
            >
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full blur-[0.5px] ${isDarkActive ? "bg-[#71B7FF]/70" : "bg-[#B57552]/70"}`} />
            </motion.div>

            {/* Decorative Spark Star */}
            <div className={`absolute top-14 right-14 animate-pulse text-sm ${isDarkActive ? "text-[#71B7FF]/40" : "text-[#B57552]/40"}`}>✦</div>
            <div className={`absolute bottom-20 left-8 animate-pulse delay-700 text-sm ${isDarkActive ? "text-[#71B7FF]/30" : "text-[#B57552]/30"}`}>✦</div>
          </div>

          {/* Dotted Matrix Background Grid (Placed exactly behind the right side of the profile picture) */}
          <div className="absolute right-[-25px] top-[12%] w-28 h-28 grid grid-cols-6 gap-3 opacity-65 z-0 pointer-events-none">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.2 h-1.2 rounded-full transition-colors duration-500 ${isDarkActive ? "bg-[#71B7FF]/20" : "bg-[#B57552]/20"}`}
              />
            ))}
          </div>

          {/* Glowing Sunburst Shadow Behind Profile */}
          <div className={`absolute w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full blur-3xl z-0 pointer-events-none ${isDarkActive ? "bg-[#71B7FF]/5" : "bg-[#B57552]/5"}`} />

          {/* Profile Frame with Silhouette Placeholder */}
          <div className={`relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full z-10 overflow-hidden border shadow-inner flex items-center justify-center group ${isDarkActive ? "border-[#2A466F]/50 bg-gradient-to-tr from-[#0E1B2ECC]/40 to-[#2A466F]/10" : "border-[#E6E1D3] bg-gradient-to-tr from-[#E6E1D3]/10 to-[#F5F2EB]/40"}`}>
            
            {/* Animated shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            {/* Silhouette vector skeleton */}
            <svg
              className={`w-38 h-38 transition-colors duration-500 animate-pulse ${isDarkActive ? "text-[#71B7FF]/10" : "text-[#B57552]/20"}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            
            {/* Glowing ring borders */}
            <div className={`absolute inset-0.5 rounded-full border border-dashed pointer-events-none ${isDarkActive ? "border-[#71B7FF]/10" : "border-[#B57552]/20"}`} />
          </div>

        </div>

        {/* BLOCK 3: BIO & ACTIONS (Left bottom on desktop, third on mobile) */}
        <div className="col-span-12 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-start flex flex-col items-start text-left">
          
          {/* Bio Description */}
          <p className={`text-base md:text-lg leading-relaxed mb-5.5 transition-colors duration-500 font-sans ${isDarkActive ? "text-[#90A7C7]" : "text-[#475569]"}`}>
            I'm a Full Stack Engineer who loves building scalable web applications, real-time systems, and delightful user experiences.
          </p>
          <p className={`text-base md:text-lg leading-relaxed mb-7.5 transition-colors duration-500 font-sans ${isDarkActive ? "text-[#90A7C7]" : "text-[#475569]"}`}>
            Currently pursuing Computer Science with a specialization in AI & Machine Learning. I enjoy turning complex ideas into clean, efficient and impactful solutions.
          </p>

          {/* Side-by-Side CTA Button & Tech I Work With */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-8 lg:gap-12 w-full mt-3">
            
            {/* View My Work Button */}
            <a
              href="#works"
              className={`inline-flex items-center gap-2.5 py-4 px-8 rounded-2xl text-sm md:text-base font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer shadow-lg shrink-0 ${isDarkActive ? "bg-[#0B182C]/82 text-white border border-[#71B7FF]/20 hover:bg-[#1A355A] hover:border-[#71B7FF]/40 shadow-none" : "bg-[#1E1B18] text-white hover:bg-[#3D3330] shadow-black/10"}`}
            >
              <span>View My Work</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            {/* Tech Stack Badges */}
            <div className="flex flex-col items-start sm:items-start">
              <span className={`text-[10px] uppercase tracking-[0.25em] font-extrabold mb-3 transition-colors duration-500 ${isDarkActive ? "text-slate-500" : "text-[#AF937D]"}`}>
                Tech I Work With
              </span>
              <div className="flex items-center gap-2.5">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    title={tech.name}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 cursor-pointer group ${isDarkActive ? "border-slate-800 bg-[#0E1B2E]/30 text-slate-300 hover:border-[#71B7FF] hover:text-[#71B7FF]" : "border-[#E6E1D3] bg-[#FBF9F6]/50 text-[#4A3E3D] hover:border-[#B57552] hover:text-[#B57552]"}`}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-105">
                      {tech.icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* BLOCK 4: STATS CARDS (Right on desktop, fourth on mobile) */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2 lg:self-center grid grid-cols-2 gap-5 lg:pl-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`p-5 md:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col items-start select-none group cursor-pointer ${isDarkActive ? "border-slate-800/80 bg-[#0B1523]/40 hover:border-[#71B7FF]/40 hover:shadow-[#050B14]/30" : "border-[#E6E1D3] bg-[#FAF7F2] hover:border-[#B57552]/40 hover:shadow-[#B57552]/5"}`}
            >
              {/* Stat Icon Circle */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${isDarkActive ? "bg-[#71B7FF]/10 text-[#71B7FF] group-hover:bg-[#71B7FF] group-hover:text-slate-950" : "bg-[#B57552]/10 text-[#B57552] group-hover:bg-[#B57552] group-hover:text-white"}`}>
                {stat.icon}
              </div>

              {/* Big Stat Count */}
              <span className={`text-3xl md:text-4xl font-extrabold mb-1 tracking-tight font-sans transition-colors duration-500 ${isDarkActive ? "text-white" : "text-[#1E293B]"}`}>
                {stat.number}
              </span>

              {/* Title */}
              <span className={`text-[11px] md:text-xs font-bold mb-1.5 uppercase tracking-wider transition-colors duration-500 ${isDarkActive ? "text-slate-300" : "text-slate-700"}`}>
                {stat.title}
              </span>

              {/* Detail label */}
              <span className="text-[10px] md:text-[11px] text-slate-500 font-mono">
                {stat.subtitle}
              </span>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
