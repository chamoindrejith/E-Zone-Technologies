// E Zone POS API configuration
// Dev: Vite proxy (/api)
// Prod: custom proxy URL from env or default PHP path
const API_KEY = "f98fc3f1a2b27a1c71ec0d1332a9edcf566ed3aa52a19b985e03a5c5028130ed";
const PROD_PROXY_BASE_URL = (import.meta.env.VITE_PRODUCTS_PROXY_BASE_URL as string | undefined)?.trim();
const API_BASE_URL = import.meta.env.DEV ? "/api" : (PROD_PROXY_BASE_URL || "/api/products.php");

const readJsonResponse = async (response: Response) => {
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  try {
    return JSON.parse(raw);
  } catch {
    // Common production failure: PHP file is served as text instead of executed.
    const startsWithPhpTag = raw.trimStart().startsWith("<?php");
    const startsWithHtml = raw.trimStart().startsWith("<");

    if (startsWithPhpTag || startsWithHtml) {
      throw new Error(
        "Proxy endpoint did not return JSON. Your host is likely serving proxy code as static text (PHP not executing) or returning an HTML error page. Configure a working backend proxy and set VITE_PRODUCTS_PROXY_BASE_URL."
      );
    }

    throw new Error("Proxy endpoint returned invalid JSON.");
  }
};

const getProdProxyCandidates = () => {
  const candidates = [PROD_PROXY_BASE_URL, "/api", "/api/products.php", "/products.php"];
  return candidates.filter((value): value is string => Boolean(value));
};

const joinUrl = (baseUrl: string, path: string) => {
  const cleanBase = baseUrl.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
};

const buildProdUrl = (baseUrl: string, path: string, page?: number, perPage?: number) => {
  // PHP proxy style: /api/products.php?path=products&page=1
  // Node proxy style: /products?path=products&page=1
  if (baseUrl.endsWith(".php") || baseUrl.endsWith("/products")) {
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set("path", path);
    if (typeof page === "number") {
      url.searchParams.set("page", String(page));
    }
    if (typeof perPage === "number") {
      url.searchParams.set("per_page", String(perPage));
    }
    return `${url.pathname}${url.search}`;
  }

  // Nginx reverse proxy style: /api/products?page=1 or /api/products/:id
  const basePath = joinUrl(baseUrl, path);
  if (typeof page === "number" || typeof perPage === "number") {
    const params = new URLSearchParams();
    if (typeof page === "number") {
      params.set("page", String(page));
    }
    if (typeof perPage === "number") {
      params.set("per_page", String(perPage));
    }
    return `${basePath}?${params.toString()}`;
  }
  return basePath;
};

const requestJsonWithFallback = async (buildPath: (baseUrl: string) => string) => {
  if (import.meta.env.DEV) {
    const response = await fetch(buildPath(API_BASE_URL), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    return readJsonResponse(response);
  }

  let lastError: unknown;
  for (const candidate of getProdProxyCandidates()) {
    try {
      const response = await fetch(buildPath(candidate), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await readJsonResponse(response);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Unable to fetch products from configured proxy endpoints.");
};

interface ImageItem {
  type: string;
  url: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

export interface ProductCategory {
  id: number;
  name: string;
}

interface Unit {
  id: number;
  name: string;
  short_name: string;
}

interface StockItem {
  location_id: number;
  qty_available: number;
}

interface Variation {
  id: number;
  name: string;
  sub_sku: string;
  product_variation_name: string | null;
  default_sell_price: number;
  sell_price_inc_tax: number;
  stock: StockItem[];
  total_stock: number;
  images: any[];
}

interface Location {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  type: string;
  description: string;
  image_url: string;
  images: ImageItem[];
  brand: Brand | null;
  category: Category | null;
  sub_category: any;
  unit: Unit;
  enable_stock: boolean;
  barcode_type: string;
  weight: string | null;
  custom_field1: string | null;
  custom_field2: string | null;
  custom_field3: string | null;
  custom_field4: string | null;
  variations: Variation[];
  locations: Location[];
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  data: Product[];
  links?: any;
  meta?: any;
}

const buildProductsPath = (
  baseUrl: string,
  page: number,
  perPage?: number,
  categoryId?: number
) => {
  if (import.meta.env.DEV) {
    const params = new URLSearchParams({ page: String(page) });
    if (typeof perPage === "number") {
      params.set("per_page", String(perPage));
    }
    if (typeof categoryId === "number") {
      params.set("category_id", String(categoryId));
    }
    return `${baseUrl}/products?${params.toString()}`;
  }

  const basePath = buildProdUrl(baseUrl, "products", page, perPage);
  if (typeof categoryId !== "number") {
    return basePath;
  }

  const separator = basePath.includes("?") ? "&" : "?";
  return `${basePath}${separator}category_id=${categoryId}`;
};

/**
 * Fetch products from E Zone POS API
 * @param page - Page number (default: 1)
 * @param perPage - Items per page
 * @param categoryId - Category ID filter
 * @returns Promise with products data
 */
export const fetchProducts = async (
  page: number = 1,
  perPage?: number,
  categoryId?: number
): Promise<ProductsResponse> => {
  try {
    const result = await requestJsonWithFallback((baseUrl) =>
      buildProductsPath(baseUrl, page, perPage, categoryId)
    );

    // The API returns { data: [...], pagination: {...}, links: {...} }
    // We need to return it in the format our frontend expects
    return {
      data: result.data || [],
      links: result.links,
      meta: result.pagination
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

/**
 * Fetch all available product categories by extracting from ALL product pages.
 * Uses high per_page value to minimize requests.
 * @returns Promise with categories list
 */
export const fetchCategories = async (): Promise<ProductCategory[]> => {
  try {
    // Fetch first page with very high per_page to get many products at once
    const firstPageResult = await requestJsonWithFallback((baseUrl) =>
      buildProductsPath(baseUrl, 1, 1000) // Request 1000 items per page
    );

    const categoriesMap = new Map<number, ProductCategory>();
    const totalPages = Number(firstPageResult.meta?.last_page ?? 1);
    const totalProducts = Number(firstPageResult.meta?.total ?? 0);

    console.log(`Total products: ${totalProducts}, Total pages (with per_page=1000): ${totalPages}`);

    // Extract categories from first page
    const firstPageProducts = firstPageResult.data || [];
    firstPageProducts.forEach((product: Product) => {
      if (product.category?.id && product.category?.name) {
        if (!categoriesMap.has(product.category.id)) {
          categoriesMap.set(product.category.id, {
            id: product.category.id,
            name: product.category.name
          });
        }
      }
    });

    // Fetch remaining pages in smaller batches
    if (totalPages > 1) {
      const batchSize = 5; // Fetch 5 pages at a time (5000 products per batch)
      const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

      for (let i = 0; i < pageNumbers.length; i += batchSize) {
        const batch = pageNumbers.slice(i, i + batchSize);
        
        console.log(`Fetching batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(pageNumbers.length / batchSize)}`);
        
        const batchResults = await Promise.all(
          batch.map(pageNum =>
            requestJsonWithFallback((baseUrl) => buildProductsPath(baseUrl, pageNum, 1000))
              .catch((err) => {
                console.error(`Failed to fetch page ${pageNum}:`, err);
                return { data: [] };
              })
          )
        );

        // Extract categories from batch
        batchResults.forEach(result => {
          const pageProducts = result.data || [];
          pageProducts.forEach((product: Product) => {
            if (product.category?.id && product.category?.name) {
              if (!categoriesMap.has(product.category.id)) {
                categoriesMap.set(product.category.id, {
                  id: product.category.id,
                  name: product.category.name
                });
              }
            }
          });
        });

        console.log(`Categories found so far: ${categoriesMap.size}`);
      }
    }

    // Convert map to array and sort by name
    const result = Array.from(categoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    console.log(`Final: Found ${result.length} unique categories`);
    return result;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

/**
 * Fetch all products from all pages
 * @returns Promise with all products data
 */
export const fetchAllProducts = async (): Promise<ProductsResponse> => {
  try {
    // First, fetch the first page to get pagination metadata
    const firstPageResult = await requestJsonWithFallback((baseUrl) => {
      return import.meta.env.DEV
        ? `${baseUrl}/products?page=1`
        : buildProdUrl(baseUrl, "products", 1);
    });

    const allProducts: Product[] = firstPageResult.data || [];
    const pagination = firstPageResult.pagination;

    // If there are more pages, fetch them all
    if (pagination && pagination.last_page > 1) {
      const totalPages = pagination.last_page;
      
      // Create an array of page numbers to fetch (pages 2 to last_page)
      const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
      
      // Fetch all pages in parallel for better performance
      const pagePromises = pageNumbers.map(async (page) => {
        const result = await requestJsonWithFallback((baseUrl) => {
          return import.meta.env.DEV
            ? `${baseUrl}/products?page=${page}`
            : buildProdUrl(baseUrl, "products", page);
        });
        return result.data || [];
      });

      // Wait for all pages to be fetched
      const allPagesData = await Promise.all(pagePromises);
      
      // Combine all products
      allPagesData.forEach(pageData => {
        allProducts.push(...pageData);
      });
    }

    return {
      data: allProducts,
      meta: {
        ...pagination,
        current_page: 1,
        total: allProducts.length,
        from: 1,
        to: allProducts.length
      }
    };
  } catch (error) {
    console.error('Failed to fetch all products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param id - Product ID
 * @returns Promise with product data
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const result = await requestJsonWithFallback((baseUrl) => {
      return import.meta.env.DEV
        ? `${baseUrl}/products/${id}`
        : buildProdUrl(baseUrl, `products/${id}`);
    });

    // Handle both formats: { data: product } or just product
    return result.data || result;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};
