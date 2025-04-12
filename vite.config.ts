
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Import path using ES module syntax instead of CommonJS
import * as path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ['.lovableproject.com'] // Added wildcard match for lovableproject.com domains
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
    // Use tsconfig.node.json for esbuild
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
