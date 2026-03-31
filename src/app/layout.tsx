import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { PROJECT_DATA } from "@/config/project-data";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/sections/LeadPopup";
import CallButton from "@/components/CallButton";
import Navbar from "@/components/Navbar"; // New Import
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROJECT_DATA.projectName} | ${PROJECT_DATA.hero.title}`,
  description: PROJECT_DATA.hero.subtitle,
  openGraph: {
    title: PROJECT_DATA.projectName,
    description: PROJECT_DATA.hero.subtitle,
    images: [PROJECT_DATA.hero.bgImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-slate-900 selection:bg-primary selection:text-white font-sans">
        
        {/* Global Navigation - Sticky/Glassmorphism handled inside component */}
        <Navbar />

        {/* Main Website Content */}
        <main>{children}</main>

        {/* Fixed UI Action Elements */}
        <CallButton 
          phone={PROJECT_DATA.contact.phone} 
        />

        <WhatsAppButton 
          phone={PROJECT_DATA.contact.phone} 
          projectName={PROJECT_DATA.projectName} 
        />
        
        {/* Lead Capture Engine */}
        <LeadPopup />

        {/* Portal target for modals/popups */}
        <div id="modal-root" />
        
      </body>
    </html>
  );
}