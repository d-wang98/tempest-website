import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Zalando Sans Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        title: ["Zalando Sans Variable", "ui-sans-serif", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;
