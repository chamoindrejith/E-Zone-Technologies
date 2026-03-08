<?php
/**
 * E Zone POS API Proxy
 * Place this file in your web root or api folder
 * Example: https://yourdomain.com/api/products.php
 */

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$API_KEY = 'f98fc3f1a2b27a1c71ec0d1332a9edcf566ed3aa52a19b985e03a5c5028130ed';
$API_BASE_URL = 'https://ezonepos.com/ecommerce-api/v1';

// Get query parameters
$path = isset($_GET['path']) ? $_GET['path'] : 'products';
$page = isset($_GET['page']) ? $_GET['page'] : null;

// Build URL
$url = $API_BASE_URL . '/' . $path;
if ($page) {
    $url .= '?page=' . urlencode($page);
}

// Make API request using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'x-api-key: ' . $API_KEY,
    'Content-Type: application/json'
));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle errors
if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch from API: ' . $error]);
    exit();
}

// Return response
http_response_code($httpCode);
echo $response;
?>
