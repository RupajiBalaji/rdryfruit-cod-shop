import { Product, CustomerDetails } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, X } from "lucide-react";

interface InvoiceModalProps {
  orderId: string;
  customer: CustomerDetails;
  product: Product;
  selectedWeight: "250g" | "500g" | "1kg";
  selectedPrice: number;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal = ({ 
  orderId, 
  customer, 
  product, 
  selectedWeight, 
  selectedPrice, 
  isOpen, 
  onClose 
}: InvoiceModalProps) => {
  const currentDate = new Date().toLocaleDateString("en-IN");

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const invoiceData = {
      orderId,
      customer,
      product: {
        name: product.name,
        weight: selectedWeight,
        price: selectedPrice
      },
      date: currentDate,
      total: selectedPrice
    };
    
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${orderId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-primary">Invoice Generated</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Success Message */}
          <div className="text-center bg-success/10 p-6 rounded-lg">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h3 className="text-xl font-bold text-success mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground">
              Your order has been placed successfully and will be delivered soon.
            </p>
          </div>

          {/* Invoice Details */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="text-center border-b border-border pb-4">
              <h2 className="text-2xl font-bold text-primary">R Dry Fruit Mart</h2>
              <p className="text-sm text-muted-foreground">Where Quality Matters</p>
              <p className="text-xs text-muted-foreground mt-1">Invoice</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Order ID:</p>
                <p className="text-primary font-mono">{orderId}</p>
              </div>
              <div>
                <p className="font-semibold">Date:</p>
                <p>{currentDate}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold mb-2">Customer Details:</h4>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Name:</span> {customer.name}</p>
                <p><span className="font-medium">Mobile:</span> {customer.mobile}</p>
                <p><span className="font-medium">Address:</span> {customer.address}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold mb-2">Order Details:</h4>
              <div className="bg-muted/50 p-3 rounded">
                <div className="flex justify-between items-center mb-1">
                  <span>{product.name}</span>
                  <span className="font-medium">{selectedWeight}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-primary">
                  <span>Total Amount:</span>
                  <span>₹{selectedPrice}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="bg-warning/10 p-3 rounded text-sm">
                <p className="font-semibold text-warning-foreground">Payment Method:</p>
                <p className="text-warning-foreground">Cash on Delivery (COD)</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              onClick={onClose}
              variant="golden"
              className="flex-1"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;