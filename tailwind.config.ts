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
          75: "#737373",
          50: "#D9D9D9",
          20: "#FAFAFA",
        },
        lightgrey: "rgba(238, 238, 238, 1)",
        dark: "#333333",
        danger: "#FF3939",
      },
      boxShadow: {
        input: "0px 0px 32px 0px rgba(99, 60, 255, 0.25)",
      },
      fontFamily: {
        instr_sans: ["Instrument Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
