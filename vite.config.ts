import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgrPlugin from 'vite-plugin-svgr';
import { createHtmlPlugin } from 'vite-plugin-html';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    port: 3000,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'https://emtithal-backend.up.railway.app',
        changeOrigin: true,
        secure: false, // Set to false if the backend server doesn't use HTTPS
      },
    },
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      // Your alias configurations
    },
  },
  esbuild: {
    pure: ['console'],
  },
  envDir: './environments',
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    createHtmlPlugin(),
    checker({
      typescript: true,
    }),
  ],
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss: {},
    },
  },
});
