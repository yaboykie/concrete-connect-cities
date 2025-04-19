
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { componentTagger } from 'lovable-tagger'

console.log('-------------------------------------')
console.log('Loading Vite config')
console.log('Node version:', process.version)
console.log('Current directory:', process.cwd())
console.log('-------------------------------------')

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  server: {
    host: '::',
    port: 8080,
    allowedHosts: ['.lovableproject.com'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    target: 'es2020',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },

  appType: 'spa',
}))
