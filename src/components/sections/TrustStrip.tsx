"use client";

import { motion } from "framer-motion";

export default function TrustStrip() {
  const trustItems = [
    "500+ Residences Delivered",
    "Prime Locations Across Pune",
    "10+ Years of Excellence",
    "Trusted by 300+ Families",
  ];

  return (
    <section className="w-full bg-secondary border-y border-border/20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl mx-auto px-8 py-5 md:py-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-x-8 md:gap-x-12">
              <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium text-muted-foreground/60 whitespace-nowrap leading-none">
                {item}
              </span>
              
              {/* Refined Dot Alignment - "Barely There" Luxury Aesthetic */}
              {index !== trustItems.length - 1 && (
                <div className="w-[1.5px] h-[1.5px] rounded-full bg-border/30 self-center opacity-50" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}