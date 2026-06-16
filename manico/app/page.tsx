import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhySection } from "@/components/home/WhySection";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <TrustBar />
        <FeaturedProducts />
        <WhySection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
