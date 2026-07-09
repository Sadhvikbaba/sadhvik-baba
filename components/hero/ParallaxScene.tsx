"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Cloud from "./Cloud";
import Button from "../ui/Button";

// Light Mode Clouds Config
const LIGHT_CLOUDS_CONFIG = [
  {
    id: 1,
    src: "1.png",
    position: "w-[65vw] md:w-[65vw] aspect-[16/10] top-[-4%] md:top-[-15%] left-[-30%] md:left-[-18%]",
    scrollX: ["0vw", "-15vw"] as [string, string],
    scrollY: ["0vh", "-18vh"] as [string, string],
    scrollScale: [0.8, 1.4] as [number, number],
    mouse: 4,
    float: 18,
    scale: 0.8,
    opacity: 0.6,
    blur: 2,
    priority: true,
    origin: "left center",
    zIndex: 5
  },
  {
    id: 2,
    src: "2.png",
    position: "w-[60vw] md:w-[60vw] aspect-[16/10] top-[-2%] md:top-[-10%] right-[-25%] md:right-[-15%]",
    scrollX: ["0vw", "15vw"] as [string, string],
    scrollY: ["0vh", "-18vh"] as [string, string],
    scrollScale: [0.8, 1.4] as [number, number],
    mouse: 5,
    float: 24,
    scale: 0.8,
    opacity: 0.6,
    blur: 2,
    priority: true,
    origin: "right center",
    zIndex: 10
  },
  {
    id: 3,
    src: "3.png",
    position: "w-[65vw] md:w-[55vw] aspect-[16/10] top-[52%] md:top-[20%] left-[-32%] md:left-[-12%]",
    scrollX: ["0vw", "-25vw"] as [string, string],
    scrollY: ["0vh", "-28vh"] as [string, string],
    scrollScale: [1.0, 1.8] as [number, number],
    mouse: 6,
    float: 31,
    scale: 1.0,
    opacity: 0.8,
    blur: 1,
    priority: false,
    origin: "left bottom",
    zIndex: 15
  },
  {
    id: 4,
    src: "4.png",
    position: "w-[70vw] md:w-[60vw] aspect-[16/10] top-[56%] md:top-[26%] right-[-34%] md:right-[-18%]",
    scrollX: ["0vw", "25vw"] as [string, string],
    scrollY: ["0vh", "-28vh"] as [string, string],
    scrollScale: [1.0, 1.8] as [number, number],
    mouse: 7,
    float: 22,
    scale: 1.0,
    opacity: 0.8,
    blur: 1,
    priority: false,
    origin: "right bottom",
    zIndex: 30
  },
  {
    id: 5,
    src: "5.png",
    // Foreground, positioned around 35% outside. Zooms and slides wide left.
    position: "w-[110vw] md:w-[70vw] aspect-[16/10] bottom-[-2%] md:bottom-[-18%] left-[-10%] md:left-[-10%]",
    scrollX: ["0vw", "-60vw"] as [string, string],
    scrollY: ["0vh", "-10vh"] as [string, string],
    scrollScale: [1.25, 2.8] as [number, number],
    mouse: 8,
    float: 28,
    scale: 1.25,
    opacity: 1.0,
    blur: 0,
    priority: false,
    origin: "left bottom",
    zIndex: 35
  },
  {
    id: 6,
    src: "6.png",
    // Cloud 6 overlaps Cloud 5, positioned around 50% outside. Zooms and slides wide right.
    position: "w-[115vw] md:w-[75vw] aspect-[16/10] bottom-[-4%] md:bottom-[-22%] right-[-10%] md:right-[-12%]",
    scrollX: ["0vw", "60vw"] as [string, string],
    scrollY: ["0vh", "-10vh"] as [string, string],
    scrollScale: [1.25, 2.8] as [number, number],
    mouse: 9,
    float: 35,
    scale: 1.25,
    opacity: 1.0,
    blur: 0,
    priority: false,
    origin: "right bottom",
    zIndex: 40
  }
];

// Dark Mode Clouds Config (Denser, deeper atmospheric composition)
const DARK_CLOUDS_CONFIG = [
  {
    id: 1,
    src: "1.png",
    // Configured to fit fully in the middle of the screen (vertically and horizontally centered)
    position: "w-[80vw] md:w-[50vw] aspect-[16/10] top-[25%] md:top-[20%] left-[10vw] md:left-[25vw]",
    scrollX: ["0vw", "0vw"] as [string, string],
    scrollY: ["0vh", "-8vh"] as [string, string],
    scrollScale: [0.8, 1.4] as [number, number],
    mouse: 3,
    float: 35,
    scale: 0.8,
    opacity: 0.55,
    blur: 2,
    priority: true,
    origin: "center top",
    zIndex: 5
  },
  {
    id: 2,
    src: "2.png",
    // Positioned upper-center slightly right, overlaps Cloud 1 (approx 55% outside)
    position: "w-[60vw] aspect-[16/10] top-[-2%] md:top-[-10%] right-[10%] md:right-[15%]",
    scrollX: ["0vw", "12vw"] as [string, string],
    scrollY: ["0vh", "-12vh"] as [string, string],
    scrollScale: [0.9, 1.5] as [number, number],
    mouse: 5,
    float: 30,
    scale: 0.9,
    opacity: 0.65,
    blur: 2,
    priority: true,
    origin: "right center",
    zIndex: 10
  },
  {
    id: 3,
    src: "3.png",
    // Configured as bottom-left foreground cloud (analogous to Light Mode Cloud 5)
    position: "w-[110vw] md:w-[70vw] aspect-[16/10] bottom-[-2%] md:bottom-[-18%] left-[-10%] md:left-[-10%]",
    scrollX: ["0vw", "-60vw"] as [string, string],
    scrollY: ["0vh", "-10vh"] as [string, string],
    scrollScale: [1.25, 2.8] as [number, number],
    mouse: 10,
    float: 22,
    scale: 1.25,
    opacity: 1.0,
    blur: 0,
    priority: false,
    origin: "left bottom",
    zIndex: 15
  },
  {
    id: 4,
    src: "4.png",
    // Configured as bottom-right foreground cloud (analogous to Light Mode Cloud 6)
    position: "w-[115vw] md:w-[75vw] aspect-[16/10] bottom-[-4%] md:bottom-[-22%] right-[-10%] md:right-[-12%]",
    scrollX: ["0vw", "60vw"] as [string, string],
    scrollY: ["0vh", "-10vh"] as [string, string],
    scrollScale: [1.25, 2.8] as [number, number],
    mouse: 12,
    float: 18,
    scale: 1.25,
    opacity: 1.0,
    blur: 0,
    priority: false,
    origin: "right bottom",
    zIndex: 40
  }
];

interface HeroContent {
  name: string;
  title: string;
  subtitle: string;
}

interface ParallaxSceneProps {
  content: HeroContent;
  activeTheme: "light" | "dark";
}

export default function ParallaxScene({ content, activeTheme }: ParallaxSceneProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Single Scroll Observer for the entire scene (light + dark)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"]
  });

  // Framer Motion values for mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothing to remove jitter
  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Update motion values directly to bypass React re-renders entirely
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform for Hero Text Scroll Effects
  // Text fades out during the first 40% of the scroll track and shifts up slightly
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "-25vh"]);

  return (
    <div ref={trackRef} className="relative w-full h-screen transition-colors duration-500 bg-[var(--site-bg)]">
      {/* Viewport container */}
      <div className="relative h-screen w-full overflow-hidden select-none">

        {/* Sky Backgrounds (z-0) - direct image rendering with opacity cross-fade */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Light Sky */}
          <motion.div
            animate={{ opacity: activeTheme === "light" ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/light/sky1.png"
              alt=""
              fill
              sizes="100vw"
              priority
              quality={80}
              className="object-cover"
            />
          </motion.div>
          {/* Dark Sky */}
          <motion.div
            animate={{ opacity: activeTheme === "dark" ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/dark/sky.png"
              alt=""
              fill
              sizes="100vw"
              priority
              quality={80}
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Transitional Golden Hour / Twilight Flare (z-11) */}
        <motion.div
          key={activeTheme} // Remounts and runs keyframe animation on theme toggle
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0] }} // Flare up to 55% and fade back to 0
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0 z-[11] pointer-events-none select-none"
          style={{
            background: activeTheme === "dark"
              ? "linear-gradient(to top, rgba(244, 63, 94, 0.22) 0%, rgba(249, 115, 22, 0.12) 50%, transparent 100%)" // Sunset: rose/orange glow
              : "linear-gradient(to top, rgba(234, 179, 8, 0.18) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 100%)" // Sunrise: golden/purple glow
          }}
        />

        {/* Light Theme Clouds */}
        {LIGHT_CLOUDS_CONFIG.map((cloud) => (
          <Cloud
            key={`light-${cloud.id}`}
            {...cloud}
            src={`/light/${cloud.src}`}
            scrollProgress={scrollYProgress}
            mouseXSpring={mouseXSpring}
            mouseYSpring={mouseYSpring}
            theme="light"
            activeTheme={activeTheme}
          />
        ))}

        {/* Dark Theme Clouds */}
        {DARK_CLOUDS_CONFIG.map((cloud) => (
          <Cloud
            key={`dark-${cloud.id}`}
            {...cloud}
            src={`/dark/${cloud.src}`}
            scrollProgress={scrollYProgress}
            mouseXSpring={mouseXSpring}
            mouseYSpring={mouseYSpring}
            theme="dark"
            activeTheme={activeTheme}
          />
        ))}

        {/* Left side overlays (z-12) to ensure text legibility with cross-fade */}
        {/* Light Overlay */}
        <motion.div
          animate={{ opacity: activeTheme === "light" ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none select-none z-[12]"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)"
          }}
        />
        {/* Dark Overlay */}
        <motion.div
          animate={{ opacity: activeTheme === "dark" ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none select-none z-[12]"
          style={{
            background: "linear-gradient(90deg, rgba(5,10,18,0.55) 0%, rgba(5,10,18,0.22) 40%, transparent 100%)"
          }}
        />

        {/* Hero Text Overlay (z-20, left aligned) */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            willChange: "transform, opacity",
          }}
          className="absolute inset-0 z-20 flex flex-col justify-center px-[8vw] md:px-[10vw] pointer-events-none select-none"
        >
          <div className="max-w-md sm:max-w-xl md:max-w-3xl flex flex-col items-start text-left">
            {/* Premium Headline - Sadhvik Baba Patibandla stacked with time-lapse gradient transition */}
            <h1 
              style={{
                backgroundImage: "linear-gradient(90deg, var(--hero-heading-gradient-start), var(--hero-heading-gradient-mid), var(--hero-heading-gradient-end))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-4xl sm:text-6xl md:text-[5rem] lg:text-[6.5rem] font-bold tracking-tight leading-[0.95] mb-5 font-sans select-none transition-all duration-500"
            >
              Sadhvik Baba
              <br />
              Patibandla
            </h1>

            {/* Elegant Subtitle */}
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 font-sans text-hero-accent transition-colors duration-500 select-none">
              {content.title}
            </span>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg font-sans tracking-wide leading-relaxed mb-8 max-w-sm sm:max-w-md md:max-w-xl text-hero-description opacity-90 transition-colors duration-500 select-none">
              {content.subtitle}
            </p>

            {/* Get in Touch Pill Button */}
            <Button
              href="mailto:psadhvik2006@gmail.com"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <span>Get in touch</span>
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
        </motion.div>

        {/* Subtle premium scroll indicator (z-20, bottom center) */}
        <motion.div 
          style={{ opacity: textOpacity }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none select-none"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-hero-accent transition-colors duration-500">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-6 bg-scroll-line transition-colors duration-500" />
        </motion.div>

        {/* Blending bottom overlay - transitions from transparent to the site background color */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 md:h-48 z-[45] pointer-events-none transition-colors duration-500"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, var(--site-bg) 100%)"
          }}
        />

      </div>

    </div>
  );
}
