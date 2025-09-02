import { useState } from "react";
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ShoppingCart } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [selectedWeight, setSelectedWeight] = useState<"250g" | "500g" | "1kg">("250g");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleProceed = () => {
    setShowCheckout(true);
  };

  const handleBackToProduct = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    return (
      <CheckoutForm
        product={product}
        selectedWeight={selectedWeight}
        selectedPrice={product.prices[selectedWeight]}
        isOpen={isOpen}
        onClose={onClose}
        onBack={handleBackToProduct}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary flex items-center justify-between">
            {product.name}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
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

          <div className="space-y-4">
            <p className="text-muted-foreground text-lg">{product.description}</p>
            
            {product.isAvailable && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Select Quantity:</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(product.prices).map(([weight, price]) => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight as "250g" | "500g" | "1kg")}
                        className={`p-4 rounded-lg text-center border-2 transition-all duration-300 ${
                          selectedWeight === weight
                            ? "border-primary bg-primary/10 shadow-warm"
                            : "border-border hover:border-accent bg-card"
                        }`}
                      >
                        <div className="font-semibold text-lg">{weight}</div>
                        <div className="text-2xl font-bold text-primary">₹{price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium">Selected:</span>
                    <span className="text-lg">{selectedWeight}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Total Price:</span>
                    <span className="text-3xl font-bold text-primary">
                      ₹{product.prices[selectedWeight]}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleProceed}
                  className="w-full"
                  size="lg"
                  variant="golden"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Proceed to Order
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;