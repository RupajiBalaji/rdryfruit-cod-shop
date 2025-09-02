import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dry-fruits.jpg";

const Hero = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-primary-foreground px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Premium Quality
          <span className="block text-4xl md:text-6xl text-secondary">
            Dry Fruits
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Where Quality Matters - Fresh, Natural, and Handpicked for Your Health
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="golden" 
            size="lg"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop Now
          </Button>
          <Button variant="outline" size="lg" className="bg-card/20 border-primary-foreground text-primary-foreground hover:bg-card">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;