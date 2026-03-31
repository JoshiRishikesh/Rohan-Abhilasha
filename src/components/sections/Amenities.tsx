"use client";

import { ProjectConfig } from "@/config/project-data";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function Amenities({ data }: { data: ProjectConfig["amenities"] }) {
  // Define the luxury reveal animation
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
    <section className="bg-background pt-0 pb-5 overflow-hidden -mt-px">
      <div className="section-container pt-0">
        
        {/* 1. The Editorial Header: Layered & Sophisticated */}
        <div className="relative pt-24 mb-24">
          {/* Faded Background Text for Texture - KEPT EXACTLY AS PROVIDED */}
          <span className="absolute -top-4 left-0 text-[10rem] font-serif italic opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter">
            Lifestyle
          </span>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={revealVariants}
              className="reveal-on-scroll reveal-active"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary font-bold uppercase text-[0.6rem] tracking-[0.5em]">
                  The Curation
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif text-foreground leading-[0.9] tracking-tight">
                Refining the <br />
                <span className="italic text-primary pl-12 md:pl-20 inline-block mt-2">Standard</span>
              </h2>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={revealVariants}
              className="max-w-[320px] md:text-right reveal-on-scroll reveal-active" 
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-[0.7rem] uppercase font-medium tracking-[0.25em] leading-loose opacity-60 mb-6">
                A private collection of over 40+ lifestyle amenities spread across three levels of architectural excellence.
              </p>
              <div className="h-px w-full bg-border/40" />
            </motion.div>
          </div>
        </div>

        {/* 2. The Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {data.map((item, index) => {
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                variants={revealVariants}
                transition={{ delay: index * 0.1 }}
                className={`group relative h-150 overflow-hidden cursor-pointer reveal-on-scroll reveal-active
                           ${isLarge ? 'md:col-span-7' : 'md:col-span-5'}`}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0 transition-transform duration-[1.5s] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-110">
                  {item.image && (
                    <Image
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover brightness-[0.75] contrast-[1.1] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0A0B10] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                </div>

                {/* Glassmorphic Top Tag */}
                <div className="absolute top-8 left-8 z-20 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                   <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white font-bold">Experience 0{index + 1}</span>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 h-full flex flex-col justify-end p-10 lg:p-14">
                  <h3 className="text-3xl lg:text-4xl font-serif text-white leading-none tracking-wide group-hover:text-primary transition-colors duration-500">
                    {item.title}
                  </h3>
                  
                  <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                    <p className="text-white/60 text-[0.65rem] uppercase tracking-[0.3em] mt-6 leading-relaxed">
                      Exclusively designed for the residents of Rohan Abhilasha.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-8">
                    <div className="h-px w-8 bg-primary group-hover:w-20 transition-all duration-700" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300" />
                  </div>
                </div>

                {/* Architectural Corner Border */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-primary/40 group-hover:w-12 group-hover:h-12 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}