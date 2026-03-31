"use client";

import { useState, useEffect, useTransition } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_DATA } from "@/config/project-data";
import { submitLead } from "@/app/actions/submit-lead";

export const openLeadModal = () => {
  window.dispatchEvent(new Event("open-lead-modal"));
};

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);

    // Check if user already submitted in a previous session
    const hasSubmitted = localStorage.getItem(`submitted_${PROJECT_DATA.projectName}`);
    if (hasSubmitted) {
      setIsSuccess(true);
    }

    // Only auto-open if they haven't submitted yet
    let timer: NodeJS.Timeout;
    if (!hasSubmitted) {
      timer = setTimeout(() => setIsOpen(true), 3000);
    }

    const handleOpen = () => {
      setSubmissionError(null);
      setIsOpen(true);
    };

    window.addEventListener("open-lead-modal", handleOpen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-lead-modal", handleOpen);
    };
  }, []);

  async function handleSubmit(formData: FormData) {
    setSubmissionError(null);
    
    startTransition(async () => {
      try {
        const result = await submitLead(formData);
        
        if (result.success) {
          if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': `${PROJECT_DATA.googleAds.conversionId}/${PROJECT_DATA.googleAds.conversionLabel}`,
            'value': 1.0,
            'currency': 'INR'
          });
          console.log("🚀 Google Ads Lead Tracked!");
        }
          // Mark as submitted locally
          localStorage.setItem(`submitted_${PROJECT_DATA.projectName}`, "true");
          setIsSuccess(true);
          
          // Auto close after 5 seconds
          setTimeout(() => {
            setIsOpen(false);
          }, 5000);
        } else {
          setSubmissionError(result.error || "Submission failed. Please try again.");
        }
      } catch (err) {
        setSubmissionError("A network error occurred. Please check your connection.");
      }
    });
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 backdrop-blur-md px-6"
        >
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white p-8 md:p-12 w-full max-w-lg relative shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors uppercase text-[0.6rem] tracking-[0.3em] font-bold cursor-pointer"
            >
              [ Close ]
            </button>

            {!isSuccess ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-8">
                  <h3 className="text-3xl font-serif mb-2 text-slate-900 uppercase tracking-tight">
                    Enquire <span className="italic text-primary font-light block lowercase">Now</span>
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Register your interest in {PROJECT_DATA.projectName} for priority access and exclusive offers.
                  </p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <div className="relative group">
                      <select 
                        name="unit_configuration" 
                        required
                        defaultValue=""
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary outline-none transition-all text-sm text-slate-900 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select Configuration *</option>
                        <option value="1BHK">1 BHK Luxury Apartment</option>
                        <option value="2BHK">2 BHK Premium Residence</option>
                        <option value="3BHK">3 BHK Signature Suite</option>
                        <option value="Penthouse">Elite Penthouse</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    <input 
                      name="name" 
                      type="text" 
                      placeholder="Full Name *" 
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary outline-none transition-all text-sm text-slate-900" 
                      required 
                    />

                    <input 
                      name="phone" 
                      type="tel" 
                      placeholder="Mobile Number (10 Digits) *" 
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary outline-none transition-all text-sm text-slate-900" 
                      required 
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, ''); 
                      }}
                    />

                    <input 
                      name="email" 
                      type="email" 
                      placeholder="Email Address (Optional)" 
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary outline-none transition-all text-sm text-slate-900" 
                    />
                  </div>
                  
                  {submissionError && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-red-600 text-xs font-medium italic bg-red-50 p-3 border-l-2 border-red-600"
                    >
                      {submissionError}
                    </motion.p>
                  )}
                  
                  <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full bg-slate-900 text-white py-4 uppercase text-[0.7rem] tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500 disabled:opacity-50 cursor-pointer relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {isPending ? "Connecting to Concierge..." : "Request Callback"}
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="text-primary text-3xl"
                  >
                    ✓
                  </motion.span>
                </div>
                <h3 className="text-3xl font-serif mb-4 text-slate-900">Thank You</h3>
                <p className="text-slate-500 italic text-sm leading-relaxed">
                  We have already received your enquiry. <br/>
                  Our Sales Person will call you soon.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}