import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Heritage from "@/components/Heritage";
import Craft from "@/components/Craft";
import Collection from "@/components/Collection";
import ArtisanSpotlight from "@/components/ArtisanSpotlight";
import Palette from "@/components/Palette";
import Testimonials from "@/components/Testimonials";
import Journal from "@/components/Journal";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Heritage />
        <Craft />
        <Collection />
        <ArtisanSpotlight />
        <Palette />
        <Testimonials />
        <Journal />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
