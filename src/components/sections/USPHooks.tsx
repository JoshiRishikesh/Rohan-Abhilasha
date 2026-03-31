"use client";

import { ProjectConfig } from "@/config/project-data";
import { motion, Variants } from "framer-motion";

export default function USPHooks({ data }: { data: ProjectConfig["usp"] }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, // Reduced y for smoother mobile flow
      filter: "blur(8px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.0, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  return (
    <section className="bg-background relative z-30 overflow-hidden md:min-h-screen flex items-stretch border-t border-border/50">
      <motion.div 
        className="w-full flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
      >
        {/* Changed grid flow for mobile: tighter rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 grow divide-y md:divide-y-0 md:divide-x divide-border/60">
          {data.map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              // MOBILE OPTIMIZATION: Reduced padding (p-8) and height (min-h-[320px])
              className="group relative flex flex-col justify-center p-8 lg:p-20 border-border hover:bg-secondary/30 transition-all duration-1000 min-h-[320px] md:min-h-screen overflow-hidden"
            >
              {/* Massive Ghost Number - Scaled down for mobile */}
              <span className="absolute top-10 right-6 md:top-20 md:right-12 text-7xl lg:text-9xl font-serif italic text-primary/5 group-hover:text-primary/10 group-hover:-translate-y-2 md:group-hover:-translate-y-4 transition-all duration-1000 select-none pointer-events-none">
                0{i + 1}
              </span>

              <div className="relative z-10">
                {/* Category Label - Tighter margin on mobile */}
                <p className="text-primary text-[0.6rem] md:text-[0.7rem] font-black uppercase mb-4 md:mb-8 tracking-[0.4em] md:tracking-[0.5em]">
                  {item.title}
                </p>

                {/* The Main Hook - Reduced size on mobile for better fit */}
                <h3 className="text-3xl lg:text-5xl xl:text-6xl font-serif text-foreground leading-[1.2] md:leading-[1.1] max-w-[12ch] md:max-w-[10ch] group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-700 ease-out">
                  {item.subtitle}
                </h3>

                {/* Descriptive nuance - Forced visible on mobile (since no hover) but kept clean */}
                <p className="mt-4 md:mt-8 text-foreground/40 text-xs md:text-sm max-w-[28ch] md:max-w-[25ch] font-light leading-relaxed md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 delay-100">
                  Experience a new paradigm of architectural excellence and refined living.
                </p>

                {/* Interactive Accent Line - Smaller on mobile */}
                <div className="w-8 h-[1px] md:w-12 bg-primary mt-6 md:mt-12 group-hover:w-16 md:group-hover:w-24 transition-all duration-1000" />
              </div>
              
              {/* Corner Accent - Hidden on mobile to reduce visual noise */}
              <div className="hidden md:block absolute bottom-0 right-0 w-0 h-0 border-t-40 border-t-transparent border-r-40 border-r-primary/0 group-hover:border-r-primary/10 transition-all duration-700" />
              
              {/* Subtle hover background sweep */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/2 pointer-events-none transition-colors duration-1000" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}