
import { defineConfig } from 'vite'
import { react } from '@vitejs/plugin-react'
import * as path from 'path'
import { componentTagger } from "lovable-tagger"

// Add version logging to help with debugging
console.log('-------------------------------------');
console.log('Loading Vite config');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());
console.log('-------------------------------------');

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ['.lovableproject.com'] 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        target: 'esnext',
        module: 'esnext'
      }
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
      }
    }
  },
  appType: 'spa'
}))
