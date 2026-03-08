# Quick Deployment Guide for Your Hosting Provider

## 📦 What You Need to Upload

After running `npm run build`, you'll have a `dist` folder. Upload **EVERYTHING** from the `dist` folder to your web hosting:

```
dist/
├── assets/           → Upload to public_html/assets/
├── api/             → Upload to public_html/api/
│   ├── products.php  (IMPORTANT!)
│   └── .htaccess
├── index.html       → Upload to public_html/index.html
├── favicon.ico
└── [other files]    → Upload everything
```

## 🚀 Step-by-Step Upload Instructions

### Using cPanel File Manager:
1. Login to your cPanel
2. Open **File Manager**
3. Navigate to `public_html/` (or your domain's root folder)
4. Click **Upload** button
5. Select ALL files from the `dist/` folder
6. Wait for upload to complete
7. Make sure the folder structure is preserved (especially `api/products.php`)

### Using FTP (FileZilla):
1. Connect to your hosting via FTP
2. Navigate to `public_html/` or `www/` folder
3. Drag the entire contents of `dist/` folder to your hosting
4. Ensure `api/` folder and its contents are uploaded

## ✅ Verify Installation

1. Visit: `https://yourdomain.com/api/products.php?path=products&page=1`
2. You should see JSON data (product information)
3. If you see JSON data, the API is working! ✅
4. Now visit your main site: `https://yourdomain.com/technologies`
5. Products should load from the API

## ❌ Troubleshooting

### "File Not Found" or 404 Error on products.php
- Check file path: Must be at `public_html/api/products.php`
- File permissions: Set to 644
- Make sure PHP is enabled on your hosting

### Still Getting CORS Error
- Verify `.htaccess` file is at `public_html/api/.htaccess`
- Check if your host allows `.htaccess` files
- Contact hosting support to enable `mod_headers`

### "cURL Error" or "Failed to fetch from API"
- Your server needs cURL enabled (usually enabled by default)
- Contact hosting support to enable cURL extension
- Check if outbound HTTPS requests are allowed

### Blank Page / No Products
1. Open browser DevTools (F12)
2. Go to Console tab - check for errors
3. Go to Network tab - look for failed requests to `api/products.php`
4. Click the failed request to see the error details

## 📞 Need Help?

Common hosting providers and their docs:
- **BlueHost**: Upload to `public_html/`
- **HostGator**: Upload to `public_html/`
- **GoDaddy**: Upload to `public_html/` or `httpdocs/`
- **SiteGround**: Upload to `public_html/`
- **Namecheap**: Upload to `public_html/`

If still having issues:
1. Contact your hosting support
2. Ask them to check if PHP and cURL are enabled
3. Share the error from: `https://yourdomain.com/api/products.php?path=products&page=1`
