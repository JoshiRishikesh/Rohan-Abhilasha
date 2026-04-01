import { PROJECT_DATA } from "@/config/project-data";
import Hero from "@/components/sections/Hero";
import USPHooks from "@/components/sections/USPHooks";
import ProjectHighlights from "@/components/sections/ProjectHighlights";
import About from "@/components/sections/About";
import Inventory from "@/components/sections/Inventory";
import Amenities from "@/components/sections/Amenities";
import LocationAdvantage from "@/components/sections/LocationAdvantage";
import Walkthrough from "@/components/sections/Walkthrough";
import Footer from "@/components/sections/Footer";
import AmenitiesSection from "@/components/sections/AmenitiesSection";
import Gallery from "@/components/sections/Gallery";

export default function Home() {
  return (
    <>
      <div id="hero"><Hero data={PROJECT_DATA.hero} highlights={PROJECT_DATA.heroHighlights} /></div>
      <ProjectHighlights data={PROJECT_DATA.projectHighlights} />
      <div id="amenities"><Amenities data={PROJECT_DATA.amenities} /></div>
      <div id="inventory"><Inventory data={PROJECT_DATA.inventory} /></div>
      <div id="gallery"><AmenitiesSection data={PROJECT_DATA.categorizedAmenities} /></div>
      <USPHooks data={PROJECT_DATA.usp} />
      <Gallery data={PROJECT_DATA.gallery} />      
      <LocationAdvantage data={PROJECT_DATA.locationAdvantages}/>
      <About data={PROJECT_DATA.about} projectName={PROJECT_DATA.projectName} />
      <Walkthrough videoId={PROJECT_DATA.walkthroughVideoId} />
      <Footer config={PROJECT_DATA} />
      
    </>
  );
}