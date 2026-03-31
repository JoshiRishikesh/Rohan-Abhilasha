"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectConfig } from "@/config/project-data";

export default function About({ data, projectName }: { data: ProjectConfig["about"], projectName: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split content: first 40 words for the preview, the rest for the expansion
  const words = data.content.split(" ");
  const previewText = words.slice(0, 40).join(" ");
  const remainingText = words.slice(40).join(" ");

  return (
    <section className="bg-slate-50 pt-0 pb-20 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Editorial Content */}
          <motion.div 
            layout
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-primary font-bold uppercase text-[0.65rem] tracking-[0.5em]">
                Legacy of {projectName}
              </span>
            </div>

            <motion.h2 layout className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1] tracking-tight mb-10">
              {data.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "italic font-light text-primary block mt-2" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.div layout className="text-slate-600 font-sans leading-relaxed text-lg mb-8">
              <p className="inline">
                <span className="first-letter:text-5xl first-letter:font-serif first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left">
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
                    className="block mt-4 pt-4 border-t border-slate-200"
                  >
                    {remainingText}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Toggle Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-6 cursor-pointer outline-none active:scale-95 transition-transform"
            >
              <div className="relative">
                {/* Rotating Circle Border */}
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-12 h-12 rounded-full border border-slate-200 group-hover:border-primary transition-colors" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   {/* Center Dot */}
                   <motion.div 
                    animate={{ 
                      scale: isExpanded ? 1.5 : 1,
                      backgroundColor: isExpanded ? "var(--primary)" : "#0f172a" 
                    }}
                    className="w-1.5 h-1.5 rounded-full" 
                   />
                </div>
              </div>
              <span className="uppercase text-[0.7rem] font-black tracking-[0.3em] text-slate-900 group-hover:text-primary transition-colors">
                {isExpanded ? "Read Less" : "Read More"}
              </span>
            </button>
          </motion.div>

          {/* Right Side: Luxury Imagery */}
          <div className="lg:col-span-7 relative pt-12 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-4/5 overflow-hidden shadow-2xl z-10"
            >
              <Image 
                src={data.image} 
                alt="Architectural Vision" 
                fill 
                className="object-cover transition-transform duration-[5s] hover:scale-110" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/10 to-transparent" />
            </motion.div>

            {/* Decorative Offset Frame */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-slate-200 z-0 hidden lg:block" />

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -left-8 hidden xl:block bg-white p-8 border border-slate-100 shadow-xl max-w-65 z-20"
            >
              <p className="font-serif italic text-primary text-xl mb-2">Design Philosophy</p>
              <p className="text-[0.6rem] uppercase tracking-widest leading-loose text-slate-400 font-bold">
                Balance. Symmetry. The quiet confidence of timeless form.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}