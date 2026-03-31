"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PROJECT_DATA } from "@/config/project-data";
import { openLeadModal } from "@/components/sections/LeadPopup";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      // Changed to z-[100] to ensure it works even without custom config
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm" 
          : "bg-transparent py-4 md:py-6" 
      }`}
    >
      {/* Mobile-friendly horizontal padding (px-4 vs px-6) */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        
        {/* Left: Branding */}
        <div 
          className="flex items-center gap-3 md:gap-4 group cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Logo scales for mobile */}
          <div className="h-8 w-8 md:h-10 md:w-10 relative overflow-hidden flex items-center justify-center">
            <img 
              src={PROJECT_DATA.brandLogo} 
              alt={PROJECT_DATA.projectName} 
              className={`object-contain w-full h-full transition-all duration-500 ${
                isScrolled ? "brightness-0" : "brightness-0 invert"
              }`} 
            />
          </div>
          
          {/* Text Branding: Hidden on narrow mobile (below 640px) to prevent layout clash */}
          <div className="hidden sm:flex flex-col border-l border-slate-300/50 pl-3 md:pl-4 h-8 md:h-10 justify-center">
            <span className={`text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold leading-none mb-1 transition-colors duration-500 ${
              isScrolled ? "text-primary" : "text-white/80"
            }`}>
              The Residence
            </span>
            <span className={`text-base md:text-lg font-serif tracking-tight leading-none transition-colors duration-500 ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}>
              {PROJECT_DATA.projectName}
            </span>
          </div>
        </div>

        {/* Right: Phone & CTA */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-6">
            <a 
              href={`tel:${PROJECT_DATA.contact.phone}`} 
              className={`text-[0.7rem] uppercase tracking-widest font-bold transition-colors duration-500 ${
                isScrolled ? "text-slate-500 hover:text-primary" : "text-white/70 hover:text-white"
              }`}
            >
              {PROJECT_DATA.contact.phone}
            </a>
          </div>

          {/* Button: Reduced padding/font for mobile, "Now" hidden on very small screens */}
          <button 
            onClick={openLeadModal}
            className="relative group overflow-hidden bg-slate-900 text-white px-5 py-3 md:px-8 md:py-4 uppercase text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] md:tracking-[0.25em] font-bold transition-all duration-500 shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">
              Enquire <span className="hidden xs:inline">Now</span>
            </span>
            <motion.div 
              className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
            />
          </button>
        </div>

      </div>
    </motion.nav>
  );
}