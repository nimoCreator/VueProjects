import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/gas': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/gas/,
            '/macros/s/AKfycbyoxXTt3Jp9mX8VeS0wtNMh4GQHZCeLpUEzebH-2hJbZXNnrVTv2ur1GfJ2V3L-OmP6/exec'
          ),
      },
    },
  },
})
