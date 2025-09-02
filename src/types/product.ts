export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  isAvailable: boolean;
  prices: {
    "250g": number;
    "500g": number;
    "1kg": number;
  };
  nutritionalInfo?: string;
  category: "nuts" | "dried-fruits" | "seeds" | "dates";
}

export interface CartItem {
  product: Product;
  quantity: "250g" | "500g" | "1kg";
  price: number;
}

export interface CustomerDetails {
  name: string;
  mobile: string;
  address: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  date: Date;
  status: "pending" | "confirmed" | "delivered";
}