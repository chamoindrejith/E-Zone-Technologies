import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// =====================================================
// DUMMY PRODUCTS - Replace with API integration
// 
// To connect with a real API:
// 1. Install a data fetching library (already have @tanstack/react-query)
// 2. Replace the `dummyProducts` array with an API call:
//
//    import { useQuery } from "@tanstack/react-query";
//
//    const { data: products, isLoading } = useQuery({
//      queryKey: ["products"],
//      queryFn: async () => {
//        const res = await fetch("https://your-api.com/api/products");
//        return res.json();
//      },
//    });
//
// 3. Each product from the API should have:
//    - id: string
//    - name: string
//    - quantity: number
//    - price: number
//    - weight: string
//    - category: string
//    - images: string[] (array of image URLs)
//    - description: string
//
// 4. For product detail page, navigate to /technologies/:id
//    and fetch: GET https://your-api.com/api/products/:id
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

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Redragon K552 Mechanical Keyboard",
    quantity: 25,
    price: 12500,
    weight: "850g",
    category: "Peripherals",
    images: ["/placeholder.svg"],
    description: "Compact 87-key mechanical gaming keyboard with RGB backlighting and dust-proof red switches.",
  },
  {
    id: "2",
    name: "HP LaserJet Pro MFP M428fdw",
    quantity: 8,
    price: 95000,
    weight: "13.5kg",
    category: "Printers",
    images: ["/placeholder.svg"],
    description: "All-in-one monochrome laser printer with wireless connectivity, duplex printing and scanning.",
  },
  {
    id: "3",
    name: "Hikvision 4CH CCTV Package",
    quantity: 15,
    price: 45000,
    weight: "5kg",
    category: "CCTV & Security",
    images: ["/placeholder.svg"],
    description: "Complete 4-channel CCTV package with 2MP cameras, DVR, and 1TB hard drive included.",
  },
  {
    id: "4",
    name: "Lenovo ThinkPad E14 Gen 5",
    quantity: 5,
    price: 285000,
    weight: "1.64kg",
    category: "Laptops",
    images: ["/placeholder.svg"],
    description: "14-inch business laptop with Intel i5 13th Gen, 8GB RAM, 512GB SSD and Windows 11 Pro.",
  },
  {
    id: "5",
    name: "TP-Link Archer AX73 Router",
    quantity: 20,
    price: 28000,
    weight: "700g",
    category: "Networking",
    images: ["/placeholder.svg"],
    description: "AX5400 Dual-Band Wi-Fi 6 Router with Gigabit ports, OFDMA and 6 antennas for wide coverage.",
  },
  {
    id: "6",
    name: "APC Back-UPS 1100VA",
    quantity: 30,
    price: 32000,
    weight: "7.5kg",
    category: "UPS & Power",
    images: ["/placeholder.svg"],
    description: "1100VA/660W UPS with AVR, 6 outlets, and USB charging ports. Battery backup for computers.",
  },
  {
    id: "7",
    name: "Kingston 16GB DDR4 RAM",
    quantity: 50,
    price: 8500,
    weight: "50g",
    category: "Components",
    images: ["/placeholder.svg"],
    description: "16GB DDR4 3200MHz desktop memory module. Plug and play with automatic overclocking.",
  },
  {
    id: "8",
    name: "Redragon M711 Cobra Mouse",
    quantity: 40,
    price: 4500,
    weight: "150g",
    category: "Peripherals",
    images: ["/placeholder.svg"],
    description: "Ergonomic RGB gaming mouse with 10,000 DPI sensor, 7 programmable buttons.",
  },
];

const categories = ["All", ...Array.from(new Set(dummyProducts.map((p) => p.category)))];

const Technologies = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-24 px-6">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              E-Zone <span className="text-gradient">Technologies</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Complete IT hardware and technology supply — laptops, printers, CCTV, networking, and more.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-glow bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-xl bg-card border border-glow overflow-hidden hover:shadow-glow transition-all duration-300"
              >
                {/* 
                  Product image - replace src with product.images[0] from API
                  For product detail redirect: 
                  <Link to={`/technologies/${product.id}`}> or window.open(apiDetailUrl) 
                */}
                <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-mono text-primary">{product.category}</span>
                  <h3 className="text-sm font-bold text-foreground mt-1 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      LKR {product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">{product.weight}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-glow">
                    <span className={`text-xs font-medium ${product.quantity > 0 ? "text-green-400" : "text-destructive"}`}>
                      {product.quantity > 0 ? `In Stock (${product.quantity})` : "Out of Stock"}
                    </span>
                    {/* 
                      To redirect to product detail from API:
                      onClick={() => window.open(`https://your-api.com/product/${product.id}`, '_blank')}
                    */}
                    <button onClick={() => navigate(`/technologies/${product.id}`)} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors">
                      <ShoppingCart size={14} /> View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Technologies;
