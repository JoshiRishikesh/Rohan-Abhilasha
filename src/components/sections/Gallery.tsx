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

  // FIXED: Explicitly typed as Variants to resolve the 'varients' / type error
  const gridVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <section className="bg-white py-12 md:py-32 overflow-hidden">
      <div className="section-container px-4 md:px-6">
        
        {/* Header & Filter System */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 md:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.6rem] tracking-[0.4em]">
                Visual Gallery
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-slate-900 leading-tight">
              A Glimpse of <br />
              <span className="italic text-primary">Excellence</span>
            </h2>
          </div>

          {/* Luxury Tab Switcher - Scrollable on mobile */}
          <div className="flex gap-6 md:gap-8 border-b border-slate-100 pb-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative pb-2 text-[0.6rem] md:text-[0.7rem] uppercase font-bold tracking-[0.2em] transition-colors duration-300 outline-none whitespace-nowrap ${
                  activeTab === cat.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {data[activeTab].map((src, index) => {
                // Editorial logic: large spans for specific items
                const isFeature = index % 3 === 0;
                
                return (
                  <motion.div
                    key={src}
                    layout
                    custom={index}
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`relative overflow-hidden bg-slate-100 group cursor-pointer rounded-sm
                      ${isFeature 
                        ? 'col-span-2 md:col-span-8 aspect-[16/10] md:h-[550px]' 
                        : 'col-span-1 md:col-span-4 aspect-square md:aspect-auto'
                      }
                    `}
                  >
                    <Image
                      src={src}
                      alt={`${activeTab} view ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500" />
                    
                    {/* Minimal Corner Detail */}
                    <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-6 h-6 md:w-10 md:h-10 border-r border-b border-white/40" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          className="mt-10 md:mt-16 text-center text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] text-slate-500"
        >
          *Images are for representational purposes only
        </motion.p>
      </div>
    </section>
  );
}