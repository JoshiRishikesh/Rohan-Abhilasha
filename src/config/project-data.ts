export interface AmenityCategory {
  category: string;
  items: string[];
}

export interface ProjectConfig {
  projectName: string;
  brandLogo: string;
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
  // Updated to handle categorized lists
  categorizedAmenities: AmenityCategory[]; 
  // Kept for featured icons/images
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
    content: "Rohan Abhilasha 4 is designed for those who seek more than just a home — a space that evolves with their lifestyle, offering comfort, connection, and lasting value.Experience thoughtfully crafted residences surrounded by open courtyards, serene walkways, and vibrant community spaces that bring everyday living to life.With a perfect balance of privacy and openness, every home is built to adapt to your future — whether it’s growing families, changing needs, or new aspirations.Now is the time to invest in a home that grows with you.",
    image: "/assets/project-2.avif",
  },

  // Full List of Amenities Categorized
  categorizedAmenities: [
    {
      category: "Clubhouse & Lifestyle",
      items: [
        "Multipurpose hall with pantry provision",
        "Indoor games area",
        "Well equipped gymnasium",
        "Swimming pool with deck",
        "Crèche",
        "Well furnished guest room",
        "Yoga room",
        "Co-working space / library",
        "Hobby room",
        "Double height entry ways"
      ]
    },
    {
      category: "Landscape & Outdoors",
      items: [
        "Banyan tree court",
        "Pets zone",
        "Outdoor fitness area",
        "Themed garden",
        "Kids play area",
        "Yoga / meditation lawn with deck",
        "Multipurpose lawn",
        "Garden walk",
        "Barbeque area",
        "Meet & greet lounge",
        "Tree groves with seaters",
        "Sculpture court",
        "Internal courtyards with seaters",
        "Reflexology path",
        "Seating alcoves",
        "Palm tree court"
      ]
    },
    {
      category: "Sports Facilities",
      items: [
        "Squash court",
        "Badminton court",
        "Multipurpose court"
      ]
    },
    {
      category: "Infrastructure & Services",
      items: [
        "Sewage treatment plant",
        "Organic waste composting",
        "DG back up for services & common areas",
        "Solar powered common area lighting",
        "CCTV in select common areas",
        "Sanitation facilities for staff",
        "Adequate branded elevators",
        "Fire fighting systems"
      ]
    }
  ],

  // Featured Amenities (Used for visual sections)
  amenities: [
    { image: "/assets/gymnasium.avif", title: "Well equipped gymnasium" },
    { image: "/assets/Swimming.avif", title: "Swimming pool with deck" },
    { image: "/assets/Pets.avif", title: "Pets zone" },
    { image: "/assets/Badminton.avif", title: "Badminton court" },
  ],

  gallery: {
    amenities: ["/gallery/amen-1.jpg", "/gallery/amen-2.jpg"],
    exterior: ["/gallery/ext-1.jpg", "/gallery/ext-2.jpg"],
    layout: ["/gallery/plan-1.jpg"],
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