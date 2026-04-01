export interface AmenityItem {
  name: string;
  image: string;
}

export interface AmenityCategory {
  category: string;
  // Updated to support both simple strings and rich objects with images
  items: (string | AmenityItem)[]; 
}

export interface ProjectConfig {
  projectName: string;
  brandLogo: string;
  googleAds: {
    conversionId: string;
    conversionLabel: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bgImage: string;
    ctaText: string;
    brochureUrl: string;
  };
  heroHighlights: { label: string; value: string }[];
  usp: { title: string; subtitle: string }[];
  projectHighlights: string[];
  inventory: { configuration: string; carpetArea: string; price: string }[];
  about: {
    title: string;
    content: string;
    image: string;
  };
  categorizedAmenities: AmenityCategory[]; 
  amenities: { image?: string; icon?: string; title: string }[]; 
  gallery: {
    amenities: string[];
    exterior: string[];
    layout: string[];
  };
  walkthroughVideoId: string;
  locationAdvantages: { 
    place: string; 
    distance: string; 
    image: string; 
  }[];
  rera: {
    registrationNumber: string;
    qrCode: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    googleMapEmbedUrl: string;
  };
}

export const PROJECT_DATA: ProjectConfig = {
  projectName: "Rohan Abhilasha",
  brandLogo: "/assets/logo.avif",
  
  googleAds: {
    conversionId: "AW-123456789", 
    conversionLabel: "AbCdEfGhIjKlMnOpQrSt",
  },

  hero: {
    title: "The Art of Modern Living",
    subtitle: "Premium 1 | 2 & 3 BHK Homes in Wagholi, Pune",
    bgImage: "/assets/hero-architecture.avif",
    ctaText: "Download Brochure",
    brochureUrl: "/assets/brochure/brochure.pdf"
  },

  heroHighlights: [
    { label: "Location", value: "Wagholi, Pune" },
    { label: "EMI", value: "No EMI till Possession" },
    { label: "Configuration", value: "1 | 2 & 3 BHK" },
    { label: "Land Parcel", value: "7.6 Acres" },
  ],

  usp: [
    { title: "Biggest Launch of Pune", subtitle: "A 30-Acre Integrated Township" },
    { title: "European Design", subtitle: "Crafted by International Architects" },
    { title: "Plus Home Philosophy", subtitle: "Ventilation, Light, and Privacy" },
  ],

  projectHighlights: [
    "11 High-Rise Towers", 
    "25+ Premium Amenities", 
    "24*7 Electricity Backups Inside Flat", 
    "24*7 Water (No Tanker Dependency)"
  ],

  inventory: [
    { configuration: "1 BHK Luxury", carpetArea: "425 - 530 Sq.Ft.", price: "52 Lacs*" },
    { configuration: "2 BHK Premium", carpetArea: "650 - 800 Sq.Ft.", price: "73.5 Lacs*" },
    { configuration: "3 BHK Grande", carpetArea: "1065 Sq.Ft.", price: "1.12 Cr*" },
  ],

  about: {
    title: "Where Your Future Finds Its Perfect Address",
    content: "Rohan Abhilasha 4 is designed for those who seek more than just a home — a space that evolves with their lifestyle, offering comfort, connection, and lasting value.",
    image: "/assets/exterior-1.avif",
  },

  categorizedAmenities: [
    {
      category: "Clubhouse & Lifestyle",
      items: [
        { name: "Well equipped gymnasium", image: "/assets/gymnasium.avif" },
        { name: "Swimming pool with deck", image: "/assets/Swimming.avif" },
        { name: "Well furnished guest room", image: "/assets/project-2.avif" },
        { name: "Co-working space / library", image: "/assets/project-3.avif" },
        "Multipurpose hall with pantry provision",
        "Indoor games area",
        "Crèche",
        "Yoga room",
        "Hobby room",
        "Double height entry ways"
      ]
    },
    {
      category: "Landscape & Outdoors",
      items: [
        { name: "Pets zone", image: "/assets/Pets.avif" },
        { name: "Themed garden", image: "/assets/Theme.avif" },
        { name: "Kids play area", image: "/assets/play.avif" },
        { name: "Banyan tree court", image: "/assets/BanyanTree.avif" },
        { name: "Outdoor fitness area", image: "/assets/fitnessArea.avif" },
        { name: "Yoga / meditation lawn with deck", image: "/assets/meditation.avif" },
        { name: "Garden walk", image: "/assets/GardenWalk.avif" },
        { name: "Barbeque area", image: "/assets/Barbeque.avif" },
        { name: "Meet & greet lounge", image: "/assets/Meet.avif" },
        { name: "Tree groves with seaters", image: "/assets/Treegroves.avif" },
        { name: "Sculpture court", image: "/assets/Sculpture.avif" },
        { name: "Internal courtyards with seaters", image: "/assets/Internalcourtyards.avif" },
        { name: "Reflexology path", image: "/assets/Reflexology.avif" },
        { name: "Seating alcoves", image: "/assets/Seatingalcoves.avif" },
        { name: "Palm tree court", image: "/assets/PalmTree.avif" }
      ]
    },
    {
      category: "Sports Facilities",
      items: [
        { name: "Badminton court", image: "/assets/Badminton.avif" },
        { name: "Squash court", image: "/assets/SquashCourt.avif" },
        { name: "Multipurpose court", image: "/assets/MultipurposeCourt.avif" }
      ]
    },
    {
      category: "Infrastructure & Services",
      items: [
        { name: "Sewage treatment plant", image: "/assets/Sewage.avif" },
        { name: "Organic waste composting", image: "/assets/OrganicWaste.avif" },
        { name: "DG back up for services & common areas", image: "/assets/DG_back.avif" },
        { name: "Solar powered common area lighting", image: "/assets/Solar.avif" },
        { name: "CCTV in select common areas", image: "/assets/CCTV.avif" },
        { name: "Sanitation facilities for staff", image: "/assets/Sanitation.avif" },
        { name: "Adequate branded elevators", image: "/assets/elevators.avif" },
        { name: "Fire fighting systems", image: "/assets/Fire.avif" }
      ]
    }
  ],

  amenities: [
    { image: "/assets/gymnasium.avif", title: "Well equipped gymnasium" },
    { image: "/assets/Swimming.avif", title: "Swimming pool with deck" },
    { image: "/assets/Pets.avif", title: "Pets zone" },
    { image: "/assets/Badminton.avif", title: "Badminton court" },
  ],

  gallery: {
    amenities: ["/assets/Pets.avif", "/assets/Theme.avif", "/assets/play.avif", "/assets/fitnessArea.avif", "/assets/Badminton.avif"],
    exterior: ["/assets/exterior-1.avif", "/assets/exterior-2.avif", "/assets/exterior-3.avif", "/assets/exterior-4.avif", "/assets/exterior-5.avif"],
    layout: ["/assets/layout.avif"],
  },

  walkthroughVideoId: "dQw4w9WgXcQ",

  locationAdvantages: [
    { place: "EON IT Park", distance: "12 Mins", image: "/assets/location/eon-it.avif" },
    { place: "World Trade Center", distance: "10 Mins", image: "/assets/location/wtc.avif" },
    { place: "Phoenix Marketcity", distance: "15 Mins", image: "/assets/location/phoenix.avif" },
    { place: "Pune Airport", distance: "20 Mins", image: "/assets/location/airport.avif" },
  ],

  rera: {
    registrationNumber: "P52100080076",
    qrCode: "/assets/rera-qr.avif",
  },

  contact: {
    phone: "+91 8208108473",
    email: "accesslysolution@gmail.com",
    address: "Rohan Abhilasha 4, Wagholi, Pune-Nagar Road, Pune 412207",
    googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
  },
};