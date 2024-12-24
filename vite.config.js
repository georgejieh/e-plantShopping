import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/e-plantShopping/", // Use the repository name as the base path
  plugins: [react()],
});