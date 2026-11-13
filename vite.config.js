import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  // Configuración para que Vite ubique los recursos públicos en la raíz
  publicDir: resolve(__dirname, 'public'),

  resolve: {
    alias: {
      // Alias para apuntar a la carpeta src/js
      '@js': resolve(__dirname, 'src/js'),
      // Alias para apuntar a la carpeta src/css
      '@css': resolve(__dirname, 'src/css'),
    },
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true, // Buena práctica para limpiar la carpeta dist antes de compilar
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/cart/index.html'),
        checkout: resolve(__dirname, 'src/checkout/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
        product_listing: resolve(__dirname, 'src/product_listing/index.html'),
      },
    },
  },
});