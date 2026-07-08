import React from "react";
import Image from "next/image";

interface BrowserFrameProps {
  src: string;
  alt: string;
}

export default function BrowserFrame({ src, alt }: BrowserFrameProps) {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--color-glass-border)] shadow-2xl flex flex-col group/browser">
      {/* Browser Chrome (Header) */}
      <div className="h-8 sm:h-10 w-full bg-[var(--color-glass-bg)] backdrop-blur-md border-b border-[var(--color-glass-border)] flex items-center px-4 gap-2 shrink-0 rounded-t-xl sm:rounded-t-2xl">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
        </div>
        {/* Optional: Add a fake address bar if desired */}
        {/* <div className="ml-4 h-5 sm:h-6 flex-grow max-w-sm rounded bg-[var(--color-glass-border)]" /> */}
      </div>

      {/* Browser Content */}
      <div className="relative w-full flex-grow overflow-hidden bg-[var(--color-sky-bottom)] rounded-b-xl sm:rounded-b-2xl">
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/browser:scale-[1.03]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>
        
        {/* Inner subtle shadow for depth */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
      </div>
    </div>
  );
}
