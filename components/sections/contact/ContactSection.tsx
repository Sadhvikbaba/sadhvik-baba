"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariant, slideLeftVariant, slideRightVariant, staggerContainerVariant } from "./motion";
import { SOCIAL_LINKS, INFO_ITEMS } from "./constants";
import ProfileCard from "./ProfileCard";
import InfoCard from "./InfoCard";
import SocialCard from "./SocialCard";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-16 2xl:py-32 bg-[var(--site-bg)] overflow-hidden transition-colors duration-500">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-hero-accent)]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Very subtle engineering grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-glass-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-glass-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none -z-10" />

      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Header Section */}
        <div className="mb-8 2xl:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16 w-full">
          {/* Left Column: Heading and Subtitle */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-[10px] uppercase tracking-[0.3em] font-extrabold mb-3 text-[var(--color-hero-accent)] flex items-center gap-2"
            >
              Contact
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-hero-accent)]" />
              <span className="w-6 h-[1px] bg-[var(--color-hero-accent)]/50" />
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--color-hero-heading)] mb-5 leading-[1.1] font-sans"
            >
              Let's Build Something <span className="font-serif italic font-medium text-[var(--color-hero-accent)] relative inline-block">
                Great
                <span className="absolute -top-2 -right-6 text-2xl animate-[pulse-star_3s_ease-in-out_infinite]">✦</span>
              </span>
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-[var(--color-hero-description)] transition-colors duration-500 font-sans max-w-xl text-left"
            >
              Whether it's an internship, a full-time opportunity, an ambitious project, or simply a conversation about technology—<span className="font-semibold text-[var(--color-hero-accent)]">I'd love to hear from you.</span>
            </motion.p>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="w-16 h-1.5 rounded-full mt-6 bg-[var(--color-hero-accent)]"
            />
          </div>

          {/* Right Column: Illustration Images */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="relative w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] lg:w-[50%] aspect-[16/9] md:aspect-[16/9] mx-auto md:mx-0 pointer-events-none flex-shrink-0"
          >
            <Image 
              src="/contact/light.png"
              alt="Contact Illustration"
              fill
              className="object-contain object-bottom lg:object-right-bottom dark:hidden"
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
              priority
            />
            <Image 
              src="/contact/dark.png"
              alt="Contact Illustration"
              fill
              className="object-contain object-bottom lg:object-right-bottom hidden dark:block"
              sizes="(max-width: 768px) 400px, (max-width: 1200px) 600px, 800px"
              priority
            />
          </motion.div>
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
    </section>
  );
}
