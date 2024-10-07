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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'island': ['IslandMoments', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({addUtilities}) {
      addUtilities({
        '.font-jost': {
          fontFamily: 'var(--font-primary)',
        },
        '.font-island': {
          fontFamily: 'var(--font-secondary)',
        },
      });
    }),
  ],
};
export default config;
