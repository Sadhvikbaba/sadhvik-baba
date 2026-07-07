"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate } from "./certificates";
import TechnologyPill from "../../ui/TechnologyPill";
import Button from "../../ui/Button";

interface CertificateCardProps {
  certificate: Certificate;
}

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8+eTpfwAJSgOmb/jR0AAAAABJRU5ErkJggg==";

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <motion.div
      layoutId="certificate-card-container"
      className="w-full flex flex-col rounded-[28px] overflow-hidden bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] backdrop-blur-xl shadow-lg relative group"
    >
      {/* Top Preview Section (approx 55%) */}
      <div className="relative w-full aspect-[4/3] bg-[var(--color-sky-top)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 p-3 md:p-5 flex items-center justify-center"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md border border-[var(--color-glass-border)]">
              <Image
                src={certificate.previewImage}
                alt={certificate.title}
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                priority // Since this mounts when selected, prioritizing the visible image is key
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Details Section */}
      <div className="flex flex-col p-6 md:p-8 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`details-${certificate.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col h-full"
          >
            {/* Header / Metadata */}
            <div className="flex flex-col gap-1 mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--color-hero-heading)] leading-tight">
                {certificate.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-hero-description)] font-medium mt-1">
                <span className="text-[var(--color-hero-subtitle)]">{certificate.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-hero-description)] opacity-50" />
                <span>Issued {certificate.issuedDate}</span>
                {certificate.credentialId && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-hero-description)] opacity-50 hidden sm:block" />
                    <span className="font-mono text-xs opacity-70 hidden sm:block">ID: {certificate.credentialId}</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-[var(--color-hero-description)] leading-relaxed mb-6">
              {certificate.description}
            </p>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, index) => (
                  <motion.div
                    key={`${certificate.id}-${skill}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    <TechnologyPill name={skill} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions (Pushed to bottom) */}
            <div className="mt-auto pt-2 flex flex-wrap gap-3">
              {certificate.certificateUrl && (
                <Button href={certificate.certificateUrl} external variant="primary">
                  View Certificate
                </Button>
              )}
              {certificate.verifyUrl && (
                <Button href={certificate.verifyUrl} external variant="secondary">
                  Verify Credential
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
