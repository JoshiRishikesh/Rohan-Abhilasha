"use client";

import { useState, useEffect, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Center the active tab on mobile when clicked
  const handleTabClick = (idx: number, e: React.MouseEvent) => {
    setActiveTab(idx);
    const target = e.currentTarget as HTMLElement;
    target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  if (!data || data.length === 0) return null;

  if (!mounted) {
    return <section className="py-12 md:py-24 bg-background min-h-[400px]" />;
  }

  return (
    <section id="amenities" className="py-16 md:py-24 bg-background border-t border-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Header */}
        <div className="mb-8 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary uppercase tracking-[0.3em] text-[0.65rem] md:text-[0.7rem] font-black block mb-3"
          >
            The Masterplan
          </motion.span>
          <h2 className="text-3xl md:text-7xl font-serif text-foreground leading-tight">
            Curated <span className="italic font-light text-muted-foreground/40">Amenities</span>
          </h2>
        </div>

        {/* Tab Bar - Optimized for Mobile Swipe */}
        <div className="relative mb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div 
            ref={scrollContainerRef}
            className="flex md:flex-wrap gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x"
          >
            {data.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={(e) => handleTabClick(idx, e)}
                className={`flex-shrink-0 snap-center px-6 py-4 md:px-8 md:py-5 text-[0.6rem] md:text-[0.75rem] uppercase tracking-[0.15em] font-black transition-all duration-300 relative flex items-center justify-center gap-3 border border-border/60 min-w-[140px] md:min-w-0 ${
                  activeTab === idx ? "text-white border-transparent" : "text-muted-foreground bg-secondary/5"
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
                <span className="relative z-10 whitespace-nowrap">
                  {/* Show full category on desktop, first word on mobile if space is tight */}
                  <span className="md:inline">{cat.category.split(' ')[0]}</span>
                  <span className="hidden md:inline"> {cat.category.split(' ').slice(1).join(' ')}</span>
                </span>
                <span className="relative z-10 opacity-40 text-[0.6rem]">[{cat.items.length}]</span>
              </button>
            ))}
          </div>
          {/* Mobile indicator for scrollability */}
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Content Grid */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-border/60"
            >
              {data[activeTab].items.map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="group relative flex flex-col justify-between p-6 md:p-8 min-h-[140px] md:min-h-[220px] border-r border-b border-border/60 hover:bg-secondary/10 transition-all duration-500 overflow-hidden"
                >
                  {/* Top Reveal Line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                  {/* Watermark Number - Slightly smaller on mobile */}
                  <span className="absolute -bottom-2 -right-1 text-5xl md:text-7xl font-serif italic text-primary/5 group-hover:text-primary/10 transition-all duration-700 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Indicator Icon */}
                  <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary/40 md:bg-secondary/60 flex items-center justify-center text-primary text-sm md:text-base">
                    {categoryIcons[data[activeTab].category]}
                  </div>

                  {/* Feature Text */}
                  <div className="relative z-10 mt-4 md:mt-6">
                    <h4 className="text-base md:text-xl font-medium leading-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300 tracking-tight">
                      {item}
                    </h4>
                    <div className="mt-3 w-1.5 h-1.5 bg-primary rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
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