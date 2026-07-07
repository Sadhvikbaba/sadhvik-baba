"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, slideLeftVariant, slideRightVariant, staggerContainerVariant } from "./motion";
import { SOCIAL_LINKS, INFO_ITEMS } from "./constants";
import ProfileCard from "./ProfileCard";
import InfoCard from "./InfoCard";
import SocialCard from "./SocialCard";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <div className="relative w-full py-16 2xl:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[var(--color-sky-main)] -z-10 transition-colors duration-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-hero-accent)]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Very subtle engineering grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-glass-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-glass-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none -z-10" />

      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="mb-6 2xl:mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex items-center gap-3 mb-4 text-[var(--color-hero-accent)] font-mono text-xs uppercase tracking-widest font-semibold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)] shadow-[0_0_8px_var(--color-hero-accent)]" />
            GET IN TOUCH
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold text-[var(--color-hero-heading)] mb-3 2xl:mb-6 tracking-tight"
          >
            Let's Build Something <span className="text-[var(--color-hero-accent)] relative inline-block">
              Great
              <span className="absolute -top-2 -right-6 text-2xl animate-[pulse-star_3s_ease-in-out_infinite]">✦</span>
            </span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-base md:text-lg text-[var(--color-hero-description)] max-w-2xl leading-relaxed"
          >
            Whether it's an internship, a full-time opportunity, an ambitious project, or simply a conversation about technology—<span className="font-semibold text-[var(--color-hero-accent)]">I'd love to hear from you.</span>
          </motion.p>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col xl:flex-row gap-4 2xl:gap-6 items-stretch">

          {/* Left Column (Profile/Info + Social) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideLeftVariant}
            className="w-full xl:w-[55%] flex flex-col gap-4 2xl:gap-6"
          >
            {/* Big Top Card: Profile & Info */}
            <div className="flex-[2] p-4 2xl:p-6 rounded-[2rem] bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] shadow-xl flex flex-col md:flex-row items-stretch gap-0 relative overflow-hidden">
              
              {/* Left Side: Profile */}
              <div className="w-full md:w-[42%] flex-shrink-0 flex flex-col justify-center md:pr-6">
                <ProfileCard />
              </div>
              
              {/* Vertical/Horizontal Divider between Profile and Info */}
              <div className="hidden md:block w-[1px] bg-[var(--color-glass-border)] self-stretch my-2" />
              <div className="md:hidden h-[1px] w-full bg-[var(--color-glass-border)] my-6" />
              
              {/* Right Side: Info Grid */}
              <div className="w-full md:w-[58%] md:pl-6 flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Decorative Cross Lines (Desktop) */}
                  <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--color-glass-border)]" />
                  <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--color-glass-border)]" />
                  
                  {/* Decorative Center Diamond */}
                  <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[var(--color-glass-bg)] border border-[var(--color-hero-accent)]/40 items-center justify-center z-10">
                    <div className="w-1 h-1 bg-[var(--color-hero-accent)]/60 rounded-full" />
                  </div>
                  
                  {/* Grid of Black Boxes */}
                  <motion.div 
                    variants={staggerContainerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-y-6 2xl:gap-y-10 gap-x-6 2xl:gap-x-10 relative z-20 py-2"
                  >
                    <InfoCard label={INFO_ITEMS[0].label} value={INFO_ITEMS[0].value} icon={INFO_ITEMS[0].icon as any} />
                    <InfoCard label={INFO_ITEMS[1].label} value={INFO_ITEMS[1].value} icon={INFO_ITEMS[1].icon as any} />
                    <InfoCard label={INFO_ITEMS[2].label} value={INFO_ITEMS[2].value} icon={INFO_ITEMS[2].icon as any} />
                    <InfoCard label={INFO_ITEMS[3].label} value={INFO_ITEMS[3].value} icon={INFO_ITEMS[3].icon as any} />
                  </motion.div>

                </div>
              </div>
            </div>

            {/* Social Cards Row */}
            <motion.div
              variants={staggerContainerVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-4"
            >
              {SOCIAL_LINKS.map((link) => (
                <SocialCard key={link.id} {...link} isFeatured={link.id === "resume"} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideRightVariant}
            className="w-full xl:w-[45%] flex"
          >
            <div className="w-full h-full">
              <ContactForm />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
