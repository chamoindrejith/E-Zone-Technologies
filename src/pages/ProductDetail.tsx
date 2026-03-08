import { motion } from "framer-motion";
import { ArrowLeft, Package, Weight, Layers, ShoppingCart, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchProductById } from "@/lib/api";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  // Fetch product from API
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  // Helper functions
  const getProductPrice = (product: any) => {
    return product?.variations?.[0]?.default_sell_price || 0;
  };

  const getProductStock = (product: any) => {
    return product?.variations?.[0]?.total_stock || 0;
  };

  const getProductImages = (product: any) => {
    const images: string[] = [];
    if (product?.image_url) images.push(product.image_url);
    product?.images?.forEach((img: any) => {
      if (img.url && !images.includes(img.url)) images.push(img.url);
    });
    return images.length > 0 ? images : ['/placeholder.svg'];
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-24 px-6">
          <div className="container mx-auto flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-28 pb-24 px-6">
          <div className="container mx-auto text-center">
            <div className="rounded-lg bg-destructive/10 border border-destructive p-6 max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-destructive mb-4">Product Not Found</h1>
              {error && (
                <p className="text-sm text-muted-foreground mb-4">
                  {error instanceof Error ? error.message : 'Failed to load product'}
                </p>
              )}
              <Link to="/technologies" className="text-primary hover:underline">
                ← Back to Products
              </Link>
            </div>
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
              {(() => {
                const images = getProductImages(product);
                return (
                  <>
                    <div className="aspect-square rounded-2xl bg-card border border-glow overflow-hidden mb-4">
                      <img
                        src={images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {images.length > 1 && (
                      <div className="flex gap-3 flex-wrap">
                        {images.map((img, i) => (
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
                  </>
                );
              })()}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono text-primary uppercase tracking-wider">
                {product.category?.name || 'Uncategorized'}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-4">{product.name}</h1>
              <div 
                className="text-muted-foreground mb-8 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className="text-3xl font-bold text-foreground mb-8">
                LKR {getProductPrice(product).toLocaleString()}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-card border border-glow text-center">
                  <Package size={20} className="mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground block">Stock</span>
                  <span className="text-sm font-bold text-foreground">{getProductStock(product)} units</span>
                </div>
                {product.weight && (
                  <div className="p-4 rounded-xl bg-card border border-glow text-center">
                    <Weight size={20} className="mx-auto mb-2 text-primary" />
                    <span className="text-xs text-muted-foreground block">Weight</span>
                    <span className="text-sm font-bold text-foreground">{product.weight}</span>
                  </div>
                )}
                {product.brand && (
                  <div className="p-4 rounded-xl bg-card border border-glow text-center">
                    <Layers size={20} className="mx-auto mb-2 text-primary" />
                    <span className="text-xs text-muted-foreground block">Brand</span>
                    <span className="text-sm font-bold text-foreground">{product.brand.name}</span>
                  </div>
                )}
              </div>

              <div className={`inline-flex items-center gap-2 text-sm font-semibold mb-6 ${getProductStock(product) > 0 ? "text-green-400" : "text-destructive"}`}>
                <span className={`w-2 h-2 rounded-full ${getProductStock(product) > 0 ? "bg-green-400" : "bg-destructive"}`} />
                {getProductStock(product) > 0 ? "In Stock" : "Out of Stock"}
              </div>

              <a 
                href="tel:0718711111" 
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
              >
                <ShoppingCart size={20} /> Contact for Purchase
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
