import { useState } from "react";
import { Product } from "@/types/product";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const categories = [
    { id: "all", name: "All Products" },
    { id: "nuts", name: "Nuts" },
    { id: "dried-fruits", name: "Dried Fruits" },
    { id: "dates", name: "Dates" },
    { id: "seeds", name: "Seeds" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="products" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Premium Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked selection of the finest dry fruits, nuts, and dates from around the world
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-warm"
                  : "bg-card text-foreground hover:bg-accent border border-border"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-up"
            >
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProductsSection;