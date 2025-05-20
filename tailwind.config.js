/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Cinzel', 'serif'],
        'sans': ['Lato', 'sans-serif'],
      },
      colors: {
        'primary': {
          50: '#e6e9f4',
          100: '#c1c8e3',
          200: '#99a4d1',
          300: '#7180be',
          400: '#4f64b0',
          500: '#3c4e99',
          600: '#2c3c7e',
          700: '#1c2e6e', // Nossa Senhora Aparecida's mantle color
          800: '#0f1d57',
          900: '#0A1F44',
        },
        'secondary': {
          DEFAULT: '#FFD700', // Gold
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'accent': {
          DEFAULT: '#a51c30', // Accent red
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
        'pattern-light': "url('/src/assets/pattern-light.svg')",
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        'elevation-gold': '0 4px 6px rgba(255, 215, 0, 0.25)',
      },
    },
  },
  plugins: [],
};