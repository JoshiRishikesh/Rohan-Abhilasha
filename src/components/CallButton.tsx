"use client";

import { motion } from "framer-motion";
import { MdPhoneInTalk } from "react-icons/md"; // npm install react-icons

interface CallButtonProps {
  phone: string;
}

export default function CallButton({ phone }: CallButtonProps) {
  // Clean phone number for the tel: link
  const cleanPhone = phone.replace(/\D/g, "");

  return (
    <motion.a
      href={`tel:+${cleanPhone}`}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 2.7, duration: 0.5 }} // Appears slightly after WhatsApp
      className="fixed bottom-24 right-6 md:bottom-32 md:right-10 z-100 group flex items-center gap-3"
    >
      {/* Editorial Tooltip */}
      <span className="bg-white text-slate-900 text-[0.6rem] font-bold uppercase tracking-[0.2em] px-4 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden md:block border border-slate-100">
        Speak to Sales
      </span>

      {/* The Brand Button */}
      <div className="relative">
        {/* Continuous Wave Animation in Brand Gold */}
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(var(--primary-rgb),0.4)] group-hover:shadow-[0_15px_40px_rgba(var(--primary-rgb),0.6)] transition-all duration-300 border border-white/20">
          <MdPhoneInTalk className="text-2xl md:text-3xl animate-pulse" />
        </div>
      </div>
    </motion.a>
  );
}