import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        secondaryColor: '#FFBD59',
        backgroundBody : "#f5f5f5",
        bg_gray_light: "#f5f5f5",
        blackColor2: "#353535",
        footerTextColor : "#000",
        skeletonBg : '#EDEDED'
      }
    },
  },
  plugins: [],
};
export default config;
