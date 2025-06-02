// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './src/app', // Ponto de entrada do front-end
  base: './', // <- ESSA LINHA resolve o caminho dos assets
  build: {
    outDir: '../../dist/public/app', // Saída do Vite build
    emptyOutDir: true
  },
  plugins: [react()],
});
