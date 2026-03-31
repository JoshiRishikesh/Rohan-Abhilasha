"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa"; 
import { ProjectConfig } from "@/config/project-data";

interface WhatsAppButtonProps {
  phone: string;
  projectName: string;
}

export default function WhatsAppButton({ phone, projectName }: WhatsAppButtonProps) {
  // Regex to ensure only numbers are passed to the WA API
  const cleanPhone = phone.replace(/\D/g, "");
  
  // Dynamic message using your Project Name
  const message = encodeURIComponent(
    `Hi, I'm interested in ${projectName}. Please share more details regarding the project.`
  );
  
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-100 group flex items-center gap-3"
    >
      {/* Editorial Tooltip */}
      <span className="bg-white text-slate-900 text-[0.6rem] font-bold uppercase tracking-[0.2em] px-4 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hidden md:block border border-slate-100">
        Chat with Us
      </span>

      {/* The Brand Button */}
      <div className="relative">
        {/* Continuous Wave Animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping" />
        
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] group-hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300">
          <FaWhatsapp className="text-3xl md:text-4xl" />
          
          {/* "Online" Indicator */}
          <div className="absolute top-0 right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
        </div>
      </div>
    </motion.a>
  );
}