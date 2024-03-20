import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },
  server: {
    port: 5510,
    host: true
  },
  preview: {
    port: 9000,
    host: true
  },
  build: {
    outDir: 'build'
  }
})
