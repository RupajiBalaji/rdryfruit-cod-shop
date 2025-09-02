import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Timer, Gift } from "lucide-react";

interface TopOffer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  originalPrice: string;
  salePrice: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
  urgency: string;
}

const topOffers: TopOffer[] = [
  {
    id: "1",
    title: "MEGA DIWALI SALE",
    subtitle: "Premium Dry Fruits Collection",
    discount: "UPTO 40% OFF",
    originalPrice: "₹2,500",
    salePrice: "₹1,499",
    bgColor: "bg-gradient-to-r from-orange-600 to-red-600",
    textColor: "text-white",
    icon: <Gift className="h-6 w-6" />,
    urgency: "Ends in 2 Days!"
  },
  {
    id: "2", 
    title: "COMBO BONANZA",
    subtitle: "Buy 2 Get 1 FREE",
    discount: "SAVE 33%",
    originalPrice: "₹1,800",
    salePrice: "₹1,200",
    bgColor: "bg-gradient-to-r from-green-600 to-emerald-600",
    textColor: "text-white",
    icon: <Star className="h-6 w-6" />,
    urgency: "Limited Stock!"
  },
  {
    id: "3",
    title: "FIRST ORDER SPECIAL", 
    subtitle: "New Customer Exclusive",
    discount: "FLAT 25% OFF",
    originalPrice: "₹2,000",
    salePrice: "₹1,500",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    textColor: "text-white",
    icon: <Timer className="h-6 w-6" />,
    urgency: "Today Only!"
  }
];

const TopOffersSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topOffers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topOffers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topOffers.length) % topOffers.length);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {topOffers.map((offer) => (
          <div key={offer.id} className="w-full flex-shrink-0">
            <div className={`${offer.bgColor} ${offer.textColor} py-4 px-4 relative overflow-hidden`}>
              <div className="container mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                      {offer.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-bold">{offer.title}</h3>
                        <Badge variant="secondary" className="bg-white/20 text-current border-white/30 text-xs">
                          {offer.urgency}
                        </Badge>
                      </div>
                      <p className="text-sm opacity-90">{offer.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold mb-1">{offer.discount}</div>
                    <div className="text-xs sm:text-sm">
                      <span className="line-through opacity-75 mr-2">{offer.originalPrice}</span>
                      <span className="font-bold">{offer.salePrice}</span>
                    </div>
                  </div>

                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold hidden sm:flex"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Shop Now
                  </Button>
                </div>

                {/* Mobile Shop Now Button */}
                <div className="sm:hidden mt-3 text-center">
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold"
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
        {topOffers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TopOffersSlider;