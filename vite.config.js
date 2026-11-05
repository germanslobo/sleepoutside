import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  // AÑADE ESTA LÍNEA para que Vite busque los estáticos en la carpeta public de la raíz
  publicDir: resolve(__dirname, 'public'),

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        product: resolve(__dirname, 'src/product_pages/index.html'),
      },
    },
  },
});
