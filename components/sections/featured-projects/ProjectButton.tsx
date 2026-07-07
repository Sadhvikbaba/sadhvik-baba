"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaBookOpen, FaProjectDiagram } from "react-icons/fa";
import { ButtonType } from "./constants";

interface ProjectButtonProps {
  type: ButtonType;
  label: string;
  href: string;
  target?: string;
}

const icons = {
  demo: FaExternalLinkAlt,
  github: FaGithub,
  casestudy: FaBookOpen,
  architecture: FaProjectDiagram,
};

export default function ProjectButton({ type, label, href , target = "_self"}: ProjectButtonProps) {
  const Icon = icons[type];
  const isPrimary = type === "demo";

  return (
    <Link 
      href={href}
      target={target}
      className={`group relative flex items-center justify-center gap-1.5 2xl:gap-2 px-3 py-2 2xl:px-5 2xl:py-2.5 rounded-xl font-medium text-[10px] 2xl:text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        ${isPrimary 
          ? "bg-[var(--color-hero-button-bg)] text-[var(--color-hero-button-text)] shadow-[var(--color-hero-button-shadow)] hover:bg-[var(--color-hero-button-hover)] hover:shadow-lg" 
          : "bg-[var(--color-glass-bg)] text-[var(--color-hero-subtitle)] border border-[var(--color-glass-border)] hover:text-[var(--color-hero-heading)]"
        }
      `}
    >
      <Icon className={`w-3 h-3 2xl:w-4 2xl:h-4 ${isPrimary ? "text-[var(--color-hero-button-text)]" : "text-[var(--color-hero-description)] group-hover:text-[var(--color-hero-heading)]"} transition-colors`} />
      <span>{label}</span>
      
      {/* Subtle hover glow for primary button */}
      {isPrimary && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-[var(--color-hero-button-bg)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-[2px]" />
      )}
    </Link>
  );
}
