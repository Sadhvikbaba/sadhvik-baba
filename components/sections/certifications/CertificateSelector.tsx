"use client";

import React from "react";
import { Certificate } from "./certificates";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "./motion";
import { SiHackerrank, SiPostman } from "react-icons/si";
import { FaCertificate, FaAws } from "react-icons/fa";

interface CertificateSelectorProps {
  certificates: Certificate[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const getIcon = (id: string) => {
  if (id.includes("aws")) return <FaAws className="text-[1.2em]" />;
  if (id.includes("hackerrank")) return <SiHackerrank className="text-[1.2em]" />;
  if (id.includes("postman")) return <SiPostman className="text-[1.2em]" />;
  return <FaCertificate className="text-[1.2em]" />;
};

export default function CertificateSelector({ certificates, selectedId, onSelect }: CertificateSelectorProps) {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="flex flex-row flex-wrap md:flex-col gap-2 md:gap-3"
    >
      {certificates.map((cert) => {
        const isSelected = selectedId === cert.id;
        
        return (
          <motion.button
            key={cert.id}
            variants={fadeIn}
            onClick={() => onSelect(cert.id)}
            className={`
              relative text-left flex items-center gap-3 px-4 py-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 border select-none
              ${isSelected 
                ? "bg-[color-mix(in_srgb,var(--color-hero-accent)_10%,var(--color-glass-bg))] border-[var(--color-hero-accent)] shadow-[0_4px_20px_rgba(var(--color-hero-accent),0.1)] scale-[1.02]" 
                : "bg-[var(--color-glass-bg)] border-[var(--color-glass-border)] hover:border-[var(--color-hero-accent)]/50 hover:bg-[color-mix(in_srgb,var(--color-hero-accent)_4%,var(--color-glass-bg))] text-[var(--color-hero-subtitle)] hover:text-[var(--color-site-text)] scale-100"
              }
            `}
            style={{
              boxShadow: isSelected ? "0 4px 20px 0 rgba(var(--color-hero-accent), 0.15)" : undefined
            }}
          >
            {/* Icon */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isSelected ? "text-[var(--color-hero-accent)] bg-[var(--color-site-bg)]" : "text-[var(--color-hero-description)] bg-[var(--color-sky-top)]"} transition-colors duration-300`}>
              {getIcon(cert.id)}
            </div>

            {/* Desktop Details */}
            <div className="hidden md:flex flex-col flex-1">
              <span className={`text-sm font-semibold truncate transition-colors duration-300 ${isSelected ? "text-[var(--color-hero-heading)]" : ""}`}>
                {cert.title}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[var(--color-hero-description)]">{cert.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-hero-description)] opacity-50" />
                <span className="text-[10px] font-mono text-[var(--color-hero-description)] opacity-80">{cert.issuedDate}</span>
              </div>
            </div>

            {/* Mobile Title (Shortened) */}
            <span className={`md:hidden text-sm font-medium transition-colors duration-300 ${isSelected ? "text-[var(--color-hero-heading)]" : "text-[var(--color-hero-subtitle)]"}`}>
              {cert.shortName}
            </span>

            {/* Selected Indicator for Desktop */}
            {isSelected && (
              <motion.div 
                layoutId="active-indicator"
                className="hidden md:block absolute right-4 w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]"
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}
