
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/globals.css';
import './index.css';

// More detailed deployment verification and environment logging
console.log('-------------------------------------');
console.log('Build timestamp:', new Date().toISOString());
console.log('Vercel deployment verification - Using npx direct execution');
console.log('Environment:', process.env.NODE_ENV || 'unknown');
console.log('React version:', React.version);
console.log('-------------------------------------');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
