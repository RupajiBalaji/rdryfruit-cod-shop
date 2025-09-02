import { useState } from "react";
import { Product, CustomerDetails } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CreditCard, MapPin, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import InvoiceModal from "./InvoiceModal";

interface CheckoutFormProps {
  product: Product;
  selectedWeight: "250g" | "500g" | "1kg";
  selectedPrice: number;
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

const CheckoutForm = ({ product, selectedWeight, selectedPrice, isOpen, onClose, onBack }: CheckoutFormProps) => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    mobile: "",
    address: ""
  });
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return customerDetails.name.trim() !== "" &&
           customerDetails.mobile.trim() !== "" &&
           customerDetails.address.trim() !== "" &&
           customerDetails.mobile.match(/^[0-9]{10}$/);
  };

  const handleConfirmOrder = () => {
    if (!isFormValid()) {
      toast({
        title: "Invalid Details",
        description: "Please fill in all fields correctly",
        variant: "destructive"
      });
      return;
    }

    // Generate order ID
    const newOrderId = `RDF${Date.now()}`;
    setOrderId(newOrderId);
    
    // Save order to localStorage (in real app, this would be sent to backend)
    const order = {
      id: newOrderId,
      customer: customerDetails,
      items: [{
        product,
        quantity: selectedWeight,
        price: selectedPrice
      }],
      total: selectedPrice,
      date: new Date(),
      status: "pending"
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setShowInvoice(true);
    
    toast({
      title: "Order Confirmed!",
      description: `Your order #${newOrderId} has been placed successfully`,
      variant: "default"
    });
  };

  if (showInvoice) {
    return (
      <InvoiceModal
        orderId={orderId}
        customer={customerDetails}
        product={product}
        selectedWeight={selectedWeight}
        selectedPrice={selectedPrice}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl text-primary">Order Details</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-accent/20 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
            <div className="flex justify-between items-center mb-1">
              <span>{product.name}</span>
              <span>{selectedWeight}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-primary">
              <span>Total:</span>
              <span>₹{selectedPrice}</span>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={customerDetails.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Mobile Number
              </Label>
              <Input
                id="mobile"
                placeholder="Enter 10-digit mobile number"
                value={customerDetails.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                maxLength={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Delivery Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your complete address"
                value={customerDetails.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Payment Method</h4>
                <p className="text-sm text-muted-foreground">Cash on Delivery (COD)</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleConfirmOrder}
            disabled={!isFormValid()}
            className="w-full"
            size="lg"
            variant="success"
          >
            Confirm Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;