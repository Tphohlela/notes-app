import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public', // Keep this if your index.html is inside /public
  base: './', // Ensure relative paths work
  build: {
    outDir: '../dist', // Output directory for the build
    emptyOutDir: true,
  },
  // server: {
  //   open: true,
  // },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: ['notes-app-ya4x.onrender.com'], // Allow Render's host
  },
  
});


