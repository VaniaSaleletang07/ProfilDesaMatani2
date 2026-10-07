import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Izinkan perangkat lain pada jaringan Wi-Fi/LAN yang sama membuka Vite.
    // API tetap diproxy secara lokal agar tidak diekspos langsung ke jaringan.
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://127.0.0.1:4174',
      '/uploads': 'http://127.0.0.1:4174',
    },
  },
})
