import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Change to where your index.html is located
  build: {
    outDir: '../dist', // Output directory for the build
  },
});
