import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      '@domain': path.resolve(import.meta.dirname, './src/domain'),
      '@infrastructure': path.resolve(import.meta.dirname, './src/infrastructure'),
      '@application': path.resolve(import.meta.dirname, './src/application'),
      '@presentation': path.resolve(import.meta.dirname, './src/presentation'),
    },
  },
  server: {
    port: 61345,
  },
});

