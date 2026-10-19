import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function siteBase() {
  const value = process.env.VITE_BASE?.trim()
  if (!value || value === '/') return '/'
  if (value === '.' || value === './') return './'
  const withLeading = value.startsWith('/') ? value : `/${value}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

// https://vite.dev/config/
export default defineConfig({
  base: siteBase(),
  plugins: [react()],
})
