"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiHotelLine, 
  RiLeafLine, 
  RiPingPongLine, 
  RiShieldStarLine,
} from "react-icons/ri";
import { AmenityCategory } from "@/config/project-data";

interface AmenitiesSectionProps {
  data: AmenityCategory[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Clubhouse & Lifestyle": <RiHotelLine />,
  "Landscape & Outdoors": <RiLeafLine />,
  "Sports Facilities": <RiPingPongLine />,
  "Infrastructure & Services": <RiShieldStarLine />,
};

export default function AmenitiesSection({ data }: AmenitiesSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data || data.length === 0) return null;

  // Render a skeleton or empty container during SSR
  if (!mounted) {
    return <section className="py-12 md:py-24 bg-background min-h-150" />;
  }

  return (
    <section id="amenities" className="py-12 md:py-24 bg-background border-t border-border/60">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Header - Large Typography */}
        <div className="mb-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary uppercase tracking-[0.3em] text-[0.7rem] font-black block mb-2"
          >
            The Masterplan
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-serif text-foreground leading-tight">
            Curated <span className="italic font-light text-muted-foreground/40">Amenities</span>
          </h2>
        </div>

        {/* Tab Bar */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 mb-8">
          {data.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-4 md:px-8 md:py-5 text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.15em] font-black transition-all duration-300 relative flex items-center justify-center gap-3 border border-border/60 ${
                activeTab === idx ? "text-white" : "text-muted-foreground bg-secondary/5"
              }`}
            >
              {activeTab === idx && (
                <motion.div 
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-slate-950"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 text-lg md:text-xl">
                {categoryIcons[cat.category]}
              </span>
              <span className="relative z-10 truncate">{cat.category.split(' ')[0]}</span>
              <span className="relative z-10 opacity-50">[{cat.items.length}]</span>
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-border/60"
            >
              {data[activeTab].items.map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="group relative flex flex-col justify-between p-6 md:p-8 min-h-[160px] md:min-h-55 border-r border-b border-border/60 cursor-default hover:bg-secondary/20 transition-all duration-500 overflow-hidden"
                >
                  {/* 1. Top Reveal Line - Now a clean single-line string to prevent \r\n issues */}
                  <div className="absolute top-0 left-0 w-full h-0.75 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                  {/* 2. Large Number Watermark */}
                  <span className="absolute -bottom-3 -right-1 text-6xl md:text-7xl font-serif italic text-primary/5 group-hover:text-primary/10 transition-all duration-700 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* 3. Small Icon Indicator */}
                  <div className="relative z-10 w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-primary text-base">
                    {categoryIcons[data[activeTab].category]}
                  </div>

                  {/* 4. Feature Text */}
                  <div className="relative z-10 mt-6">
                    <h4 className="text-[1.1rem] md:text-[1.25rem] font-medium leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-300 tracking-tight">
                      {item}
                    </h4>
                    
                    <div className="mt-4 w-2 h-2 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}