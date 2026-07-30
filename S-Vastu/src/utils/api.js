// Automatically switch to local backend if running on localhost to prevent CORS and deployment errors
export const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5001'
    : 'https://s-vastu.onrender.com';
// API Endpoints
export const API = `${BASE_URL}/api`;

export const PAGES_API = `${API}/pages`;
export const BLOGS_API = `${API}/blogs`;
export const ADMIN_API = `${API}/admin`;
export const GALLERY_API = `${API}/gallery`;
export const CONTACT_API = `${API}/contact`;
export const SEO_API = `${API}/seo`;
export const YOUTUBE_API = `${API}/youtube`;
