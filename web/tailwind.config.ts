import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './constants/**/*.{ts,tsx}',
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
