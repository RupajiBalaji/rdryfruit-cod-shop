import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OffersSlider from "@/components/OffersSlider";
import ProductsSection from "@/components/ProductsSection";
import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <OffersSlider />
      <ProductsSection />
      <AboutUs />
      <Contact />
    </div>
  );
};

export default Index;