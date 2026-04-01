"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_DATA } from "@/config/project-data";
import { openLeadModal } from "@/components/sections/LeadPopup";
import { RiMenu3Line, RiCloseLine, RiPhoneFill } from "react-icons/ri";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Amenities", id: "amenities" },
    { name: "Inventory", id: "inventory" },
    { name: "Gallery", id: "gallery" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled || isOpen
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between gap-2">
          
          {/* Left: Branding */}
          <div 
            className="flex items-center gap-3 cursor-pointer z-[110] min-w-0" 
            onClick={() => scrollToSection("hero")}
          >
            <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
              <img 
                src={PROJECT_DATA.brandLogo} 
                alt={PROJECT_DATA.projectName} 
                className={`object-contain w-full h-full transition-all duration-500 ${
                  (isScrolled || isOpen) ? "brightness-0" : "brightness-0 invert"
                }`} 
              />
            </div>
            
            <div className="hidden xs:flex flex-col border-l border-slate-300/50 pl-3 md:pl-4 justify-center overflow-hidden">
              <span className={`text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold leading-none mb-1 transition-colors duration-500 truncate ${
                (isScrolled || isOpen) ? "text-primary" : "text-white/80"
              }`}>
                The Residence
              </span>
              <span className={`text-base md:text-lg font-serif tracking-tight leading-none transition-colors duration-500 truncate ${
                (isScrolled || isOpen) ? "text-slate-900" : "text-white"
              }`}>
                {PROJECT_DATA.projectName}
              </span>
            </div>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                // Updated font size to 0.75rem and added cursor-pointer
                className={`text-[0.75rem] uppercase tracking-[0.2em] font-bold transition-all duration-500 hover:opacity-100 cursor-pointer ${
                  isScrolled 
                    ? "text-slate-600 hover:text-primary opacity-80" 
                    : "text-white hover:text-white opacity-70"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-8 flex-shrink-0 z-[110]">
            <div className="hidden xl:flex items-center gap-6">
              <a 
                href={`tel:${PROJECT_DATA.contact.phone}`} 
                className={`text-[0.75rem] uppercase tracking-widest font-bold transition-colors duration-500 cursor-pointer ${
                  isScrolled ? "text-slate-500 hover:text-primary" : "text-white/70 hover:text-white"
                }`}
              >
                {PROJECT_DATA.contact.phone}
              </a>
            </div>

            <button 
              onClick={openLeadModal}
              className="relative group overflow-hidden bg-slate-900 text-white px-5 py-3 md:px-8 md:py-4 uppercase text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] md:tracking-[0.25em] font-bold transition-all duration-500 shadow-xl shadow-slate-900/10 active:scale-95 cursor-pointer"
            >
              <span className="relative z-10">
                Enquire <span className="hidden xs:inline">Now</span>
              </span>
              <motion.div 
                className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
              />
            </button>

            {/* Hamburger Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-1 transition-colors cursor-pointer ${
                (isScrolled || isOpen) ? "text-slate-900" : "text-white"
              }`}
            >
              {isOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-8 flex flex-col"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left group cursor-pointer"
                >
                  <span className="block text-[0.55rem] uppercase tracking-[0.4em] font-bold text-primary mb-2">
                    0{i + 1}
                  </span>
                  <span className="text-4xl font-serif italic text-slate-900 group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-auto mb-10 border-t border-slate-100 pt-8">
              <a 
                href={`tel:${PROJECT_DATA.contact.phone}`} 
                className="flex items-center gap-4 text-xl font-bold text-slate-900 mb-6 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary">
                  <RiPhoneFill size={20} />
                </div>
                {PROJECT_DATA.contact.phone}
              </a>
              <button 
                onClick={() => { setIsOpen(false); openLeadModal(); }}
                className="w-full bg-slate-900 text-white py-5 uppercase text-[0.65rem] tracking-[0.3em] font-black cursor-pointer"
              >
                Request Call Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}