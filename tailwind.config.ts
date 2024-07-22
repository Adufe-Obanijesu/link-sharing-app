import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#633CFF",
          50: "#BEADFF",
          20: "#EFEBFF",
        },
        grey: {
          DEFAULT: "#737373",
          50: "#D9D9D9",
          20: "#FAFAFA",
        },
        dark: "#333333",
        ascent: "#FF3939",
      },
      fontFamily: {
        instr_sans: ["Instrument Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
