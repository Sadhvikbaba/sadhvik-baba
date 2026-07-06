"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the loader so it doesn't block SSR
const PortfolioLoader = dynamic(() => import("@/components/loader/PortfolioLoader"), {
  ssr: false,
});

interface LoaderProviderProps {
  children: React.ReactNode;
}

export default function LoaderProvider({ children }: LoaderProviderProps) {
  const [showLoader, setShowLoader] = useState(true);  // Always show on load
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";
    // Scroll to top so hero is always the first thing seen after loader
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleLoaderComplete = () => {
    setLoaderDone(true);
    // Restore scroll after exit animation finishes
    setTimeout(() => {
      document.body.style.overflow = "";
      setShowLoader(false);
    }, 700);
  };

  return (
    <>
      {showLoader && (
        <PortfolioLoader onComplete={handleLoaderComplete} />
      )}
      {/* Children fade in beneath the loader — always rendered for performance */}
      <div
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: loaderDone ? "opacity 0.6s ease 0.15s" : "none",
          pointerEvents: loaderDone ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
