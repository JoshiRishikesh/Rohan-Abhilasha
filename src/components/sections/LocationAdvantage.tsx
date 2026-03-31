"use client";

import { useState } from "react";
import { ProjectConfig } from "@/config/project-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LocationAdvantage({ data }: { data: ProjectConfig["locationAdvantages"] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-12 md:py-20 overflow-hidden border-t border-slate-100 relative z-30">
      <div className="section-container px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-bold uppercase text-[0.6rem] md:text-[0.65rem] tracking-[0.4em]">
              Prime Access
            </span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-serif text-slate-900 leading-tight tracking-tight">
            The Axis of <br />
            <span className="italic text-primary">Urban Luxury</span>
          </h2>
          
          <p className="mt-4 text-slate-500 text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.15em] md:tracking-[0.2em] max-w-sm font-medium leading-relaxed">
            Strategically centered within the city's most prestigious transit corridors.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Mobile: Horizontal Location Selector | Desktop: Vertical List */}
          <div className="lg:col-span-5 w-full order-2 lg:order-1">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide snap-x gap-2 lg:gap-1">
              {data.map((loc, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`group cursor-pointer flex-shrink-0 snap-center min-w-[140px] lg:min-w-full p-4 lg:py-6 border lg:border-0 lg:border-b border-slate-100 flex flex-col lg:flex-row lg:justify-between lg:items-center transition-all duration-500 ${
                    activeIndex === i 
                      ? "bg-slate-50 lg:bg-transparent lg:translate-x-2 border-primary/20" 
                      : "bg-transparent opacity-60 lg:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 lg:gap-6">
                    <span className={`font-serif italic text-sm lg:text-xl transition-colors duration-500 ${
                      activeIndex === i ? "text-primary" : "text-slate-300"
                    }`}>
                      0{i + 1}
                    </span>
                    <h3 className={`text-xs lg:text-2xl font-serif uppercase tracking-tight transition-all duration-500 ${
                      activeIndex === i ? "text-slate-900" : "text-slate-400"
                    }`}>
                      {loc.place}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-4 mt-2 lg:mt-0">
                    <div className={`hidden lg:block h-px bg-primary transition-all duration-700 ${
                      activeIndex === i ? "w-10" : "w-0"
                    }`} />
                    <span className={`font-serif italic text-sm lg:text-xl transition-colors ${
                      activeIndex === i ? "text-primary" : "text-slate-300"
                    }`}>
                      {loc.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Visual Portal - Forced 1:1 Aspect Ratio for your images */}
          <div className="lg:col-span-7 w-full sticky top-24 order-1 lg:order-2">
            <div className="relative aspect-square overflow-hidden bg-slate-50 shadow-xl lg:shadow-2xl border border-slate-100 rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={data[activeIndex].image} 
                    alt={data[activeIndex].place}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Floating Detail Label - Simplified for Mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-white/95 backdrop-blur-md border-t border-slate-100">
                    <div className="flex justify-between items-end lg:items-center">
                      <div>
                        <p className="text-primary text-[0.5rem] lg:text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-1">
                          Destination
                        </p>
                        <h4 className="text-lg lg:text-xl font-serif text-slate-900 uppercase tracking-tighter">
                          {data[activeIndex].place}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-[0.5rem] lg:text-[0.55rem] uppercase tracking-widest mb-1">Reach in</p>
                        <p className="text-primary font-serif italic text-xl lg:text-2xl leading-none">
                          {data[activeIndex].distance}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}