import { Users, Award, Truck, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest dry fruits from trusted suppliers worldwide"
    },
    {
      icon: Shield,
      title: "100% Natural",
      description: "No artificial preservatives or additives, just pure natural goodness"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and secure delivery to your doorstep across the country"
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Over 10,000+ satisfied customers trust us for their dry fruit needs"
    }
  ];

  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            About R Dry Fruit Mart
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            For over a decade, we've been committed to bringing you the finest selection of 
            premium dry fruits, nuts, and healthy snacks. Our passion for quality and 
            customer satisfaction has made us a trusted name in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-lg p-8 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Story</h3>
              <p className="text-muted-foreground mb-4">
                Started in 2013 as a small family business, R Dry Fruit Mart has grown into 
                one of the most trusted names in premium dry fruits and nuts. We believe in 
                the power of natural nutrition and the importance of quality in every product we offer.
              </p>
              <p className="text-muted-foreground">
                Our commitment to excellence has earned us the trust of thousands of customers 
                who rely on us for their daily nutritional needs. From carefully selected almonds 
                to the finest dates, every product reflects our dedication to quality.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">10+</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Years of Experience</h4>
                  <p className="text-sm text-muted-foreground">Serving customers since 2013</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">50+</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Product Varieties</h4>
                  <p className="text-sm text-muted-foreground">Wide range of premium dry fruits</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">10K+</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Happy Customers</h4>
                  <p className="text-sm text-muted-foreground">Satisfied customers nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;