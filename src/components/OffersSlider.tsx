import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Gift, Percent } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  bgGradient: string;
  icon: React.ReactNode;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Combo Special",
    description: "Buy any 2 dry fruits and get instant discount",
    discount: "20% OFF",
    bgGradient: "bg-gradient-warm",
    icon: <Gift className="h-6 w-6" />
  },
  {
    id: "2", 
    title: "Festival Bonanza",
    description: "Special discount on premium nuts collection",
    discount: "15% OFF",
    bgGradient: "bg-gradient-golden",
    icon: <Percent className="h-6 w-6" />
  },
  {
    id: "3",
    title: "Bulk Purchase",
    description: "Order above ₹2000 and save big on your purchase",
    discount: "25% OFF",
    bgGradient: "bg-gradient-fresh",
    icon: <Gift className="h-6 w-6" />
  }
];

const OffersSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-warm">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {offers.map((offer, index) => (
                <div key={offer.id} className="w-full flex-shrink-0">
                  <div className={`${offer.bgGradient} p-8 text-primary-foreground relative overflow-hidden`}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary-foreground/20 rounded-full">
                            {offer.icon}
                          </div>
                          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                            Limited Time
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{offer.discount}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                      <p className="text-primary-foreground/90 mb-6 text-lg">
                        {offer.description}
                      </p>
                      
                      <Button 
                        variant="secondary" 
                        size="lg"
                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Shop Now
                      </Button>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-12 -translate-x-12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-primary scale-110" 
                    : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSlider;