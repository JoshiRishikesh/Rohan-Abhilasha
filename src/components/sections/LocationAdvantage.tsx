"use client";

import { useState } from "react";
import { ProjectConfig } from "@/config/project-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LocationAdvantage({ data }: { data: ProjectConfig["locationAdvantages"] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    /* Tightened Py */
    <section className="bg-white py-6 md:py-12 overflow-hidden border-t border-slate-100 relative z-30">
      <div className="px-4 md:px-6">
        
        {/* Header: Tightened mb-10 to mb-6 */}
        <div className="mb-6 md:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6 bg-primary" />
            <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.6rem] tracking-[0.4em]">
              Prime Access
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight tracking-tight">
            The Axis of <br />
            <span className="italic text-primary">Urban Luxury</span>
          </h2>
          
          <p className="mt-2 text-slate-500 text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.15em] max-w-sm font-medium leading-relaxed">
            Strategically centered within the city's prestigious transit corridors.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Visual Portal: Image - Order-1 (Top) on mobile */}
          <div className="lg:col-span-7 w-full sticky top-24 order-1 lg:order-2">
            {/* Aspect Square (1:1) restored for ALL views */}
            <div className="relative aspect-square overflow-hidden bg-slate-50 shadow-lg border border-slate-100 rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
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
                  
                  {/* Floating Detail Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-6 bg-white/95 backdrop-blur-md border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-primary text-[0.5rem] font-bold uppercase tracking-[0.2em]">
                          Destination
                        </p>
                        <h4 className="text-base lg:text-xl font-serif text-slate-900 uppercase tracking-tighter">
                          {data[activeIndex].place}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-[0.45rem] uppercase tracking-widest">Reach in</p>
                        <p className="text-primary font-serif italic text-lg lg:text-2xl leading-none">
                          {data[activeIndex].distance}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Location Selector - Order-2 (Bottom) on mobile */}
          <div className="lg:col-span-5 w-full order-2 lg:order-1">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide snap-x gap-2 lg:gap-0">
              {data.map((loc, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  /* Adjust padding slightly for better content balance when image is large on mobile */
                  className={`group cursor-pointer flex-shrink-0 snap-center min-w-[120px] lg:min-w-full p-4 lg:py-5 border lg:border-0 lg:border-b border-slate-100 flex flex-col lg:flex-row lg:justify-between lg:items-center transition-all duration-300 ${
                    activeIndex === i 
                      ? "bg-slate-50 lg:bg-transparent lg:pl-4 border-primary/30" 
                      : "bg-transparent opacity-50 lg:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2 lg:gap-4">
                    <span className={`font-serif italic text-xs lg:text-lg ${
                      activeIndex === i ? "text-primary" : "text-slate-300"
                    }`}>
                      0{i + 1}
                    </span>
                    <h3 className={`text-[0.65rem] lg:text-xl font-serif uppercase tracking-tight ${
                      activeIndex === i ? "text-slate-900" : "text-slate-400"
                    }`}>
                      {loc.place}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-1 lg:mt-0">
                    <div className={`hidden lg:block h-px bg-primary transition-all duration-500 ${
                      activeIndex === i ? "w-8" : "w-0"
                    }`} />
                    <span className={`font-serif italic text-xs lg:text-lg ${
                      activeIndex === i ? "text-primary" : "text-slate-300"
                    }`}>
                      {loc.distance}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}