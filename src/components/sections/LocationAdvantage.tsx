"use client";

import { useState } from "react";
import { ProjectConfig } from "@/config/project-data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LocationAdvantage({ data }: { data: ProjectConfig["locationAdvantages"] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-5 overflow-hidden border-t border-slate-100 relative z-30">
      <div className="section-container">
        
        {/* Header: Guaranteed Visibility */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-bold uppercase text-[0.65rem] tracking-[0.4em]">
              Prime Access
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight tracking-tight">
            The Axis of <br />
            <span className="italic text-primary">Urban Luxury</span>
          </h2>
          
          <p className="mt-4 text-slate-500 text-[0.7rem] uppercase tracking-[0.2em] max-w-sm font-medium leading-relaxed">
            Strategically centered within the city's most prestigious transit corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Interactive List */}
          <div className="lg:col-span-5 space-y-1">
            {data.map((loc, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className={`group cursor-pointer py-6 border-b border-slate-100 flex justify-between items-center transition-all duration-500 ${
                  activeIndex === i ? "translate-x-2" : ""
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className={`font-serif italic text-xl transition-colors duration-500 ${
                    activeIndex === i ? "text-primary" : "text-slate-300"
                  }`}>
                    0{i + 1}
                  </span>
                  <h3 className={`text-xl lg:text-2xl font-serif uppercase tracking-tight transition-all duration-500 ${
                    activeIndex === i ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}>
                    {loc.place}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`h-px bg-primary transition-all duration-700 ${
                    activeIndex === i ? "w-10" : "w-0"
                  }`} />
                  <span className={`font-serif italic text-xl transition-colors ${
                    activeIndex === i ? "text-primary" : "text-slate-300"
                  }`}>
                    {loc.distance}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Visual Portal using dynamic images from data */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="relative aspect-16/10 overflow-hidden bg-slate-50 shadow-2xl border border-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    // FIX: Now using the image from your project-data.ts
                    src={data[activeIndex].image} 
                    alt={data[activeIndex].place}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Floating Detail Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-slate-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-primary text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-1">
                          Destination
                        </p>
                        <h4 className="text-xl font-serif text-slate-900 uppercase tracking-tighter">
                          {data[activeIndex].place}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-[0.55rem] uppercase tracking-widest mb-1">Reach in</p>
                        <p className="text-primary font-serif italic text-2xl leading-none">
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