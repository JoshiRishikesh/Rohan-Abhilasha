"use client";

import Image from 'next/image';
import { motion } from "framer-motion";
import { ProjectConfig, PROJECT_DATA } from '@/config/project-data';
import { openLeadModal } from '@/components/sections/LeadPopup';

interface HeroProps {
  data: ProjectConfig['hero'];
  highlights: { label: string; value: string }[];
}

export default function Hero({ data, highlights }: HeroProps) {
  
  const handleBrochureClick = () => {
    const hasSubmitted = localStorage.getItem(`submitted_${PROJECT_DATA.projectName}`);

    if (hasSubmitted === "true") {
      const link = document.createElement('a');
      link.href = data.brochureUrl; 
      link.download = `${PROJECT_DATA.projectName}_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      openLeadModal();
    }
  };

  return (
    <section className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#0A0B10]">
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt={data.title}
          fill
          priority
          quality={100}
          className="object-cover opacity-0 animate-hero-fade-in scale-110 md:scale-125 animate-hero-zoom-out"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0B10]/40 md:bg-[#0A0B10]/50 z-10" />
      </div>

      {/* 2. Main Hero Content */}
      {/* CHANGES MADE: 
          - Increased pb (padding-bottom) across all breakpoints to clear the highlights.
          - Added md:mb-20 to the button wrapper to ensure extra clearance on desktop.
      */}
      <div className="relative z-20 section-container text-center flex flex-col items-center pb-80 sm:pb-72 md:pb-40 lg:pb-48 px-6">
        <div className="w-px h-8 md:h-12 bg-primary mb-6 md:mb-10 origin-top animate-line-grow" />
        
        <span className="uppercase text-[0.55rem] md:text-[0.65rem] mb-3 md:mb-6 text-primary font-bold tracking-[0.3em] md:tracking-[0.6em] opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          An Exclusive Premiere
        </span>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.2] md:leading-[1.1] mb-4 md:mb-8 font-serif text-balance">
          {data.title.split(' ').map((word, i) => (
            <span 
              key={i} 
              className={`inline-block opacity-0 animate-title-reveal ${i === 1 ? "italic font-light text-primary" : ""}`}
              style={{ animationDelay: `${1000 + (i * 150)}ms`, animationFillMode: 'forwards' }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h1>
        
        <p className="max-w-xs sm:max-w-xl md:max-w-2xl mx-auto text-white/80 font-light tracking-wide text-sm md:text-lg mb-8 md:mb-12 opacity-0 animate-blur-reveal text-balance" 
           style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
          {data.subtitle}
        </p>
        
        {/* Added mb-12 on desktop to push the button even further away from the highlights */}
        <div className="opacity-0 animate-slide-up w-full sm:w-auto md:mb-12" style={{ animationDelay: '2400ms', animationFillMode: 'forwards' }}>
          <button 
            onClick={handleBrochureClick}
            className="luxury-button w-full sm:w-auto px-8 md:px-16 py-4 md:py-5 border border-primary/50 hover:bg-primary transition-all duration-700 cursor-pointer text-[0.65rem] md:text-[0.75rem] tracking-widest text-white uppercase font-bold shadow-2xl"
          >
            {data.ctaText}
          </button>
        </div>
      </div>

      {/* 3. Floating Highlight Blocks */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ 
                  delay: 2.8 + (idx * 0.10), 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                  py-6 md:py-10 px-3 md:px-8 text-center 
                  border-t border-white/10 bg-[#050505]/90 md:bg-[#050505]/60 
                  backdrop-blur-xl md:backdrop-blur-md
                  group hover:bg-primary transition-all duration-700 cursor-pointer
                  ${idx % 2 === 0 ? "border-r border-white/10" : ""} 
                  ${idx < 4 ? "md:border-r" : ""}
                  ${idx === 3 ? "md:border-r-0" : ""}
                `}
              >
                <p className="text-primary text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.2em] md:tracking-[0.5em] mb-1 md:mb-3 font-bold group-hover:text-black transition-colors">
                  {item.label}
                </p>
                <p className="text-white font-serif text-sm md:text-xl lg:text-2xl tracking-tight group-hover:text-black transition-colors">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)] z-10" />
    </section>
  );
}