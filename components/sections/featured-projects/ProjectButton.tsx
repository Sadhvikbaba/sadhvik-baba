"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaBookOpen, FaProjectDiagram } from "react-icons/fa";
import { ButtonType } from "./constants";

interface ProjectButtonProps {
  type: ButtonType;
  label: string;
  href: string;
}

const icons = {
  demo: FaExternalLinkAlt,
  github: FaGithub,
  casestudy: FaBookOpen,
  architecture: FaProjectDiagram,
};

export default function ProjectButton({ type, label, href }: ProjectButtonProps) {
  const Icon = icons[type];
  const isPrimary = type === "demo";

  return (
    <Link 
      href={href}
      className={`group relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        ${isPrimary 
          ? "bg-[var(--color-hero-button-bg)] text-[var(--color-hero-button-text)] shadow-[var(--color-hero-button-shadow)] hover:bg-[var(--color-hero-button-hover)] hover:shadow-lg" 
          : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200/50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
        }
      `}
    >
      <Icon className={`w-4 h-4 ${isPrimary ? "text-[var(--color-hero-button-text)]" : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"} transition-colors`} />
      <span>{label}</span>
      
      {/* Subtle hover glow for primary button */}
      {isPrimary && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-[var(--color-hero-button-bg)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-[2px]" />
      )}
    </Link>
  );
}
