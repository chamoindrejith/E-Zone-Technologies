// Serverless function to proxy API requests and bypass CORS
// Works with Vercel, Netlify, and other serverless platforms

const API_KEY = 'f98fc3f1a2b27a1c71ec0d1332a9edcf566ed3aa52a19b985e03a5c5028130ed';
const API_BASE_URL = 'https://ezonepos.com/ecommerce-api/v1';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { path } = req.query;
    const queryString = new URLSearchParams(req.query).toString();
    const url = `${API_BASE_URL}/${path || 'products'}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch from API' });
  }
}
