import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
const { resolve } = require('path')
const Dotenv = require('dotenv')

Dotenv.config()

const ASSET_URL = process.env.ASSET_URL || ''

export default {
  plugins: [
    vue(),
  ],

  root: 'resources',
  base: `${ASSET_URL}/dist/`,

  build: {
    outDir: resolve(__dirname, 'public/dist'),
    emptyOutDir: true,
    manifest: true,
    target: 'es2018',
    rollupOptions: {
      input: '/js/app.js'
    }
  },

  server: {
    strictPort: true,
    port: 3000
  },

  resolve: {
    alias: {
      '@': '/js',
    }
  },

  optimizeDeps: {
    include: [
      'vue',
      // '@inertiajs/inertia',
      // '@inertiajs/inertia-vue3',
      // '@inertiajs/progress',
      'axios'
    ]
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom'
  }
}
