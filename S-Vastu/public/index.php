<?php
// Hostinger PHP SEO Injector
// Fetches SEO data from Render backend and injects it into index.html

$requestPath = $_SERVER['REQUEST_URI'] ?? '/';
// Clean path by removing query strings if any
$pathOnly = parse_url($requestPath, PHP_URL_PATH);

// UPDATE THIS URL to your actual Render backend URL when deploying!
$apiUrl = "https://s-vastu.onrender.com/api/seo/metadata?path=" . urlencode($pathOnly);

// Default SEO values
$metaTitle = 'S-Vastu Solution';
$metaDescription = 'S-Vastu Description';
$metaKeywords = 'S-Vastu Keywords';
$metaCanonical = 'https://svastusolution.com';
$metaRobots = 'index, follow';
$metaOgImage = '';
$scriptTags = '';

// Try to fetch custom SEO
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 3); // 3 seconds timeout
$response = curl_exec($ch);
curl_close($ch);

if ($response) {
    $data = json_decode($response, true);
    if ($data) {
        if (!empty($data['title'])) $metaTitle = $data['title'];
        if (!empty($data['description'])) $metaDescription = $data['description'];
        if (!empty($data['keywords'])) $metaKeywords = $data['keywords'];
        if (!empty($data['canonical'])) $metaCanonical = $data['canonical'];
        if (!empty($data['robots'])) $metaRobots = $data['robots'];
        if (!empty($data['ogImage'])) $metaOgImage = $data['ogImage'];
        if (!empty($data['scriptTags'])) $scriptTags = $data['scriptTags'];
    }
}

// Read index.html
$htmlFilePath = __DIR__ . '/index.html';
if (file_exists($htmlFilePath)) {
    $html = file_get_contents($htmlFilePath);

    // Replace standard tags (matching the ones in our built index.html)
    $html = str_replace('<title data-rh="true">S-Vastu Solution</title>', '<title data-rh="true">' . htmlspecialchars($metaTitle) . '</title>', $html);
    $html = str_replace('<meta data-rh="true" name="description" content="S-Vastu Description" />', '<meta data-rh="true" name="description" content="' . htmlspecialchars($metaDescription) . '" />', $html);
    $html = str_replace('<meta data-rh="true" name="keywords" content="S-Vastu Keywords" />', '<meta data-rh="true" name="keywords" content="' . htmlspecialchars($metaKeywords) . '" />', $html);
    $html = str_replace('<link data-rh="true" rel="canonical" href="https://svastusolution.com" />', '<link data-rh="true" rel="canonical" href="' . htmlspecialchars($metaCanonical) . '" />', $html);
    $html = str_replace('<meta data-rh="true" name="robots" content="index, follow" />', '<meta data-rh="true" name="robots" content="' . htmlspecialchars($metaRobots) . '" />', $html);
    $html = str_replace('<meta data-rh="true" property="og:title" content="S-Vastu Solution" />', '<meta data-rh="true" property="og:title" content="' . htmlspecialchars($metaTitle) . '" />', $html);
    $html = str_replace('<meta data-rh="true" property="og:description" content="S-Vastu Description" />', '<meta data-rh="true" property="og:description" content="' . htmlspecialchars($metaDescription) . '" />', $html);
    $html = str_replace('<meta data-rh="true" property="og:image" content="" />', '<meta data-rh="true" property="og:image" content="' . htmlspecialchars($metaOgImage) . '" />', $html);
    
    // Inject scripts
    if (!empty($scriptTags)) {
        $html = str_replace('<!-- S-VASTU-SCRIPTS -->', $scriptTags, $html);
    }

    echo $html;
} else {
    echo "Error: index.html not found. Make sure you run npm run build.";
}
?>
