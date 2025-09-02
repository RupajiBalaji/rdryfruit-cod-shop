import { useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [selectedWeight, setSelectedWeight] = useState<"250g" | "500g" | "1kg">("250g");

  const handleAddToCart = () => {
    if (product.isAvailable) {
      onAddToCart(product);
    }
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1 bg-card border-border animate-slide-up">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            {product.isAvailable ? (
              <Badge variant="default" className="bg-success text-success-foreground">
                Available
              </Badge>
            ) : (
              <Badge variant="destructive">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {product.isAvailable && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(product.prices).map(([weight, price]) => (
                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight as "250g" | "500g" | "1kg")}
                  className={`p-2 rounded-md text-sm font-medium transition-all ${
                    selectedWeight === weight
                      ? "bg-primary text-primary-foreground shadow-warm"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <span className="text-2xl font-bold text-primary">
                ₹{product.prices[selectedWeight]}
              </span>
              <span className="text-muted-foreground ml-1">/{selectedWeight}</span>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          className="w-full"
          variant={product.isAvailable ? "default" : "outline"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.isAvailable ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;