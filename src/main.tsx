import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap the entire app in cookies provider */}
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>
);
