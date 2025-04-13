
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { componentTagger } from "lovable-tagger"

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
      input: 'src/main.tsx'
    }
  },
  appType: 'spa'
}))
