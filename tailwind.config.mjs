/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FF6B6B',
        'accent-2': '#FFA94D', 
        'accent-3': '#4D96FF',
        'accent-4': '#6BCB77',
      },
      fontFamily: {
        'heading': ['Mochiy Pop One', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '24px',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'lift': '0 8px 30px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
    },
  },
  plugins: [],
}