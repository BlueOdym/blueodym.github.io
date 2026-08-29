import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'home.html'),
        about: resolve(__dirname, 'contact.html'),
        contact: resolve(__dirname, 'photography.html')
      }
    }
  }
})