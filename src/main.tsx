import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './styles/globals.css';
import './index.css';

console.log('-------------------------------------');
console.log('Build timestamp:', new Date().toISOString());
console.log('Vercel deployment verification - Using npx direct execution');
console.log('Environment:', process.env.NODE_ENV || 'unknown');
console.log('React version:', React.version);
console.log('-------------------------------------');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>,
  );
}
