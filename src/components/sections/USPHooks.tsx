"use client";

import { useRef, useState } from "react";
import { ProjectConfig } from "@/config/project-data";
import { motion } from "framer-motion";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi2"; 
import Image from "next/image";

export default function USPHooks({ data }: { data: ProjectConfig["usp"] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollToInput = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-background w-full overflow-hidden border-t border-border/10">
      
      {/* HEADER: Tightened py-2.5 for mobile, py-4 for desktop */}
      <div className="w-full px-4 md:px-6 py-2.5 md:py-4 flex flex-row items-center justify-between border-b border-border/5">
        <div className="flex flex-col">
          <span className="text-[0.5rem] font-bold uppercase tracking-[0.4em] text-primary">
            Highlights
          </span>
          <h2 className="text-lg md:text-2xl font-serif text-foreground tracking-tight leading-none">
            The <span className="italic font-light opacity-50">Distinction</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
            <span className="text-[0.55rem] font-bold text-primary tabular-nums">0{activeIndex + 1} / 0{data.length}</span>
            <div className="flex gap-1">
                <button 
                  onClick={() => scrollToInput(activeIndex - 1)} 
                  className="p-1 hover:text-primary transition-colors disabled:opacity-10" 
                  disabled={activeIndex === 0}
                >
                    <HiOutlineChevronLeft size={14} />
                </button>
                <button 
                  onClick={() => scrollToInput(activeIndex + 1)} 
                  className="p-1 hover:text-primary transition-colors disabled:opacity-10" 
                  disabled={activeIndex === data.length - 1}
                >
                    <HiOutlineChevronRight size={14} />
                </button>
            </div>
        </div>
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="w-full relative">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-row w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide md:overflow-hidden"
        >
          {data.map((item, i) => (
            <div 
              key={i} 
              /* MOBILE: px-4 (horizontal), py-5 (vertical)
                 DESKTOP: md:px-8, md:py-10
              */
              className="group relative flex-none w-screen md:w-[33.333vw] flex flex-col justify-start px-4 py-5 md:px-8 md:py-10 snap-center border-r border-border/5 overflow-hidden"
            >
              {/* Background Reveal */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <Image src={`/assets/usp-${i + 1}.avif`} alt="" fill className="object-cover grayscale" />
              </div>

              <div className="relative z-10">
                {/* Lowered margin from mb-2 to mb-1 for a tighter look */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[0.5rem] font-bold text-primary/40">0{i + 1}</span>
                    <div className="h-px w-3 bg-primary/20" />
                </div>
                
                <h3 className="text-base md:text-lg font-bold text-foreground leading-tight mb-0.5 group-hover:text-primary transition-colors duration-300">
                  {item.subtitle}
                </h3>
                
                <p className="text-foreground/60 text-[0.65rem] leading-snug max-w-[32ch]">
                  {item.title}. Precision engineering for a superior living standard.
                </p>
              </div>

              {/* Navigation Zone - Desktop Only (Hidden on mobile for better touch UX) */}
              {i < data.length - 1 && (
                <button 
                  onClick={() => scrollToInput(i + 1)}
                  className="hidden md:flex absolute right-0 top-0 bottom-0 w-8 z-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <HiOutlineChevronRight className="w-3 h-3 text-primary" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}