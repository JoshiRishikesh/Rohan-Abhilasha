import Image from "next/image";
import { ProjectConfig } from "@/config/project-data";

export default function Footer({ config }: { config: ProjectConfig }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-7">
            <h3 className="text-4xl font-serif mb-6 text-white tracking-tight">
              {config.projectName}
              <span className="block text-[0.65rem] uppercase tracking-[0.5em] text-primary font-bold mt-4 opacity-80">
                Premium Residences
              </span>
            </h3>
            <p className="max-w-md text-[0.7rem] uppercase tracking-[0.25em] leading-loose text-slate-500 mb-10">
              {config.contact.address}
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="flex flex-col gap-1">
                <span className="text-[0.6rem] uppercase tracking-widest text-slate-600 mb-1">Inquiries</span>
                <a href={`tel:${config.contact.phone}`} className="text-sm font-medium text-slate-300 hover:text-primary transition-colors duration-300">
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[0.6rem] uppercase tracking-widest text-slate-600 mb-1">Concierge</span>
                <a href={`mailto:${config.contact.email}`} className="text-sm font-medium text-slate-300 hover:text-primary transition-colors duration-300">
                  {config.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* RERA & Compliance Column */}
          <div className="md:col-span-5 flex flex-col md:items-end justify-start">
            <div className="bg-white/3 backdrop-blur-sm p-8 border border-white/10 shadow-2xl rounded-sm w-full max-w-xs">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-4 font-bold">
                MahaRERA Registered
              </p>
              <p className="text-xl font-serif text-white mb-6 tracking-wide">
                {config.rera.registrationNumber}
              </p>
              <div className="relative w-full aspect-square max-w-30 mx-auto filter invert brightness-100 opacity-80 hover:opacity-100 transition-opacity duration-500">
                <Image 
                  src={config.rera.qrCode} 
                  alt="MahaRERA QR" 
                  fill 
                  className="object-contain p-2 bg-white rounded-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="border-t border-white/5 pt-12">
          <div className="space-y-8">
            <div className="max-w-5xl">
              <p className="text-[0.6rem] leading-relaxed text-slate-600 uppercase tracking-[0.15em] text-justify font-light">
                <span className="text-slate-400 font-bold mb-2 block tracking-[0.3em]">Official Disclaimer</span>
                The artistic impressions and images displayed are for representational purposes only and do not constitute an offer. All dimensions, specifications, and amenities are subject to change as per the developer&apos;s discretion or as required by approving authorities. This interface is managed by an authorized marketing partner. Final terms of purchase shall be governed solely by the &apos;Agreement for Sale&apos;.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/2">
              <p className="text-[0.55rem] uppercase tracking-[0.4em] text-slate-700">
                &copy; {currentYear} {config.projectName} | Crafted by Lupa Entertainment
              </p>
              <div className="flex gap-10 text-[0.55rem] uppercase tracking-[0.25em] text-slate-600">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}