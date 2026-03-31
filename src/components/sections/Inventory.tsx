"use client";

import { ProjectConfig } from "@/config/project-data";
import { motion } from "framer-motion";
import { openLeadModal } from "./LeadPopup"; 

export default function Inventory({ data }: { data: ProjectConfig["inventory"] }) {
  return (
    <section className="bg-[#0a0a0a] py-32 relative z-30 overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="section-container">
        
        {/* Editorial Header */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-primary/60" />
            <span className="text-primary font-bold uppercase text-[0.65rem] tracking-[0.5em]">
              The Collection
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tighter"
          >
            Residential <br />
            <span className="italic text-primary font-light">Configurations</span>
          </motion.h2>
        </div>

        {/* Inventory List */}
        <div className="flex flex-col gap-4">
          {data.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative bg-[#111] hover:bg-[#161616] border border-white/5 hover:border-primary/30 transition-all duration-700 ease-in-out overflow-hidden"
            >
              {/* Ghost Numbering */}
              <span className="absolute -left-6 -bottom-10 font-serif italic text-[14rem] text-white/2 select-none group-hover:text-primary/4 transition-colors duration-1000 pointer-events-none">
                0{i + 1}
              </span>

              <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-12">
                
                {/* 1. Configuration Detail */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                     <p className="text-primary text-[0.6rem] font-black uppercase tracking-[0.3em] italic">
                        Residence 0{i + 1}
                     </p>
                     <div className="h-px w-4 bg-primary/30" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-tighter group-hover:text-primary transition-colors duration-500">
                    {item.configuration}
                  </h3>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)] animate-pulse" />
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-slate-500">Ready for acquisition</span>
                  </div>
                </div>

                {/* 2. Specs: Carpet Area */}
                <div className="flex flex-col justify-center border-l border-white/10 pl-10 md:pl-16">
                  <p className="text-slate-500 text-[0.55rem] uppercase tracking-[0.3em] mb-3 font-bold">Carpet Area</p>
                  <p className="text-3xl font-serif text-slate-200 italic font-light">{item.carpetArea}</p>
                </div>

                {/* 3. Pricing & CTA */}
                <div className="flex flex-col md:items-end justify-center min-w-60">
                  <p className="text-slate-500 text-[0.55rem] uppercase tracking-[0.3em] mb-2 font-bold">Value Proposition</p>
                  
                  {/* UPDATED PRICE BLOCK */}
                  <div className="flex items-baseline gap-2 mb-8">
                    <p className="text-4xl font-serif text-white">₹ {item.price}</p>
                    <span className="text-[0.65rem] uppercase tracking-widest text-slate-500 font-medium">Onwards</span>
                  </div>
                  
                  <button 
                    onClick={openLeadModal}
                    className="relative overflow-hidden group/btn px-12 py-5 border border-primary/50 text-primary text-[0.7rem] font-black uppercase tracking-[0.3em] transition-all hover:text-black cursor-pointer active:scale-95"
                  >
                    <span className="relative z-10">Enquire</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}