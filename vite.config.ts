import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Remplacez 'lovemail' par le nom de votre repo GitHub
export default defineConfig({
  plugins: [react()],
  base: '/lovemail/',
})
