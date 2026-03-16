import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        doma: {
          violet: "#5E2D89",
          dark: "#390C4C",
          accent: "#00C9AF",
          light: "#EFCFFF",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mont: ["var(--font-mont)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
