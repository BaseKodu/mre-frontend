import type { Config } from 'tailwindcss'
import animate from "tailwindcss-animate"

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  prefix: "sc-",  // Adding a prefix to shadcn classes to avoid conflicts
  plugins: [animate],
} satisfies Config 