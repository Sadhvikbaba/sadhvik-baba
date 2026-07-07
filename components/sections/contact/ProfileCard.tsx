"use client";

import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="flex flex-col justify-center gap-4 2xl:gap-6 h-full py-2 2xl:py-4">
      <div className="flex items-center gap-4 2xl:gap-5">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-sm border border-[var(--color-glass-border)] ring-2 ring-[var(--color-hero-accent)]/10 ring-offset-2 ring-offset-[var(--color-glass-bg)]">
          <Image
            src="/me.png"
            alt="Sadhvik Baba"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex flex-col items-start text-left">
          <h3 className="text-2xl font-extrabold text-[var(--color-hero-heading)] tracking-tight mb-1">Sadhvik Baba</h3>
          <p className="text-[var(--color-hero-description)] text-sm font-medium">Software Engineer</p>
          <p className="text-[var(--color-hero-description)] text-sm font-medium">Full Stack Developer</p>
        </div>
      </div>
        
      <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-green-500/5 text-green-700 dark:text-green-400 text-[13px] font-bold tracking-wide w-full max-w-[280px]">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
        </span>
        Available for Opportunities
      </div>
    </div>
  );
}
