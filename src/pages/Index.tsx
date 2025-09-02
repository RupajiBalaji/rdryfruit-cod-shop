import Header from "@/components/Header";
import TopOffersSlider from "@/components/TopOffersSlider";
import Hero from "@/components/Hero";
import OffersSlider from "@/components/OffersSlider";
import ProductsSection from "@/components/ProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TopOffersSlider />
      <Hero />
      <OffersSlider />
      <ProductsSection />
    </div>
  );
};

export default Index;