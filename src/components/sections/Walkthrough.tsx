"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Walkthrough({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Removed default section-container padding-x for mobile to allow edge-to-edge video if desired, 
          or kept it very tight (px-4) */}
      <div className="relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.6rem] tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4 block"
          >
            Immersive Experience
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight"
          >
            Cinematic <span className="italic font-light text-primary/80">Walkthrough</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 md:mt-6 text-slate-400 text-[0.6rem] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] max-w-xs md:max-w-md mx-auto leading-relaxed"
          >
            A journey through architectural excellence and refined living spaces.
          </motion.p>
        </div>

        {/* Video Container - Optimized for Mobile Width */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="group relative aspect-video w-full max-w-6xl mx-auto bg-slate-900 shadow-2xl border border-white/5 overflow-hidden rounded-sm"
        >
          {!isPlaying ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              {/* Custom High-End Play Button - Responsive Scaling */}
              <button 
                onClick={() => setIsPlaying(true)}
                className="relative group/btn cursor-pointer scale-75 md:scale-100"
              >
                {/* Expanding Rings */}
                <div className="absolute inset-0 -m-6 md:-m-8 rounded-full border border-primary/20 scale-100 group-hover/btn:scale-110 transition-transform duration-1000 animate-pulse" />
                <div className="absolute inset-0 -m-3 md:-m-4 rounded-full border border-primary/40 scale-100 group-hover/btn:scale-125 transition-transform duration-700" />
                
                {/* The Core Button */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white flex items-center justify-center rounded-full transition-transform duration-500 group-hover/btn:scale-90 shadow-2xl">
                  <div className="w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[14px] md:border-l-[18px] border-l-slate-900 border-b-[8px] md:border-b-[10px] border-b-transparent ml-1" />
                </div>
                
                <span className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 text-white text-[0.55rem] md:text-[0.6rem] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-100 md:opacity-0 md:group-hover/btn:opacity-100 transition-opacity duration-500">
                  Play Film
                </span>
              </button>

              {/* Video Thumbnail Placeholder */}
              <div 
                className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 grayscale-[0.3] md:grayscale-[0.5] group-hover:scale-105 transition-transform duration-[5s]"
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
              />
            </div>
          ) : (
            <iframe 
              className="absolute inset-0 w-full h-full" 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
            />
          )}
        </motion.div>

        {/* Footer Detail - Tightened for Mobile */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-12 opacity-40">
           <div className="text-[0.45rem] md:text-[0.5rem] text-white uppercase tracking-[0.3em] md:tracking-[0.4em]">4K Ultra HD</div>
           <div className="text-[0.45rem] md:text-[0.5rem] text-white uppercase tracking-[0.3em] md:tracking-[0.4em]">Spatial Audio</div>
           <div className="text-[0.45rem] md:text-[0.5rem] text-white uppercase tracking-[0.3em] md:tracking-[0.4em]">Full Immersion</div>
        </div>
      </div>

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)]" />
    </section>
  );
}