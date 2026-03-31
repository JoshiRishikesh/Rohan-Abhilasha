"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectConfig } from "@/config/project-data";

export default function About({ data, projectName }: { data: ProjectConfig["about"], projectName: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = data.content.split(" ");
  const previewText = words.slice(0, 35).join(" "); // Slightly shorter preview for mobile
  const remainingText = words.slice(35).join(" ");

  return (
    <section className="bg-slate-50 pt-12 md:pt-0 pb-16 md:pb-24 overflow-hidden">
      <div className="section-container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Editorial Content */}
          <motion.div 
            layout
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32 order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-px w-8 md:w-12 bg-primary/40" />
              <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.65rem] tracking-[0.3em] md:tracking-[0.5em]">
                Legacy of {projectName}
              </span>
            </div>

            <motion.h2 layout className="text-3xl md:text-6xl font-serif text-slate-900 leading-[1.1] tracking-tight mb-8 md:mb-10">
              {data.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "italic font-light text-primary block mt-1 md:mt-2" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.div layout className="text-slate-600 font-sans leading-relaxed text-base md:text-lg mb-8 text-justify">
              <p className="inline">
                {/* Drop cap hidden on very small screens to maintain justification flow, visible from md up */}
                <span className="md:first-letter:text-5xl md:first-letter:font-serif md:first-letter:text-slate-900 md:first-letter:mr-3 md:first-letter:float-left">
                  {previewText}
                </span>
                {!isExpanded && "..."}
              </p>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="block mt-4 pt-4 border-t border-slate-200 text-justify"
                  >
                    {remainingText}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Toggle Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-4 md:gap-6 cursor-pointer outline-none active:scale-95 transition-transform"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 group-hover:border-primary transition-colors" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <motion.div 
                    animate={{ 
                      scale: isExpanded ? 1.5 : 1,
                      backgroundColor: isExpanded ? "var(--primary)" : "#0f172a" 
                    }}
                    className="w-1.5 h-1.5 rounded-full" 
                   />
                </div>
              </div>
              <span className="uppercase text-[0.6rem] md:text-[0.7rem] font-black tracking-[0.2em] md:tracking-[0.3em] text-slate-900 group-hover:text-primary transition-colors">
                {isExpanded ? "Read Less" : "Read More"}
              </span>
            </button>
          </motion.div>

          {/* Right Side: Luxury Imagery */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden shadow-2xl z-10 rounded-sm"
            >
              <Image 
                src={data.image} 
                alt="Architectural Vision" 
                fill 
                className="object-cover transition-transform duration-[5s] hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </motion.div>

            {/* Decorative Offset Frame - Hidden on mobile for cleanliness */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full border border-slate-200 z-0 hidden md:block" />

            {/* Design Philosophy Badge - Scaled for mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -right-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-8 border border-slate-100 shadow-xl max-w-[180px] md:max-w-[260px] z-20"
            >
              <p className="font-serif italic text-primary text-lg md:text-xl mb-1 md:mb-2">Philosophy</p>
              <p className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest leading-relaxed text-slate-400 font-bold">
                Balance. Symmetry. Timeless form.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}