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
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <section className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="section-container px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.6rem] tracking-[0.4em]">
                Curated Collection
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
              Visual <span className="italic text-primary font-light">Narrative</span>
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

        {/* 1:1 Optimized Grid */}
        <div className="min-h-125">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
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
                  className="relative aspect-square overflow-hidden bg-slate-50 group rounded-sm border border-slate-100"
                >
                  <Image
                    src={src}
                    alt={`${activeTab} ${index}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={index < 4}
                  />
                  
                  {/* Luxury Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500" />
                  
                  {/* Subtle index number for editorial feel */}
                  <div className="absolute top-4 left-4 overflow-hidden">
                    <span className="block text-white text-[0.6rem] font-serif italic translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      0{index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <p className="mt-12 text-center text-[0.5rem] uppercase tracking-[0.4em] text-slate-400">
          Digital Renderings & Concept Photography
        </p>
      </div>
    </section>
  );
}