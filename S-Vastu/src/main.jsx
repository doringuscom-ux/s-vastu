import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { HelmetProvider } from 'react-helmet-async';
// Remove initial SEO tags injected by PHP so React Helmet doesn't duplicate them
// We do NOT remove <title> because it causes the browser tab to flash the URL before React mounts.
document.querySelectorAll('meta[data-rh="true"], link[data-rh="true"]').forEach(el => el.remove());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
