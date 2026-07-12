import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhySection } from "@/components/home/WhySection";
import { WhyMushrooms } from "@/components/home/WhyMushrooms";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteSection } from "@/components/home/QuoteSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <TrustBar />
        <FeaturedProducts />
        <WhySection />
        <WhyMushrooms />
        <Testimonials />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
