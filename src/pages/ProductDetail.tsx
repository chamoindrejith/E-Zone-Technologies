import { motion } from "framer-motion";
import { ArrowLeft, Package, Weight, Layers, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// =====================================================
// PRODUCT DETAIL PAGE
//
// To connect with a real API:
//
//   import { useQuery } from "@tanstack/react-query";
//
//   const { data: product, isLoading } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await fetch(`https://your-api.com/api/products/${id}`);
//       return res.json();
//     },
//   });
//
// =====================================================

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  weight: string;
  category: string;
  images: string[];
  description: string;
}

// Dummy products (same as Technologies page — share via a data file in production)
const dummyProducts: Product[] = [
  { id: "1", name: "Redragon K552 Mechanical Keyboard", quantity: 25, price: 12500, weight: "850g", category: "Peripherals", images: ["/placeholder.svg"], description: "Compact 87-key mechanical gaming keyboard with RGB backlighting and dust-proof red switches." },
  { id: "2", name: "HP LaserJet Pro MFP M428fdw", quantity: 8, price: 95000, weight: "13.5kg", category: "Printers", images: ["/placeholder.svg"], description: "All-in-one monochrome laser printer with wireless connectivity, duplex printing and scanning." },
  { id: "3", name: "Hikvision 4CH CCTV Package", quantity: 15, price: 45000, weight: "5kg", category: "CCTV & Security", images: ["/placeholder.svg"], description: "Complete 4-channel CCTV package with 2MP cameras, DVR, and 1TB hard drive included." },
  { id: "4", name: "Lenovo ThinkPad E14 Gen 5", quantity: 5, price: 285000, weight: "1.64kg", category: "Laptops", images: ["/placeholder.svg"], description: "14-inch business laptop with Intel i5 13th Gen, 8GB RAM, 512GB SSD and Windows 11 Pro." },
  { id: "5", name: "TP-Link Archer AX73 Router", quantity: 20, price: 28000, weight: "700g", category: "Networking", images: ["/placeholder.svg"], description: "AX5400 Dual-Band Wi-Fi 6 Router with Gigabit ports, OFDMA and 6 antennas for wide coverage." },
  { id: "6", name: "APC Back-UPS 1100VA", quantity: 30, price: 32000, weight: "7.5kg", category: "UPS & Power", images: ["/placeholder.svg"], description: "1100VA/660W UPS with AVR, 6 outlets, and USB charging ports. Battery backup for computers." },
  { id: "7", name: "Kingston 16GB DDR4 RAM", quantity: 50, price: 8500, weight: "50g", category: "Components", images: ["/placeholder.svg"], description: "16GB DDR4 3200MHz desktop memory module. Plug and play with automatic overclocking." },
  { id: "8", name: "Redragon M711 Cobra Mouse", quantity: 40, price: 4500, weight: "150g", category: "Peripherals", images: ["/placeholder.svg"], description: "Ergonomic RGB gaming mouse with 10,000 DPI sensor, 7 programmable buttons." },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  // Replace with API fetch in production
  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-24 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/technologies" className="text-primary hover:underline">
              ← Back to Products
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-24 px-6">
        <div className="container mx-auto">
          <Link to="/technologies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-2xl bg-card border border-glow overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg border overflow-hidden transition-all ${
                        selectedImage === i ? "border-primary shadow-glow" : "border-glow opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono text-primary uppercase tracking-wider">{product.category}</span>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

              <div className="text-3xl font-bold text-foreground mb-8">
                LKR {product.price.toLocaleString()}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-card border border-glow text-center">
                  <Package size={20} className="mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground block">Stock</span>
                  <span className="text-sm font-bold text-foreground">{product.quantity} units</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-glow text-center">
                  <Weight size={20} className="mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground block">Weight</span>
                  <span className="text-sm font-bold text-foreground">{product.weight}</span>
                </div>
                <div className="p-4 rounded-xl bg-card border border-glow text-center">
                  <Layers size={20} className="mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground block">Category</span>
                  <span className="text-sm font-bold text-foreground">{product.category}</span>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 text-sm font-semibold mb-6 ${product.quantity > 0 ? "text-green-400" : "text-destructive"}`}>
                <span className={`w-2 h-2 rounded-full ${product.quantity > 0 ? "bg-green-400" : "bg-destructive"}`} />
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </div>

              {/* 
                To add to cart or redirect to external product page:
                onClick={() => window.open(`https://your-api.com/product/${product.id}`, '_blank')}
              */}
              <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow">
                <ShoppingCart size={20} /> Contact for Purchase
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
