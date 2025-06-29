
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    root: './src/app', // Ponto de entrada do front-end
    base: './', // <- ESSA LINHA resolve o caminho dos assets
    build: {
      outDir: '../../dist/public/app', // Saída do Vite build
      emptyOutDir: true,
    },
    plugins: [react()],
    define: {
      'process.env': env, // Para usar process.env.VITE_BASES_URL (opcional)
    }
  };
});

