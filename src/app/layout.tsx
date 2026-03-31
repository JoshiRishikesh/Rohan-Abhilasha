import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script"; // Optimized Next.js Script component
import { PROJECT_DATA } from "@/config/project-data";
import WhatsAppButton from "@/components/WhatsAppButton";
import LeadPopup from "@/components/sections/LeadPopup";
import CallButton from "@/components/CallButton";
import Navbar from "@/components/Navbar";
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
  // Pulling the ID directly from your new config variable
  const GADS_ID = PROJECT_DATA.googleAds.conversionId;

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} scroll-smooth`}>
      <head>
        {/* 1. Global Site Tag (gtag.js) - Google Ads */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
          strategy="afterInteractive"
        />
        
        {/* 2. Google Ads Initialization Script */}
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GADS_ID}');
          `}
        </Script>
      </head>
      <body className="antialiased bg-white text-slate-900 selection:bg-primary selection:text-white font-sans">
        
        {/* Global Navigation */}
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