import express from "express";

const app = express();
const port = process.env.PORT || 8080;

const API_BASE_URL = "https://ezonepos.com/ecommerce-api/v1";
const API_KEY = process.env.EZONE_API_KEY;

if (!API_KEY) {
  console.error("Missing EZONE_API_KEY environment variable.");
  process.exit(1);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/products", async (req, res) => {
  const path = (req.query.path || "products").toString();
  const page = req.query.page?.toString();

  const endpoint = new URL(`${API_BASE_URL}/${path}`);
  if (page) {
    endpoint.searchParams.set("page", page);
  }

  try {
    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      }
    });

    const body = await response.text();
    res.status(response.status).type("application/json").send(body);
  } catch (error) {
    res.status(500).json({
      error: "Proxy request failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
