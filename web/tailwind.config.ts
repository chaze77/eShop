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
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config;
