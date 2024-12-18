import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./_lib/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx,ttf,otf}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#A00C30',
        'secondary-color': '#F5F5F5',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        islandMoments: ['Island Moments', 'cursive'],
      },
      textStroke: {
        black: '1px black',
        white: '1px white',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-primary': {
          backgroundColor: 'var(--primary-color)',
        },
        '.bg-secondary': {
          backgroundColor: 'var(--secondary-color)',
        },
        '.text-primary': {
          color: 'var(--primary-color)',
        },
        '.text-secondary': {
          color: 'var(--secondary-color)',
        },
        '.border-primary': {
          borderColor: 'var(--primary-color)',
        },
        '.border-secondary': {
          borderColor: 'var(--secondary-color)',
        },
        '.font-jost': {
          fontFamily: 'Jost, sans-serif',
        },
        '.font-islandMoments': {
          fontFamily: 'Island Moments, cursive',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke': '.8px black',
        },
        '.text-stroke-black-2': {
          '-webkit-text-stroke': '.2px black',
        },
        '.text-stroke-white': {
          '-webkit-text-stroke': '.8px white',
        },
        '.text-shadow-secondary': {
          textShadow: '1px 1px 2px var(--primary-color)',
        },
      });
    }),
  ],
};

export default config;
