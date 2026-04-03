"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ProjectConfig } from "@/config/project-data";

type Category = "amenities" | "exterior"; // Removed layout from tabs

export default function Gallery({ data }: { data: ProjectConfig["gallery"] }) {
  const [activeTab, setActiveTab] = useState<Category>("amenities");

  const categories: { id: Category; label: string }[] = [
    { id: "amenities", label: "Amenities" },
    { id: "exterior", label: "Exteriors" },
  ];

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
    <section className="bg-background py-6 md:py-12 overflow-hidden relative border-t border-border/5">
      {/* Backdrop Branding */}
      <span className="absolute top-4 -right-10 text-[6rem] md:text-[12rem] font-serif italic opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        Gallery
      </span>

      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* 1. Filtered Masonry (Amenities/Exteriors) */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.55rem] tracking-[0.4em]">Visual Narrative</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-none tracking-tight">
              The Art of <span className="italic text-primary">Living</span>
            </h2>
          </motion.div>

          <div className="flex gap-6 md:gap-10 border-b border-border/10 pb-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative pb-2 text-[0.6rem] md:text-[0.65rem] uppercase font-bold tracking-[0.25em] transition-all duration-500 cursor-pointer ${
                  activeTab === cat.id ? "text-foreground" : "text-muted-foreground/30 hover:text-muted-foreground"
                }`}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div 
                    layoutId="galleryTabUnderline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-primary"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Display */}
        <div className="mb-20 md:mb-32">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              layout
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={revealVariants}
              className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4"
            >
              {data[activeTab].map((src, index) => (
                <motion.div
                  key={src}
                  layout
                  className={`relative overflow-hidden group border border-border/5 aspect-square 
                    ${index === 0 ? 'col-span-2 md:col-span-8 md:row-span-2 md:aspect-auto' : 'col-span-1 md:col-span-4'}`}
                >
                  <Image
                    src={src}
                    alt={`${activeTab} ${index}`}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 2. COMPULSORY UNIT LAYOUT SECTION */}
        <div className="border-t border-border/10 pt-16 md:pt-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="text-center mb-10"
          >
             <span className="text-primary font-bold uppercase text-[0.55rem] tracking-[0.4em] mb-4 block">Architectural Precision</span>
             <h3 className="text-2xl md:text-4xl font-serif text-foreground mb-4">Master <span className="italic">Unit Layout</span></h3>
             <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto">Explore the detailed spatial planning and meticulous design of our signature residences.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mx-auto max-w-2xl aspect-square overflow-hidden group border border-border/10 bg-white shadow-2xl"
          >
            {/* Using the layout key from your data specifically */}
            <Image
              src={data.layout[0]} 
              alt="Compulsory Unit Layout"
              fill
              className="object-contain p-4 md:p-12 transition-transform duration-[2s] group-hover:scale-105"
              sizes="(max-width: 1000px) 100vw, 800px"
              priority
            />
            
            {/* Luxury Label */}
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-md px-5 py-3 border border-border/50 shadow-sm">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary font-black">
                Official Floor Plan
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}