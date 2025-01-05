import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

export default {
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
        rfdewi: ['RFDewi', 'Arial', 'sans-serif'], // Добавляем кастомный шрифт
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
