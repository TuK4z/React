import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
        plugins: [tailwindcss()],
    },
  },
  base: './',
  build: {
      outDir: '../Altv/resources/egamesy/client/WebViewNew/',
      emptyOutDir: true,
      minify: 'esbuild',
      reportCompressedSize: false,
  },
})
