import { Product } from "@/types/product";
import almondsImg from "@/assets/products/almonds.jpg";
import walnutsImg from "@/assets/products/walnuts.jpg";
import cashewsImg from "@/assets/products/cashews.jpg";
import pistachiosImg from "@/assets/products/pistachios.jpg";
import datesImg from "@/assets/products/dates.jpg";
import apricotsImg from "@/assets/products/apricots.jpg";
import raisinsImg from "@/assets/products/raisins.jpg";
import mixedDryFruitsImg from "@/assets/products/mixed-dry-fruits.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Almonds",
    image: almondsImg,
    description: "Fresh California almonds, rich in vitamin E and healthy fats",
    isAvailable: true,
    prices: {
      "250g": 450,
      "500g": 850,
      "1kg": 1600
    },
    category: "nuts"
  },
  {
    id: "2",
    name: "Kashmir Walnuts",
    image: walnutsImg,
    description: "Premium quality Kashmir walnuts, perfect for brain health",
    isAvailable: true,
    prices: {
      "250g": 650,
      "500g": 1250,
      "1kg": 2400
    },
    category: "nuts"
  },
  {
    id: "3",
    name: "Roasted Cashews",
    image: cashewsImg,
    description: "Crispy roasted cashews, lightly salted for perfect taste",
    isAvailable: false,
    prices: {
      "250g": 550,
      "500g": 1050,
      "1kg": 2000
    },
    category: "nuts"
  },
  {
    id: "4",
    name: "Iranian Pistachios",
    image: pistachiosImg,
    description: "Premium Iranian pistachios, naturally opened and salted",
    isAvailable: true,
    prices: {
      "250g": 750,
      "500g": 1450,
      "1kg": 2800
    },
    category: "nuts"
  },
  {
    id: "5",
    name: "Medjool Dates",
    image: datesImg,
    description: "King of dates - large, soft, and incredibly sweet",
    isAvailable: true,
    prices: {
      "250g": 350,
      "500g": 650,
      "1kg": 1200
    },
    category: "dates"
  },
  {
    id: "6",
    name: "Turkish Apricots",
    image: apricotsImg,
    description: "Sun-dried Turkish apricots, naturally sweet and chewy",
    isAvailable: true,
    prices: {
      "250g": 300,
      "500g": 550,
      "1kg": 1000
    },
    category: "dried-fruits"
  },
  {
    id: "7",
    name: "Golden Raisins",
    image: raisinsImg,
    description: "Sweet golden raisins, perfect for snacking and baking",
    isAvailable: false,
    prices: {
      "250g": 200,
      "500g": 380,
      "1kg": 700
    },
    category: "dried-fruits"
  },
  {
    id: "8",
    name: "Mixed Dry Fruits",
    image: mixedDryFruitsImg,
    description: "Premium mix of almonds, cashews, raisins, and dates",
    isAvailable: true,
    prices: {
      "250g": 500,
      "500g": 950,
      "1kg": 1800
    },
    category: "nuts"
  }
];