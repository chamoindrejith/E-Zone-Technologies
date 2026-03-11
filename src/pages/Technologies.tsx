import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Loader2, Search, X, ChevronLeft, ChevronRight, Check, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  fetchAllProducts,
  fetchAllProductsByCategory,
  fetchCategories,
  fetchSubCategories,
  fetchBrands,
  fetchProducts,
  type Product,
  type ProductCategory,
  type ProductSubCategory,
  type ProductBrand,
} from "@/lib/api";

const PAGE_SIZE = 24;
type StockFilterValue = "all" | "in" | "out";

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
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [selectedStockFilter, setSelectedStockFilter] = useState<StockFilterValue>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const headingRef = useRef<HTMLDivElement | null>(null);

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

  const { data: brandsData } = useQuery({
    queryKey: ["product-brands"],
    queryFn: () => fetchBrands(),
    staleTime: 30 * 60 * 1000,
  });

  const isSearchActive = searchQuery.trim().length > 0;
  const isStockFilterActive = selectedStockFilter !== "all";
  const isClientSideFilteringActive = isSearchActive || isStockFilterActive;
  const { data: allProductsData, isFetching: isAllProductsFetching } = useQuery({
    queryKey: ["products-all-filters"],
    queryFn: () => fetchAllProducts(),
    staleTime: 5 * 60 * 1000,
    enabled: isClientSideFilteringActive,
  });

  const isUsingLocalSubCategoryFiltering = selectedCategoryId !== null && selectedSubCategoryId !== null;

  // Default server pagination for all products or category-only filtering.
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["products", currentPage, PAGE_SIZE, selectedCategoryId, selectedBrandId],
    queryFn: () =>
      fetchProducts(
        currentPage,
        PAGE_SIZE,
        selectedCategoryId ?? undefined,
        undefined,
        selectedBrandId ?? undefined
      ),
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
      let localFiltered = categoryProducts.filter(
        (product) => product.sub_category?.id === selectedSubCategoryId
      );

      if (selectedBrandId !== null) {
        localFiltered = localFiltered.filter((product) => product.brand?.id === selectedBrandId);
      }

      const sorted = sortProductsByStock(localFiltered);
      const start = (currentPage - 1) * PAGE_SIZE;
      return sorted.slice(start, start + PAGE_SIZE);
    }

    return sortProductsByStock(data?.data || []);
  }, [isUsingLocalSubCategoryFiltering, categoryProductsData, selectedSubCategoryId, selectedBrandId, currentPage, data?.data]);

  const totalProducts = useMemo(() => {
    if (isUsingLocalSubCategoryFiltering) {
      const categoryProducts = categoryProductsData || [];
      let localFiltered = categoryProducts.filter(
        (product) => product.sub_category?.id === selectedSubCategoryId
      );

      if (selectedBrandId !== null) {
        localFiltered = localFiltered.filter((product) => product.brand?.id === selectedBrandId);
      }

      return localFiltered.length;
    }
    return Number(data?.meta?.total ?? products.length);
  }, [isUsingLocalSubCategoryFiltering, categoryProductsData, selectedSubCategoryId, selectedBrandId, data?.meta?.total, products.length]);

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

  // Reset page when brand changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrandId]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Reset page when stock filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStockFilter]);

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

  const brands = useMemo(() => {
    const list: ProductBrand[] = brandsData || [];
    return [{ id: null as number | null, name: "All Brands" }, ...list];
  }, [brandsData]);

  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategoryId)?.name || "All";
  const selectedSubCategoryName =
    subCategories.find((subCategory) => subCategory.id === selectedSubCategoryId)?.name || "All";
  const selectedBrandName =
    brands.find((brand) => brand.id === selectedBrandId)?.name || "All Brands";
  const stockFilters: Array<{ value: StockFilterValue; label: string }> = [
    { value: "all", label: "All Stock" },
    { value: "in", label: "In Stock" },
    { value: "out", label: "Out of Stock" },
  ];
  const selectedStockFilterName =
    stockFilters.find((filter) => filter.value === selectedStockFilter)?.label || "All Stock";

  const activeFilterLabels = useMemo(() => {
    const labels: string[] = [];

    if (selectedCategoryId !== null) {
      labels.push(`Category - ${selectedCategoryName}`);
    }
    if (selectedSubCategoryId !== null) {
      labels.push(`Sub-Category - ${selectedSubCategoryName}`);
    }
    if (selectedBrandId !== null) {
      labels.push(`Brand - ${selectedBrandName}`);
    }
    if (selectedStockFilter !== "all") {
      labels.push(`Stock - ${selectedStockFilterName}`);
    }

    return labels;
  }, [
    selectedCategoryId,
    selectedSubCategoryId,
    selectedBrandId,
    selectedStockFilter,
    selectedCategoryName,
    selectedSubCategoryName,
    selectedBrandName,
    selectedStockFilterName,
  ]);

  const searchBaseProducts = useMemo(() => {
    if (!isClientSideFilteringActive) {
      return products;
    }

    let fullSet = allProductsData?.data || [];

    if (selectedCategoryId !== null) {
      fullSet = fullSet.filter((product) => product.category?.id === selectedCategoryId);
    }

    if (selectedSubCategoryId !== null) {
      fullSet = fullSet.filter((product) => product.sub_category?.id === selectedSubCategoryId);
    }

    if (selectedBrandId !== null) {
      fullSet = fullSet.filter((product) => product.brand?.id === selectedBrandId);
    }

    if (selectedStockFilter !== "all") {
      fullSet = fullSet.filter((product) => {
        const stock = product.variations?.[0]?.total_stock || 0;
        return selectedStockFilter === "in" ? stock > 0 : stock <= 0;
      });
    }

    return sortProductsByStock(fullSet);
  }, [
    isClientSideFilteringActive,
    allProductsData?.data,
    products,
    selectedCategoryId,
    selectedSubCategoryId,
    selectedBrandId,
    selectedStockFilter,
  ]);

  // Search is applied on the filtered base set.
  const filteredProducts = useMemo(() => {
    let filtered = searchBaseProducts;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p: Product) => {
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
    }
    
    // Ensure filtered results are also sorted by stock
    return sortProductsByStock(filtered);
  }, [searchBaseProducts, searchQuery]);

  const effectiveTotalProducts = isClientSideFilteringActive ? filteredProducts.length : totalProducts;
  const effectiveLastPage = Math.max(1, Math.ceil(effectiveTotalProducts / PAGE_SIZE));
  const effectiveFromProduct = effectiveTotalProducts === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const effectiveToProduct =
    effectiveTotalProducts === 0 ? 0 : Math.min(currentPage * PAGE_SIZE, effectiveTotalProducts);
  const displayedProducts = isClientSideFilteringActive
    ? filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : filteredProducts;

  const scrollToProductsTop = () => {
    if (!headingRef.current) return;

    const top = headingRef.current.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => {
      const next = Math.max(prev - 1, 1);
      if (next !== prev) {
        requestAnimationFrame(scrollToProductsTop);
      }
      return next;
    });
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => {
      const next = Math.min(prev + 1, effectiveLastPage);
      if (next !== prev) {
        requestAnimationFrame(scrollToProductsTop);
      }
      return next;
    });
  };

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
            ref={headingRef}
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
                  <div className="w-full sm:w-auto min-w-[200px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Category
                    </label>
                    <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isCategoryOpen}
                          className="mt-1 w-full justify-between border-glow bg-card"
                        >
                          <span className="truncate">{selectedCategoryName}</span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  key={category.id ?? "all"}
                                  value={`${category.name}-${category.id ?? "all"}`}
                                  onSelect={() => {
                                    setSelectedCategoryId(category.id);
                                    setIsCategoryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${selectedCategoryId === category.id ? "opacity-100" : "opacity-0"}`}
                                  />
                                  {category.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Sub-Category Filter Dropdown */}
                  <div className="w-full sm:w-auto min-w-[200px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Sub-Category
                    </label>
                    <Popover open={isSubCategoryOpen} onOpenChange={setIsSubCategoryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isSubCategoryOpen}
                          disabled={selectedCategoryId === null}
                          className="mt-1 w-full justify-between border-glow bg-card"
                        >
                          <span className="truncate">{selectedSubCategoryName}</span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search sub-category..." />
                          <CommandList>
                            <CommandEmpty>No sub-category found.</CommandEmpty>
                            <CommandGroup>
                              {subCategories.map((subCategory) => (
                                <CommandItem
                                  key={subCategory.id ?? "all"}
                                  value={`${subCategory.name}-${subCategory.id ?? "all"}`}
                                  onSelect={() => {
                                    setSelectedSubCategoryId(subCategory.id);
                                    setIsSubCategoryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${selectedSubCategoryId === subCategory.id ? "opacity-100" : "opacity-0"}`}
                                  />
                                  {subCategory.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Brand Filter Dropdown */}
                  <div className="w-full sm:w-auto min-w-[200px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Brand
                    </label>
                    <Popover open={isBrandOpen} onOpenChange={setIsBrandOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isBrandOpen}
                          className="mt-1 w-full justify-between border-glow bg-card"
                        >
                          <span className="truncate">{selectedBrandName}</span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search brand..." />
                          <CommandList>
                            <CommandEmpty>No brand found.</CommandEmpty>
                            <CommandGroup>
                              {brands.map((brand) => (
                                <CommandItem
                                  key={brand.id ?? "all"}
                                  value={`${brand.name}-${brand.id ?? "all"}`}
                                  onSelect={() => {
                                    setSelectedBrandId(brand.id);
                                    setIsBrandOpen(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${selectedBrandId === brand.id ? "opacity-100" : "opacity-0"}`}
                                  />
                                  {brand.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Stock Filter Dropdown */}
                  <div className="w-full sm:w-auto min-w-[200px]">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Stock
                    </label>
                    <Popover open={isStockOpen} onOpenChange={setIsStockOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isStockOpen}
                          className="mt-1 w-full justify-between border-glow bg-card"
                        >
                          <span className="truncate">{selectedStockFilterName}</span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search stock status..." />
                          <CommandList>
                            <CommandEmpty>No stock status found.</CommandEmpty>
                            <CommandGroup>
                              {stockFilters.map((stockFilter) => (
                                <CommandItem
                                  key={stockFilter.value}
                                  value={stockFilter.label}
                                  onSelect={() => {
                                    setSelectedStockFilter(stockFilter.value);
                                    setIsStockOpen(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${selectedStockFilter === stockFilter.value ? "opacity-100" : "opacity-0"}`}
                                  />
                                  {stockFilter.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="flex-1 w-full">
                    <label htmlFor="product-search" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Search
                    </label>
                    <div className="relative mt-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                      <input
                        id="product-search"
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
                </div>
                
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
                  </p>
                )}
                {activeFilterLabels.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Filtering by: {activeFilterLabels.join(" | ")}
                  </p>
                )}
                {resolvedIsFetching && !resolvedIsLoading && (
                  <p className="text-sm text-muted-foreground mt-2">Loading page {currentPage}...</p>
                )}
                {isClientSideFilteringActive && isAllProductsFetching && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {isSearchActive ? "Searching all products..." : "Applying stock filter..."}
                  </p>
                )}
              </div>

              {/* No Products Message */}
              {filteredProducts.length === 0 && !resolvedIsFetching && !isAllProductsFetching && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found.</p>
                  {activeFilterLabels.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Try selecting different filters or use the search bar.
                    </p>
                  )}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {effectiveFromProduct} - {effectiveToProduct} of {effectiveTotalProducts}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1 || resolvedIsFetching || isAllProductsFetching}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-glow bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-muted-foreground min-w-[120px] text-center">
                    Page {currentPage} of {effectiveLastPage}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage >= effectiveLastPage || resolvedIsFetching || isAllProductsFetching}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-glow bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product: Product, i: number) => {
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
                      onClick={() => navigate(`/technologies/${product.id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(`/technologies/${product.id}`);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className="group rounded-xl bg-card border border-glow overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                            <ShoppingCart size={14} /> View Details
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {effectiveFromProduct} - {effectiveToProduct} of {effectiveTotalProducts}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1 || resolvedIsFetching || isAllProductsFetching}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-glow bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-muted-foreground min-w-[120px] text-center">
                    Page {currentPage} of {effectiveLastPage}
                  </span>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage >= effectiveLastPage || resolvedIsFetching || isAllProductsFetching}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-glow bg-card text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-all"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
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
