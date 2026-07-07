"use client";

import React from "react";
import { Project } from "./constants";
import BrowserFrame from "./BrowserFrame";
import TechPill from "./TechPill";
import MetricCard from "./MetricCard";
import ProjectButton from "./ProjectButton";
import { FaSync, FaVideo, FaEdit, FaServer, FaDatabase, FaBox, FaNetworkWired, FaBolt, FaShieldAlt, FaLayerGroup, FaDesktop, FaBrain, FaExclamationTriangle, FaDollarSign, FaCloud, FaChartBar, FaBell, FaRss, FaFire, FaUpload, FaSearch } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
}

const ICON_MAP: Record<string, React.ElementType> = {
  sync: FaSync,
  video: FaVideo,
  edit: FaEdit,
  server: FaServer,
  database: FaDatabase,
  box: FaBox,
  network: FaNetworkWired,
  zap: FaBolt,
  shield: FaShieldAlt,
  layers: FaLayerGroup,
  monitor: FaDesktop,
  brain: FaBrain,
  alert: FaExclamationTriangle,
  dollar: FaDollarSign,
  cloud: FaCloud,
  chart: FaChartBar,
  bell: FaBell,
  feed: FaRss,
  trending: FaFire,
  upload: FaUpload,
  search: FaSearch,
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="w-full md:w-auto md:flex-1 h-full flex flex-col justify-center shrink-0 px-4 sm:px-8 md:px-16 lg:px-24 py-12 md:py-4 lg:py-8">
      <div className="w-full max-w-[1600px] xl:w-[clamp(900px,88vw,1600px)] mx-auto bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-3xl p-6 sm:p-8 2xl:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl flex flex-col xl:flex-row gap-8 2xl:gap-12 transition-colors duration-500 hover:border-[var(--color-hero-accent)]/30 group max-h-full overflow-y-auto">
        
        {/* Left Side: Browser Mockup */}
        <div className="w-full xl:w-[55%] flex-shrink-0 flex flex-col gap-4">
          <div className="font-mono text-[var(--color-hero-accent)] font-bold tracking-widest text-sm lg:text-base opacity-90">
            {project.id}
          </div>
          <BrowserFrame src={project.imageSrc} alt={project.imageAlt} />
        </div>

        {/* Right Side: Content */}
        <div className="w-full xl:w-[45%] flex flex-col justify-center">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-hero-accent)] mb-1.5 2xl:mb-2">
            {project.category}
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-[var(--color-hero-heading)] font-sans tracking-tight mb-3 2xl:mb-4">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm 2xl:text-base text-[var(--color-hero-description)] leading-relaxed mb-5 2xl:mb-8 max-w-xl">
            {project.description}
          </p>

          {/* Engineering Highlights */}
          <div className="mb-5 2xl:mb-8">
            <h4 className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[var(--color-hero-subtitle)] mb-3 2xl:mb-4">
              Engineering Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-2 2xl:gap-x-4 2xl:gap-y-3">
              {project.engineeringHighlights.map((hl, i) => {
                const Icon = ICON_MAP[hl.icon] || FaBox;
                return (
                  <div key={i} className="flex items-center gap-2 2xl:gap-3 text-xs 2xl:text-sm text-[var(--color-hero-subtitle)] font-medium">
                    <div className="w-5 h-5 2xl:w-6 2xl:h-6 rounded bg-[var(--color-hero-accent)]/10 text-[var(--color-hero-accent)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--color-hero-accent)]/20">
                      <Icon className="w-2.5 h-2.5 2xl:w-3 2xl:h-3" />
                    </div>
                    <span className="truncate">{hl.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-5 2xl:mb-8">
            <h4 className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[var(--color-hero-subtitle)] mb-3 2xl:mb-4">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 2xl:gap-4 mb-6 2xl:mb-10">
            {project.metrics.map((m, i) => (
              <MetricCard key={i} value={m.value} label={m.label} />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.buttons.map((btn, i) => (
              <ProjectButton key={i} type={btn.type} label={btn.label} href={btn.href} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
