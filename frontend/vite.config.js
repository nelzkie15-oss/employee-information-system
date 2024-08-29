import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    proxy:{
      '/api': {
        target: 'https://employee-information-system.mywebapp.online/',
        changeOrigin: true,
        headers:{
          Accept: 'application/json',
          "Content-Type": 'application/json',
        }
      }
    }
  }
})
