"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaServer, FaDatabase, FaBolt, FaCloud, FaGitAlt } from "react-icons/fa";
import { ToolboxCategory } from "@/lib/toolbox";
import TechnologyPill from "../ui/TechnologyPill";
import ProjectChip from "../ui/ProjectChip";
import { motionConfig } from "../motion/motionConfig";

interface ToolboxCardProps {
  category: ToolboxCategory;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: FaCode,
  laptop: FaLaptopCode,
  server: FaServer,
  database: FaDatabase,
  bolt: FaBolt,
  cloud: FaCloud,
  workflow: FaGitAlt,
};

export default function ToolboxCard({ category }: ToolboxCardProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const IconComponent = iconMap[category.icon] || FaCode;

  const isAllProjects = category.projects.length === 1 && category.projects[0] === "All Projects";
  const projectLabel = isAllProjects
    ? "Used in All Projects"
    : `Used in ${category.projects.length} Featured Project${category.projects.length > 1 ? "s" : ""}`;

  return (
    <motion.div
      variants={motionConfig.fadeUp}
      whileHover="hover"
      viewport={{ once: true }}
      className="flex flex-col justify-between h-full w-full bg-[var(--glass-card-bg)] dark:bg-[var(--glass-card-bg)] border border-[var(--glass-card-border)] rounded-[24px] p-6 select-none transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[color-mix(in_srgb,var(--color-hero-accent)_25%,var(--glass-card-border))]"
      style={{
        transformPerspective: 1000,
      }}
    >
      {/* Top Part: Icon, Index & Title */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-5">
          {/* Category Icon with premium container */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#1E1B18]/5 dark:bg-white/5 border border-slate-700/10 dark:border-white/10 transition-transform duration-300 group-hover:scale-110">
            <IconComponent className="w-5 h-5 text-[var(--color-hero-accent)] dark:text-[var(--color-hero-accent)]" />
          </div>

          {/* Small Monospace Engineering Number */}
          <span className="font-mono text-sm font-bold text-[var(--color-hero-accent)] dark:text-[var(--color-hero-accent)] tracking-wider opacity-85">
            {category.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-sans text-xl font-bold text-[var(--color-hero-heading)] dark:text-[var(--color-hero-heading)] mb-2 tracking-tight">
          {category.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
          {category.description}
        </p>

        {/* Technology Pills Wrapper */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {category.technologies.map((tech) => {
            const isPillHovered = hoveredTech === tech.name;
            const isHighlightFromProject =
              hoveredProject !== null && tech.projects.includes(hoveredProject);
            const isHighlighted = isPillHovered || isHighlightFromProject;

            const isDimmed =
              (hoveredTech !== null && !isPillHovered) ||
              (hoveredProject !== null && !isHighlightFromProject);

            return (
              <TechnologyPill
                key={tech.name}
                name={tech.name}
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Part: Used in Projects */}
      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            {projectLabel}
          </span>

          <div className="flex flex-wrap gap-2 items-center">
            {category.projects.map((project) => {
              const isChipHovered = hoveredProject === project;
              const isHighlightFromTech =
                hoveredTech !== null &&
                category.technologies.find((t) => t.name === hoveredTech)?.projects.includes(project);
              const isHighlighted = isChipHovered || !!isHighlightFromTech;

              const isDimmed =
                (hoveredProject !== null && !isChipHovered) ||
                (hoveredTech !== null && !isHighlightFromTech);

              return (
                <ProjectChip
                  key={project}
                  name={project}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
