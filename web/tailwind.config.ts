import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

export default {
  // Для Tailwind v4 content можно опустить, но оставим для совместимости
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#48d0ff',
        headers: '#121214',
        blue: '#48d0ff',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        rfdewi: ['RFDewi', 'Arial', 'sans-serif'],
      },

      screens: {
        xs: '400px',
        sm: '640px',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config;

