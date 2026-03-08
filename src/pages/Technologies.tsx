import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Loader2, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  fetchAllProductsByCategory,
  fetchCategories,
  fetchSubCategories,
  fetchProducts,
  type Product,
  type ProductCategory,
  type ProductSubCategory,
} from "@/lib/api";

const PAGE_SIZE = 24;

const sortProductsByStock = (items: Product[]) => {
  return [...items].sort((a, b) => {
    const aInStock = (a.variations?.[0]?.total_stock || 0) > 0 ? 1 : 0;
    const bInStock = (b.variations?.[0]?.total_stock || 0) > 0 ? 1 : 0;
    return bInStock - aInStock;
  });
};

const Technologies = () => {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categoriesData } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => fetchCategories(),
    staleTime: 30 * 60 * 1000,
  });

  const { data: subCategoriesData } = useQuery({
    queryKey: ["product-subcategories"],
    queryFn: () => fetchSubCategories(),
    staleTime: 30 * 60 * 1000,
  });

  const isUsingLocalSubCategoryFiltering = selectedCategoryId !== null && selectedSubCategoryId !== null;

  // Default server pagination for all products or category-only filtering.
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["products", currentPage, PAGE_SIZE, selectedCategoryId],
    queryFn: () => fetchProducts(currentPage, PAGE_SIZE, selectedCategoryId ?? undefined),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    enabled: !isUsingLocalSubCategoryFiltering,
  });

  // Backend sub-category filtering is unreliable, so fetch full category and filter locally.
  const { data: categoryProductsData, isLoading: isCategoryProductsLoading, isFetching: isCategoryProductsFetching } = useQuery({
    queryKey: ["category-products-all", selectedCategoryId],
    queryFn: () => fetchAllProductsByCategory(selectedCategoryId as number),
    staleTime: 5 * 60 * 1000,
    enabled: isUsingLocalSubCategoryFiltering,
  });

  const products = useMemo(() => {
    if (isUsingLocalSubCategoryFiltering) {
      const categoryProducts = categoryProductsData || [];
      const subCategoryProducts = categoryProducts.filter(
        (product) => product.sub_category?.id === selectedSubCategoryId
      );
      const sorted = sortProductsByStock(subCategoryProducts);
      const start = (currentPage - 1) * PAGE_SIZE;
      return sorted.slice(start, start + PAGE_SIZE);
    }

    return sortProductsByStock(data?.data || []);
  }, [isUsingLocalSubCategoryFiltering, categoryProductsData, selectedSubCategoryId, currentPage, data?.data]);

  const totalProducts = useMemo(() => {
    if (isUsingLocalSubCategoryFiltering) {
      const categoryProducts = categoryProductsData || [];
      return categoryProducts.filter((product) => product.sub_category?.id === selectedSubCategoryId).length;
    }
    return Number(data?.meta?.total ?? products.length);
  }, [isUsingLocalSubCategoryFiltering, categoryProductsData, selectedSubCategoryId, data?.meta?.total, products.length]);

  const lastPage = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const fromProduct = totalProducts === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const toProduct = totalProducts === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, totalProducts);
  const resolvedIsLoading = isUsingLocalSubCategoryFiltering ? isCategoryProductsLoading : isLoading;
  const resolvedIsFetching = isUsingLocalSubCategoryFiltering ? isCategoryProductsFetching : isFetching;

  useEffect(() => {
    setCurrentPage(1);
    // Reset sub-category when category changes
    setSelectedSubCategoryId(null);
  }, [selectedCategoryId]);

  // Separate effect for sub-category page reset
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubCategoryId]);

  const categories = useMemo(() => {
    const list: ProductCategory[] = categoriesData || [];
    return [{ id: null as number | null, name: "All" }, ...list];
  }, [categoriesData]);

  const subCategories = useMemo(() => {
    const list: ProductSubCategory[] = subCategoriesData || [];

    // Show related sub-categories only when a category is selected.
    const filteredList = selectedCategoryId !== null ? list.filter((sc) => sc.category_id === selectedCategoryId) : [];

    return [{ id: null as number | null, name: "All", category_id: 0 }, ...filteredList];
  }, [subCategoriesData, selectedCategoryId]);

  // Search is applied on the current server page results.
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter((p: Product) => {
      const searchableText = [
        p.name,
        p.description,
        p.sku,
        p.brand?.name,
        p.category?.name,
        p.variations?.[0]?.sub_sku,
      ].filter(Boolean).join(" ").toLowerCase();

      return searchableText.includes(query);
    });
    
    // Ensure filtered results are also sorted by stock
    return sortProductsByStock(filtered);
  }, [products, searchQuery]);

  // Helper function to get product price
  const getProductPrice = (product: Product) => {
    return product.variations?.[0]?.default_sell_price || 0;
  };

  // Helper function to get product stock
  const getProductStock = (product: Product) => {
    return product.variations?.[0]?.total_stock || 0;
  };

  // Helper function to get product image
  const getProductImage = (product: Product) => {
    return product.image_url || product.images?.[0]?.url || '/placeholder.svg';
  };

  // Helper function to strip HTML tags from description
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
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
              E Zone <span className="text-gradient">Technologies</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Complete IT hardware and technology supply — laptops, printers, CCTV, networking, and more.
            </p>
          </motion.div>

          {/* Loading State */}
          {resolvedIsLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-lg bg-destructive/10 border border-destructive p-6 max-w-md text-center">
                <h3 className="text-lg font-semibold text-destructive mb-2">Failed to load products</h3>
                <p className="text-sm text-muted-foreground">
                  {error instanceof Error ? error.message : 'An error occurred while fetching products'}
                </p>
              </div>
            </div>
          )}

          {/* Products View */}
          {!resolvedIsLoading && !isError && (
            <>
              {/* Search Bar and Category Filter */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Category Filter Dropdown */}
                  <select
                    value={selectedCategoryId ?? "all"}
                    onChange={(e) => setSelectedCategoryId(e.target.value === "all" ? null : Number(e.target.value))}
                    className="px-4 py-3 rounded-lg bg-card border border-glow text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer w-full sm:w-auto min-w-[200px]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id ?? "all"} value={cat.id ?? "all"}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  {/* Sub-Category Filter Dropdown */}
                  <select
                    value={selectedSubCategoryId ?? "all"}
                    onChange={(e) => setSelectedSubCategoryId(e.target.value === "all" ? null : Number(e.target.value))}
                    disabled={selectedCategoryId === null}
                    className="px-4 py-3 rounded-lg bg-card border border-glow text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer w-full sm:w-auto min-w-[200px]"
                  >
                    {subCategories.map((subCat) => (
                      <option key={subCat.id ?? "all"} value={subCat.id ?? "all"}>
                        {subCat.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Search Bar */}
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      placeholder="Search products by name, brand, SKU, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-card border border-glow text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                </div>
                
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </p>
                )}
                {(selectedCategoryId !== null || selectedSubCategoryId !== null) && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Filtering by: {selectedCategoryId !== null && `Category - ${categories.find(c => c.id === selectedCategoryId)?.name}`}
                    {selectedCategoryId !== null && selectedSubCategoryId !== null && ' | '}
                    {selectedSubCategoryId !== null && `Sub-Category - ${subCategories.find(sc => sc.id === selectedSubCategoryId)?.name}`}
                  </p>
                )}
                {resolvedIsFetching && !resolvedIsLoading && (
                  <p className="text-sm text-muted-foreground mt-2">Loading page {currentPage}...</p>
                )}
              </div>

              {/* No Products Message */}
              {filteredProducts.length === 0 && !resolvedIsFetching && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found.</p>
                  {(selectedCategoryId !== null || selectedSubCategoryId !== null) && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Try selecting a different category/sub-category or use the search bar.
                    </p>
                  )}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {fromProduct} - {toProduct} of {totalProducts}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || resolvedIsFetching}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-glow bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-muted-foreground min-w-[120px] text-center">
                    Page {currentPage} of {lastPage}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                    disabled={currentPage >= lastPage || resolvedIsFetching}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-glow bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product: Product, i: number) => {
                  const price = getProductPrice(product);
                  const stock = getProductStock(product);
                  const imageUrl = getProductImage(product);
                  const description = stripHtml(product.description);
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="group rounded-xl bg-card border border-glow overflow-hidden hover:shadow-glow transition-all duration-300"
                    >
                      <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-primary">{product.category?.name || 'Uncategorized'}</span>
                          {product.sub_category?.name && (
                            <span className="text-xs font-mono text-muted-foreground">• {product.sub_category.name}</span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-foreground mt-1 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-foreground">
                            LKR {price.toLocaleString()}
                          </span>
                          {product.weight && (
                            <span className="text-xs text-muted-foreground">{product.weight}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-glow">
                          <span className={`text-xs font-medium ${stock > 0 ? "text-green-400" : "text-destructive"}`}>
                            {stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                          </span>
                          <button 
                            onClick={() => navigate(`/technologies/${product.id}`)} 
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors"
                          >
                            <ShoppingCart size={14} /> View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Technologies;
