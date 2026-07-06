"use client";

import { FiMapPin, FiClock, FiBriefcase, FiTarget } from "react-icons/fi";

const iconMap = {
  MapPin: FiMapPin,
  Clock: FiClock,
  Briefcase: FiBriefcase,
  Target: FiTarget,
};

interface InfoCardProps {
  label: string;
  value: string;
  icon: keyof typeof iconMap;
  className?: string;
}

export default function InfoCard({ label, value, icon, className = "" }: InfoCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className={`flex items-center justify-center w-full h-full p-2 md:p-4 transition-transform hover:-translate-y-1 ${className}`}>
      <div className="flex items-start gap-4 w-fit">
        <div className="w-10 h-10 mt-0.5 rounded-full flex items-center justify-center text-[var(--color-hero-accent)] border border-[var(--color-hero-accent)]/30 shrink-0 shadow-[0_0_10px_rgba(var(--color-hero-accent-rgb),0.05)] bg-[var(--color-hero-accent)]/5">
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="flex flex-col text-left">
          <h4 className="text-sm font-bold text-[var(--color-hero-heading)] mb-1">{label}</h4>
          <p className="text-[11px] md:text-xs text-[var(--color-hero-description)] whitespace-pre-line leading-relaxed font-medium">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
