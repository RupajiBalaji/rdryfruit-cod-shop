import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 6309553911", "+91 9876543210"],
      action: "Call us now"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@rdryfruitmart.com", "orders@rdryfruitmart.com"],
      action: "Send email"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Market Street", "Hyderabad, Telangana 500001"],
      action: "Get directions"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
      action: "Visit us"
    }
  ];

  return (
    <section id="contact" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need assistance with your order? 
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground mb-1">{detail}</p>
                      ))}
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                        {info.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-border shadow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name
                      </label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name
                      </label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </label>
                    <Input placeholder="What is this regarding?" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                  
                  <Button className="w-full bg-gradient-warm hover:opacity-90 text-primary-foreground">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-12 bg-card rounded-lg p-8 shadow-card text-center">
          <h3 className="text-xl font-bold text-primary mb-4">Visit Our Store</h3>
          <p className="text-muted-foreground mb-4">
            Come visit our physical store to see and taste our premium collection of dry fruits. 
            Our experienced staff will be happy to help you choose the best products for your needs.
          </p>
          <div className="bg-muted rounded-lg p-6 text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Store Location</p>
            <p>123 Market Street, Hyderabad, Telangana 500001</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;