import React from "react";
import Image from "next/image";

interface BrowserFrameProps {
  src: string;
  alt: string;
}

export default function BrowserFrame({ src, alt }: BrowserFrameProps) {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#1E1B18]/50 dark:bg-[#08111F]/80 border border-[#E6E1D3]/50 dark:border-slate-800/60 shadow-2xl flex flex-col group/browser">
      {/* Browser Chrome (Header) */}
      <div className="h-8 sm:h-10 w-full bg-[#F5F2EB]/80 dark:bg-[#0A1424]/90 backdrop-blur-md border-b border-[#E6E1D3]/50 dark:border-slate-800/60 flex items-center px-4 gap-2 shrink-0">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
        </div>
        {/* Optional: Add a fake address bar if desired */}
        {/* <div className="ml-4 h-5 sm:h-6 flex-grow max-w-sm rounded bg-[#E6E1D3]/30 dark:bg-slate-800/40" /> */}
      </div>

      {/* Browser Content */}
      <div className="relative w-full flex-grow overflow-hidden bg-slate-100 dark:bg-slate-900">
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/browser:scale-[1.03]">
          {/* Using a placeholder div for now if the image doesn't exist, but wiring it up to Next/Image */}
          {src.startsWith("/") ? (
            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 font-mono text-sm">
              <span className="opacity-50">[ Image: {src} ]</span>
            </div>
          ) : (
             <Image
               src={src}
               alt={alt}
               fill
               className="object-cover object-top"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
             />
          )}
        </div>
        
        {/* Inner subtle shadow for depth */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 pointer-events-none" />
      </div>
    </div>
  );
}
