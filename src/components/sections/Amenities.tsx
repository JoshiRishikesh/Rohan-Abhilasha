"use client";

import { ProjectConfig } from "@/config/project-data";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Amenities({ data }: { data: ProjectConfig["amenities"] }) {
  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="bg-background pt-0 pb-12 md:pb-20 overflow-hidden -mt-px">
      <div className="section-container pt-0 px-4 md:px-6">
        
        {/* 1. Editorial Header */}
        <div className="relative pt-16 md:pt-24 mb-10 md:mb-24">
          <span className="absolute top-4 md:-top-4 left-0 text-6xl md:text-[10rem] font-serif italic opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
            Lifestyle
          </span>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="h-px w-8 md:w-12 bg-primary" />
                <span className="text-primary font-bold uppercase text-[0.55rem] md:text-[0.6rem] tracking-[0.4em] md:tracking-[0.5em]">
                  The Curation
                </span>
              </div>
              <h2 className="text-4xl md:text-7xl font-serif text-foreground leading-[1.1] tracking-tight">
                Refining the <br />
                <span className="italic text-primary pl-8 md:pl-20 inline-block mt-1">Standard</span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="max-w-[320px] md:text-right" 
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-[0.65rem] md:text-[0.7rem] uppercase font-medium tracking-[0.2em] leading-relaxed opacity-60 mb-4">
                A private collection of lifestyle amenities spread across architectural excellence.
              </p>
              <div className="h-px w-full bg-border/40" />
            </motion.div>
          </div>
        </div>

        {/* 2. Asymmetric Bento Grid - Optimized for 1:1 Images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-10">
          {data.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={revealVariants}
                transition={{ delay: index * 0.1 }}
                // ASPECT RATIO FIX: aspect-square on mobile, fixed height on desktop
                className={`group relative aspect-square md:aspect-auto md:h-150 overflow-hidden cursor-pointer 
                           ${isLarge ? 'md:col-span-7' : 'md:col-span-5'}`}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0 transition-transform duration-[1.5s] ease-out group-hover:scale-110">
                  {item.image && (
                    <Image
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover brightness-[0.85] md:brightness-[0.75] contrast-[1.05] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-[#0A0B10]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                </div>

                {/* Tag */}
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 opacity-100 md:opacity-0 md:-translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                   <span className="text-[0.5rem] md:text-[0.55rem] uppercase tracking-[0.3em] text-white font-bold">
                    Experience 0{index + 1}
                   </span>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-14">
                  <h3 className="text-2xl md:text-4xl font-serif text-white leading-none tracking-wide group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  
                  {/* Description Reveal */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                    <p className="text-white/60 text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.2em] mt-4 leading-relaxed">
                      Designed exclusively for the residents of {item.title}.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <div className="h-px w-8 bg-primary group-hover:w-16 transition-all duration-700" />
                    <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300" />
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-primary/40 group-hover:w-8 group-hover:h-8 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}