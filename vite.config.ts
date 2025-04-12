
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  server: {
    host: "::",
    port: 8080
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    target: 'esnext',
    outDir: 'dist'
  },
  // Explicitly tell Vite not to look for tsconfig.node.json
  // by providing the tsconfig inline
  appType: 'spa', // Specify the app type explicitly
  // Resolve paths in a way that doesn't rely on tsconfig.node.json
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
