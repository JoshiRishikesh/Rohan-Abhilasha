"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { RiHotelLine } from "react-icons/ri";

export default function AmenitiesMobileOptimized({ data }: { data: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data || data.length === 0) return null;

  const currentCategory = data[activeTab];
  const items = currentCategory.items || [];

  // Theme-specific reveal variants
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
    <section className="bg-background pt-12 pb-20 overflow-hidden -mt-px">
      <div className="px-6">
        
        {/* --- 1. Editorial Header (Theme Corrected) --- */}
        <div className="relative mb-16">
          {/* Large Background Italic Text */}
          <span className="absolute -top-6 -left-4 text-7xl font-serif italic opacity-[0.04] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
            Lifestyle
          </span>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="relative z-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-bold uppercase text-[0.55rem] tracking-[0.4em]">
                The Curation
              </span>
            </div>
            <h2 className="text-4xl font-serif text-foreground leading-[1.1] tracking-tight">
              Refining the <br />
              <span className="italic text-primary pl-10 inline-block mt-1">Standard</span>
            </h2>
          </motion.div>
        </div>

        {/* --- 2. Minimal Category Tabs (Underline Style) --- */}
        <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide border-b border-border/40 mb-10">
          {data.map((cat: any, idx: number) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(idx)}
              className={`flex-shrink-0 pb-4 text-[0.6rem] uppercase tracking-[0.3em] font-bold transition-all relative cursor-pointer ${
                activeTab === idx ? "text-foreground" : "text-muted-foreground/50"
              }`}
            >
              {cat.category.split(' ')[0]}
              {activeTab === idx && (
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* --- 3. The Interactive Reel --- */}
        <div className="relative -mx-6">
          <div className="flex gap-5 overflow-x-auto px-6 pb-8 snap-x scrollbar-hide">
            <AnimatePresence mode="wait">
              {items.map((item: any, i: number) => {
                const isObject = typeof item === 'object' && item !== null;
                const title = isObject ? item.name : item;
                const imageSrc = isObject && item.image ? item.image : "/assets/hero-architecture.avif";

                return (
                  <motion.div
                    key={`${activeTab}-${title}`}
                    initial="hidden"
                    animate="visible"
                    variants={revealVariants}
                    transition={{ delay: i * 0.1 }}
                    className="flex-shrink-0 w-[290px] h-[420px] bg-slate-100 relative overflow-hidden snap-center group cursor-pointer"
                  >
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 brightness-[0.85]"
                      sizes="300px"
                    />
                    
                    {/* Gradient Overlay Matching Theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent opacity-90" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <h4 className="text-2xl font-serif text-white leading-tight tracking-wide group-hover:text-primary transition-colors duration-500">
                        {title}
                      </h4>

                      <div className="flex items-center gap-4 mt-5">
                        <div className="h-px w-6 bg-primary group-hover:w-12 transition-all duration-700" />
                        <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300" />
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-b border-r border-primary/60 group-hover:w-6 group-hover:h-6 transition-all duration-500" />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* --- "Discover More" Themed Card --- */}
            <div className="flex-shrink-0 w-[220px] h-[420px] border border-border/40 flex flex-col items-center justify-center gap-5 snap-center bg-slate-50/10 mr-6 group cursor-pointer">
               <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center group-hover:border-primary transition-colors">
                  <RiHotelLine className="text-primary" size={22} />
               </div>
               <div className="text-center px-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-foreground mb-1">View All</p>
                  <p className="text-[0.55rem] uppercase font-medium text-muted-foreground/60 tracking-widest leading-relaxed">
                    {items.length} Amenities
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* --- 4. Minimal Progress Indicator --- */}
        <div className="mt-2 flex justify-center">
            <div className="flex gap-2.5">
                {[...Array(Math.min(items.length, 5))].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-0.5 transition-all duration-700 ${
                        i === 0 ? "w-8 bg-primary" : "w-2 bg-border/40"
                      }`} 
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}