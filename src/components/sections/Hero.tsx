"use client";

import Image from 'next/image';
import { motion } from "framer-motion";
import { ProjectConfig, PROJECT_DATA } from '@/config/project-data';
import { openLeadModal } from '@/components/sections/LeadPopup'; // Ensure this path is correct

interface HeroProps {
  data: ProjectConfig['hero'];
  highlights: { label: string; value: string }[];
}

export default function Hero({ data, highlights }: HeroProps) {
  
  // Handing the Brochure Logic
  const handleBrochureClick = () => {
    // Check if the user has already submitted for this specific project
    const hasSubmitted = localStorage.getItem(`submitted_${PROJECT_DATA.projectName}`);

    if (hasSubmitted === "true") {
      // 1. User already exists -> Direct Download
      const link = document.createElement('a');
      link.href = data.brochureUrl; // Uses the URL from your config
      link.download = `${PROJECT_DATA.projectName}_Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // 2. New user -> Open Lead Form
      openLeadModal();
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0A0B10]">
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt={data.title}
          fill
          priority
          quality={100}
          className="object-cover opacity-0 animate-hero-fade-in scale-125 animate-hero-zoom-out"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0B10]/50 z-10" />
      </div>

      {/* 2. Main Hero Content */}
      <div className="relative z-20 section-container text-center flex flex-col items-center pb-48 md:pb-24 px-6">
        <div className="w-px h-10 md:h-12 bg-primary mb-8 md:mb-10 origin-top animate-line-grow" />
        
        <span className="uppercase text-[0.6rem] md:text-[0.65rem] mb-4 md:mb-6 text-primary font-bold tracking-[0.4em] md:tracking-[0.6em] opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          An Exclusive Premiere
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-8xl text-white leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 font-serif text-balance">
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
        
        <p className="max-w-xl md:max-w-2xl mx-auto text-white/70 font-light tracking-wide text-base md:text-lg mb-8 md:mb-10 opacity-0 animate-blur-reveal text-balance" 
           style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}>
          {data.subtitle}
        </p>
        
        <div className="opacity-0 animate-slide-up w-full sm:w-auto" style={{ animationDelay: '2400ms', animationFillMode: 'forwards' }}>
          {/* UPDATED: Button now calls handleBrochureClick */}
          <button 
            onClick={handleBrochureClick}
            className="luxury-button w-full sm:w-auto px-10 md:px-16 border border-primary/50 hover:bg-primary transition-all duration-700 cursor-pointer"
          >
            {data.ctaText}
          </button>
        </div>
      </div>

      {/* 3. Floating Highlight Blocks */}
      <div className="absolute bottom-0 left-0 w-full z-30">
        <div className="max-w-350 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ 
                  delay: 2.8 + (idx * 0.15), 
                  duration: 1, 
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                  py-8 md:py-12 px-4 md:px-8 text-center 
                  border-t border-white/10 bg-[#050505]/60 md:bg-[#050505]/40 
                  backdrop-blur-sm md:backdrop-blur-none
                  group hover:bg-primary transition-all duration-700 cursor-pointer
                  ${idx % 2 === 0 ? "border-r" : "md:border-r"} 
                  ${idx === 3 ? "md:border-r-0" : ""}
                `}
              >
                <p className="text-primary text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.3em] md:tracking-[0.5em] mb-2 md:mb-3 font-bold group-hover:text-black transition-colors">
                  {item.label}
                </p>
                <p className="text-white font-serif text-base md:text-2xl tracking-tight group-hover:text-black transition-colors">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)] z-10" />
    </section>
  );
}