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

  const gridVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <section className="bg-white py-12 md:py-32 overflow-hidden">
      {/* Mobile: px-0 to make images touch screen edges 
          Desktop: md:px-6 and md:section-container for standard layout 
      */}
      <div className="md:section-container px-0 md:px-6">
        
        {/* Header - Added px-4 on mobile so text doesn't touch edges */}
        <div className="px-4 md:px-0 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.6rem] tracking-[0.4em]">
                Visual Narrative
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-slate-900 leading-tight">
              Curated <span className="italic text-primary font-light">Gallery</span>
            </h2>
          </div>

          {/* Filter System */}
          <div className="flex gap-6 md:gap-8 border-b border-slate-100 pb-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative pb-2 text-[0.65rem] md:text-[0.7rem] uppercase font-bold tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${
                  activeTab === cat.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 1:1 Grid Optimized for Mobile Full-Width */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {data[activeTab].map((src, index) => (
                <motion.div
                  key={src}
                  layout
                  custom={index}
                  variants={gridVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative aspect-square overflow-hidden bg-slate-50 group md:rounded-sm border-b md:border border-slate-100"
                >
                  <Image
                    src={src}
                    alt={`${activeTab} ${index}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 2}
                  />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-500" />
                  
                  {/* Indicator for Full-Width Mobile */}
                  <div className="absolute bottom-4 right-4 md:hidden">
                     <span className="text-[0.5rem] text-white/60 uppercase tracking-[0.2em] bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                       0{index + 1} / {data[activeTab].length}
                     </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="px-4 mt-10 md:mt-16 text-center text-[0.5rem] uppercase tracking-[0.3em] text-slate-400">
          Digital Renderings & Concept Photography
        </p>
      </div>
    </section>
  );
}