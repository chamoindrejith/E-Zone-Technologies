# API Integration & Deployment Guide

## Problem Solved
Fixed CORS (Cross-Origin Resource Sharing) errors when accessing the E Zone POS API in production.

## Solution Overview
- **Development**: Uses Vite proxy server (no CORS issues)
- **Production**: Uses serverless functions to proxy API requests

## Files Created/Modified

### 1. Serverless Functions
- **`api/products.js`** - Vercel serverless function
- **`netlify/functions/products.js`** - Netlify serverless function
- Both handle API requests and add proper headers to bypass CORS

### 2. Configuration Files
- **`vercel.json`** - Vercel deployment configuration
- **`public/_redirects`** - Netlify redirects configuration

### 3. Updated Files
- **`src/lib/api.ts`** - Updated to use different endpoints for dev/production
- **`vite.config.ts`** - Added proxy configuration for development

## Deployment Instructions

### For Traditional Hosting (cPanel, Shared Hosting, etc.):
1. Run: `npm run build`
2. Upload the entire `dist/` folder to your web root (e.g., `public_html/`)
3. **Important**: Make sure the `api/products.php` file is uploaded to `public_html/api/products.php`
4. Test the API endpoint: `https://yourdomain.com/api/products.php?path=products&page=1`
5. If you get a "File not found" error, check that PHP is enabled on your server

**Requirements:**
- PHP 7.0 or higher
- cURL extension enabled (usually enabled by default)
- Apache with mod_rewrite (optional, for clean URLs)

### For Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` (first time will link your project)
3. Deploy: `vercel --prod`

### For Netlify:
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify init` (first time)
3. Deploy: `netlify deploy --prod`

### For Other Hosting (Apache/Nginx):
You'll need to set up a backend server to proxy the API requests. The serverless functions won't work on traditional hosting.

**Alternative**: Contact the E Zone POS API provider to enable CORS for your domain.

## How It Works

### Development Mode (`npm run dev`)
```
Browser → Vite Dev Server (proxy) → E Zone API
```
The Vite proxy adds the API key and forwards requests.

### Production Mode - Traditional Hosting (after `npm run build`)
```
Browser → PHP Proxy (products.php) → E Zone API
```
The PHP script adds the API key, handles CORS headers, and forwards requests.

### Production Mode - Serverless (Vercel/Netlify)
```
Browser → Serverless Function → E Zone API
```
The serverless function adds the API key and handles CORS headers.

## Testing

### Test Development:
```bash
npm run dev
# Visit http://localhost:8080/technologies
```

### Test Production Build Locally:
```bash
npm run build
npm run preview
# Visit http://localhost:4173/technologies
```

## Environment Variables (Optional)
For better security, you can move the API key to environment variables:

1. Create `.env` file:
```
VITE_EZONE_API_KEY=your-api-key-here
```

2. Update `api/products.js` and `netlify/functions/products.js`:
```javascript
const API_KEY = process.env.VITE_EZONE_API_KEY || 'fallback-key';
```

## Troubleshooting

### For Traditional Hosting (PHP):

**CORS still not working?**
- Check that `.htaccess` file is uploaded to `public_html/api/.htaccess`
- Some shared hosts don't allow `.htaccess` - contact support to enable it
- Verify PHP cURL is enabled: Create a file `test.php` with `<?php phpinfo(); ?>` and check for cURL

**404 on products.php?**
- Make sure the file path is correct: `public_html/api/products.php`
- Check file permissions: Should be 644 (readable by web server)
- Verify your hosting supports PHP (most do)

**API returns error?**
- Test the PHP file directly in browser: `https://yourdomain.com/api/products.php?path=products&page=1`
- Check error logs in cPanel or hosting control panel
- Ensure your server can make outbound HTTPS requests (some hosts block this)

**Products page is blank?**
- Open browser DevTools → Network tab
- Look for failed requests to `/api/products.php`
- Check the response - it should show JSON data

### Still getting CORS errors?
- Check browser console for exact error
- Verify the serverless function is deployed (check hosting platform dashboard)
- Test the API endpoint directly: `/api/products?path=products&page=1`

### Products not loading?
- Open browser DevTools → Network tab
- Check if API requests are being made
- Look at response status and data

### Build fails?
- Make sure all dependencies are installed: `npm install`
- Clear cache: `rm -rf node_modules/.vite` then `npm run build`
