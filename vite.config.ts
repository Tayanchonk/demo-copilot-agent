import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use base path for GitHub Pages, root path for Netlify
  base: process.env.NETLIFY ? '/' : '/demo-copilot-agent/',
})
