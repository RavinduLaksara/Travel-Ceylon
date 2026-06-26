import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register the Service Worker for offline capability
const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

/**
 * Application entry point.
 * Wraps the App in BrowserRouter for client-side routing
 * and StrictMode for development checks.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
