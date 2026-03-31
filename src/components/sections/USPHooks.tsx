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
      y: 30,
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  return (
    <section className="bg-background relative z-30 overflow-hidden min-h-screen flex items-stretch">
      <motion.div 
        className="w-full flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 grow">
          {data.map((item, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="group relative flex flex-col justify-center p-12 lg:p-20 border-b md:border-b-0 md:border-r border-border hover:bg-secondary/30 transition-all duration-1000 min-h-[60vh] md:min-h-screen"
            >
              {/* Massive Ghost Number for Vertical Scale */}
              <span className="absolute top-20 right-12 text-8xl lg:text-9xl font-serif italic text-primary/5 group-hover:text-primary/10 group-hover:-translate-y-4 transition-all duration-1000 select-none pointer-events-none">
                0{i + 1}
              </span>

              <div className="relative z-10">
                {/* Category Label */}
                <p className="text-primary text-[0.7rem] font-black uppercase mb-8 tracking-[0.5em]">
                  {item.title}
                </p>

                {/* The Main Hook - Increased scale for full-screen impact */}
                <h3 className="text-4xl lg:text-5xl xl:text-6xl font-serif text-foreground leading-[1.1] max-w-[10ch] group-hover:translate-x-4 transition-transform duration-700 ease-out">
                  {item.subtitle}
                </h3>

                {/* Descriptive nuance (Optional if your config has it, otherwise stays clean) */}
                <p className="mt-8 text-foreground/40 text-sm max-w-[25ch] font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  Experience a new paradigm of architectural excellence and refined living.
                </p>

                {/* Interactive Accent Line */}
                <div className="w-12 h-1px bg-primary mt-12 group-hover:w-24 transition-all duration-1000" />
              </div>
              
              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-0 h-0 border-t-40 border-t-transparent border-r-40 border-r-primary/0 group-hover:border-r-primary/10 transition-all duration-700" />
              
              {/* Subtle hover background sweep */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/2 pointer-events-none transition-colors duration-1000" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}