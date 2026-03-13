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

  const variations = product?.variations || [];
  const productPrice = Number(getProductPrice(product) || 0);
  const productStock = Number(getProductStock(product) || 0);
  const productStatus = productStock > 0 ? "In Stock" : "Out of Stock";
  const purchaseContactSearch = new URLSearchParams({
    intent: "purchase",
    productName: product?.name || "N/A",
    sku: product?.sku || "N/A",
    brand: product?.brand?.name || "N/A",
    status: productStatus,
    price: `LKR ${productPrice.toLocaleString()}`,
  }).toString();

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
              <div className="text-3xl font-bold text-foreground mb-8">
                LKR {productPrice.toLocaleString()}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-card border border-glow text-center">
                  <Package size={20} className="mx-auto mb-2 text-primary" />
                  <span className="text-xs text-muted-foreground block">Stock</span>
                  <span className="text-sm font-bold text-foreground">{productStock} units</span>
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

              <div className={`inline-flex items-center gap-2 text-sm font-semibold mb-6 ${productStock > 0 ? "text-green-400" : "text-destructive"}`}>
                <span className={`w-2 h-2 rounded-full ${productStock > 0 ? "bg-green-400" : "bg-destructive"}`} />
                {productStatus}
              </div>

              {variations.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-foreground mb-3">Variations</h2>
                  <div className="rounded-xl border border-glow bg-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/60 text-muted-foreground">
                          <tr>
                            <th className="text-left px-4 py-3 font-semibold">Variation</th>
                            <th className="text-left px-4 py-3 font-semibold">SKU</th>
                            <th className="text-right px-4 py-3 font-semibold">Price (LKR)</th>
                            <th className="text-right px-4 py-3 font-semibold">Stock</th>
                            <th className="text-left px-4 py-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {variations.map((variation: any) => {
                            const variationStock = variation.total_stock || 0;
                            const variationName =
                              variation.name || variation.product_variation_name || "Default";

                            return (
                              <tr key={variation.id} className="border-t border-glow">
                                <td className="px-4 py-3 text-foreground">{variationName}</td>
                                <td className="px-4 py-3 text-muted-foreground">{variation.sub_sku || "-"}</td>
                                <td className="px-4 py-3 text-right text-foreground font-semibold">
                                  {Number(variation.default_sell_price || 0).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-right text-foreground">{variationStock}</td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex items-center gap-1 ${variationStock > 0 ? "text-green-400" : "text-destructive"}`}>
                                    <span className={`w-2 h-2 rounded-full ${variationStock > 0 ? "bg-green-400" : "bg-destructive"}`} />
                                    {variationStock > 0 ? "In Stock" : "Out of Stock"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="mb-8 rounded-xl border border-glow bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Product Details</h2>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-glow/50">
                    <span className="text-muted-foreground">SKU:</span>
                    <span className="text-foreground font-medium">{product.sku || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-glow/50">
                    <span className="text-muted-foreground">Brand:</span>
                    <span className="text-foreground font-medium">{product.brand?.name || "N/A"}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-glow/50">
                    <span className="text-muted-foreground">Available in locations:</span>
                    <span className="text-foreground font-medium text-right">
                      {product.locations && product.locations.length > 0 
                        ? product.locations.map((loc: any) => loc.name).join(", ")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-glow/50">
                    <span className="text-muted-foreground">Selling Price Tax Type:</span>
                    <span className="text-foreground font-medium">
                      {variations.length > 0 && variations[0].sell_price_inc_tax 
                        ? "Inclusive of Tax" 
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Product Type:</span>
                    <span className="text-foreground font-medium capitalize">{product.type || "N/A"}</span>
                  </div>
                </div>
              </div>

              <Link
                to={{
                  pathname: "/",
                  search: `?${purchaseContactSearch}`,
                  hash: "#contact",
                }}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-glow"
              >
                <ShoppingCart size={20} /> Purchase
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetail;
