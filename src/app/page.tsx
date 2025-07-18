import { Footer } from "@/components/Footer";
import { HeroHighlightMain } from "@/components/HeroHighlightMain";
import { HomePage } from "@/components/HomePage";
import { NavbarMain } from "@/components/NavbarMain";

export default function Home() {
  return (
    <>
    <div className="bg-neutral-950 text-white">
  
      <NavbarMain />
      {/* <HeroHighlightMain />   */}
      {/* <HomePage /> */}
    
      <Footer />
    </div>
    </>
  );
}
