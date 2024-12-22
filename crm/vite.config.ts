import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias для папки src
      '@components': path.resolve(__dirname, './src/components'), // Alias для компонентов
      '@store': path.resolve(__dirname, './src/store'), // Alias для хранилищ
      '@utils': path.resolve(__dirname, './src/utils'), // Alias для утилит
    },
  },
});
