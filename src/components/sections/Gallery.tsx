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
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    /* REMOVED section-container and reduced py-20/32 to py-6/12 */
    <section className="bg-background py-6 md:py-12 overflow-hidden relative border-t border-border/5">
      {/* 1. Backdrop Branding Text - Scaled down for mobile */}
      <span className="absolute top-4 -right-10 text-[6rem] md:text-[12rem] font-serif italic opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap overflow-hidden">
        Gallery
      </span>

      <div className="px-4 md:px-6">
        
        {/* 2. Editorial Header - Tightened margins and font sizes */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.55rem] tracking-[0.4em]">
                Visual Narrative
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-none tracking-tight">
              The Art of <span className="italic text-primary">Living</span>
            </h2>
          </motion.div>

          {/* Filter System - Tightened gap and padding */}
          <div className="flex gap-6 md:gap-10 border-b border-border/10 pb-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative pb-2 text-[0.6rem] md:text-[0.65rem] uppercase font-bold tracking-[0.25em] transition-all duration-500 whitespace-nowrap cursor-pointer ${
                  activeTab === cat.id ? "text-foreground" : "text-muted-foreground/30 hover:text-muted-foreground"
                }`}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div 
                    layoutId="galleryTabUnderline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Dynamic Grid Container - Reduced min-height to prevent empty voids */}
        <div className="min-h-[300px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            {isSingleImage ? (
              <motion.div
                key={`single-${currentItems[0]}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={revealVariants}
                className="relative mx-auto max-w-3xl aspect-square md:aspect-[4/3] overflow-hidden group border border-border/10 bg-white shadow-xl"
              >
                <Image
                  src={currentItems[0]}
                  alt="Unit Layout"
                  fill
                  className="object-contain p-2 md:p-8 transition-transform duration-[2s] ease-out group-hover:scale-105"
                  sizes="(max-width: 1200px) 100vw, 80vw"
                  priority
                />
                
                <div className="absolute inset-0 border-[1px] border-border/10 pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md px-4 py-2 border border-border/50">
                    <span className="text-[0.5rem] uppercase tracking-[0.2em] text-primary font-bold">
                        Master Architectural Plan
                    </span>
                </div>
              </motion.div>
            ) : (
              /* MASONRY GRID - Reduced gaps for density */
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4"
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
                      transition={{ delay: index * 0.03 }}
                      className={`relative overflow-hidden group cursor-pointer border border-border/5
                        ${isFeatured ? 'col-span-2 md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto' : 'col-span-1 md:col-span-4'}
                        ${isTall ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'}
                      `}
                    >
                      <Image
                        src={src}
                        alt={`${activeTab} ${index}`}
                        fill
                        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {/* Tightened Hover Frame */}
                      <div className="absolute inset-0 border-[0px] group-hover:border-[6px] border-white/5 transition-all duration-700 pointer-events-none" />
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