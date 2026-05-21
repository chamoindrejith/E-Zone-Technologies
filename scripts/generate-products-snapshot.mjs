import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const API_BASE_URL = "https://ezonepos.com/ecommerce-api/v1";
const API_KEY = "f98fc3f1a2b27a1c71ec0d1332a9edcf566ed3aa52a19b985e03a5c5028130ed";
const OUTPUT_FILE = path.join(process.cwd(), "public", "products-data.json");
const PAGE_SIZE = 1000;

const fetchProductsPage = async (page) => {
  const url = new URL(`${API_BASE_URL}/products`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(PAGE_SIZE));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products page ${page}: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const main = async () => {
  const firstPage = await fetchProductsPage(1);
  const totalPages = Number(firstPage?.pagination?.last_page ?? 1);
  const allProducts = Array.isArray(firstPage?.data) ? [...firstPage.data] : [];

  for (let page = 2; page <= totalPages; page += 1) {
    const pageResult = await fetchProductsPage(page);
    if (Array.isArray(pageResult?.data)) {
      allProducts.push(...pageResult.data);
    }
  }

  const snapshot = {
    success: true,
    data: allProducts,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: allProducts.length,
      total: allProducts.length,
      from: allProducts.length > 0 ? 1 : 0,
      to: allProducts.length,
    },
    links: firstPage?.links ?? {},
  };

  await mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await writeFile(OUTPUT_FILE, JSON.stringify(snapshot));

  console.log(`Wrote ${allProducts.length} products to ${OUTPUT_FILE}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});