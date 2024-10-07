import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neodunggeunmo: ["NeoDunggeunmo", "sans-serif"],
      },
      animation: {
        fade: "fade 3s ease-in-out infinite",
      },
      keyframes: {
        fade: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
    screens: {
      "max-xs": { max: "389px" },
    },
  },
  plugins: [],
};
export default config;
