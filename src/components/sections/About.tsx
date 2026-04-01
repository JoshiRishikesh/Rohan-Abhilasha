"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectConfig } from "@/config/project-data";

export default function About({ data, projectName }: { data: ProjectConfig["about"], projectName: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = data.content.split(" ");
  const previewText = words.slice(0, 35).join(" ");
  const remainingText = words.slice(35).join(" ");

  return (
    /* REMOVED: section-container
       REDUCED: py-8 md:py-20 for density
    */
    <section className="bg-slate-50 py-8 md:py-20 overflow-hidden border-t border-slate-200">
      <div className="px-4 md:px-6">
        
        {/* Grid Logic:
            Mobile: flex-col (Heading -> Image -> Text)
            Desktop: lg:grid (Heading/Text left, Image right)
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-start">
          
          {/* --- LEFT SIDE (Desktop) / TOP & BOTTOM (Mobile) --- */}
          <div className="lg:col-span-5 flex flex-col order-1 lg:sticky lg:top-32">
            
            {/* 1. HEADING (Appears First on Mobile and Desktop) */}
            <div className="order-1">
              <div className="flex items-center gap-3 mb-4 md:mb-8">
                <div className="h-px w-8 md:w-12 bg-primary/40" />
                <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.65rem] tracking-[0.3em] md:tracking-[0.5em]">
                  Legacy of {projectName}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1] tracking-tight mb-6 md:mb-10">
                {data.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "italic font-light text-primary block mt-1 md:mt-2" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h2>
            </div>

            {/* 3. DESCRIPTION (Appears Third on Mobile, Second on Desktop) */}
            <motion.div layout className="order-3 lg:order-2">
              <div className="text-slate-600 font-sans leading-relaxed text-sm md:text-lg mb-8 text-justify">
                <p className="inline">
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
                      className="block mt-4 pt-4 border-t border-slate-200"
                    >
                      {remainingText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Toggle Button */}
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-4 md:gap-6 cursor-pointer outline-none active:scale-95 transition-transform"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 group-hover:border-primary transition-colors" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <motion.div 
                      animate={{ backgroundColor: isExpanded ? "#c2a35d" : "#0f172a" }}
                      className="w-1.5 h-1.5 rounded-full" 
                     />
                  </div>
                </div>
                <span className="uppercase text-[0.6rem] md:text-[0.7rem] font-black tracking-[0.2em] text-slate-900 group-hover:text-primary transition-colors">
                  {isExpanded ? "Read Less" : "Read More"}
                </span>
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT SIDE (Desktop) / SECOND (Mobile) --- */}
          {/* 2. IMAGE (Appears Second on Mobile, Right side on Desktop) */}
          <div className="lg:col-span-7 w-full relative order-2 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square lg:aspect-[4/5] overflow-hidden shadow-2xl z-10 rounded-sm"
            >
              <Image 
                src={data.image} 
                alt="Architectural Vision" 
                fill 
                className="object-cover transition-transform duration-[5s] hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
            </motion.div>

            {/* Design Philosophy Badge - Simplified for density */}
            <motion.div 
              className="absolute -bottom-4 -right-2 md:-bottom-8 md:-left-8 bg-white p-4 md:p-8 border border-slate-100 shadow-xl max-w-[160px] md:max-w-[260px] z-20"
            >
              <p className="font-serif italic text-primary text-lg md:text-xl mb-1">Philosophy</p>
              <p className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest text-slate-400 font-bold">
                Balance. Symmetry. Form.
              </p>
            </motion.div>
            
            {/* Decorative Offset Frame (Desktop Only) */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-slate-200 z-0 hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  );
}