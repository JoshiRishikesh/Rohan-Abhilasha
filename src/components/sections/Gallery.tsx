"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ProjectConfig } from "@/config/project-data";

type Category = keyof ProjectConfig["gallery"];

export default function Gallery({ data }: { data: ProjectConfig["gallery"] }) {
  const [activeTab, setActiveTab] = useState<Category>("amenities");

  const categories: { id: Category; label: string }[] = [
    { id: "amenities", label: "Amenities" },
    { id: "exterior", label: "Exteriors" },
    { id: "layout", label: "Unit Layouts" },
  ];

  const currentItems = data[activeTab];
  const isSingleImage = currentItems.length === 1;

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="bg-background py-20 md:py-32 overflow-hidden relative">
      {/* 1. Backdrop Branding Text */}
      <span className="absolute top-10 -right-20 text-[12rem] font-serif italic opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap overflow-hidden">
        Gallery
      </span>

      <div className="section-container px-4 md:px-6">
        
        {/* 2. Editorial Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.6rem] tracking-[0.5em]">
                Visual Narrative
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-serif text-foreground leading-[1.1] tracking-tight">
              The Art of <br />
              <span className="italic text-primary pl-12 md:pl-24 inline-block mt-1">Living</span>
            </h2>
          </motion.div>

          {/* Filter System */}
          <div className="flex gap-8 md:gap-12 border-b border-border/40 pb-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative pb-4 text-[0.65rem] md:text-[0.7rem] uppercase font-bold tracking-[0.3em] transition-all duration-500 whitespace-nowrap cursor-pointer ${
                  activeTab === cat.id ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
                }`}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div 
                    layoutId="galleryTabUnderline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Dynamic Grid / Single View Container */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {isSingleImage ? (
              /* --- SINGLE IMAGE "GRAND VIEW" --- */
              <motion.div
                key={`single-${currentItems[0]}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={revealVariants}
                className="relative mx-auto max-w-4xl aspect-square overflow-hidden group border border-border/10 bg-white shadow-2xl shadow-slate-200/50"
              >
                <Image
                  src={currentItems[0]}
                  alt="Unit Layout"
                  fill
                  className="object-contain p-4 md:p-12 transition-transform duration-[2s] ease-out group-hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 80vw"
                  priority
                />
                
                {/* Minimal Frame Overlays */}
                <div className="absolute inset-0 border-[1px] border-border/20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/40" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-primary/40" />

                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-background/80 backdrop-blur-md px-6 py-3 border border-border/50">
                    <span className="text-[0.55rem] uppercase tracking-[0.4em] text-primary font-bold">
                        Master Architectural Plan
                    </span>
                </div>
              </motion.div>
            ) : (
              /* --- ASYMMETRIC MASONRY GRID (for multiple images) --- */
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6"
              >
                {currentItems.map((src, index) => {
                  const isFeatured = index === 0;
                  const isTall = index === 2 || index === 5;
                  
                  return (
                    <motion.div
                      key={src}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={revealVariants}
                      transition={{ delay: index * 0.05 }}
                      className={`relative overflow-hidden group cursor-pointer border border-border/10
                        ${isFeatured ? 'col-span-2 md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto' : 'col-span-1 md:col-span-4'}
                        ${isTall ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'}
                      `}
                    >
                      <Image
                        src={src}
                        alt={`${activeTab} ${index}`}
                        fill
                        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 brightness-[0.9]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-white/10 transition-all duration-700 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-primary/40 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}