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
    },
    screens: {
      "max-xs": { max: "389px" },
    },
  },
  plugins: [],
};
export default config;
