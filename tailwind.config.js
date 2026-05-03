/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3b82f6",
          dim: "#60a5fa",
          muted: "#1d4ed8",
        },
        surface: {
          base: "#f8fafc",
          card: "#ffffff",
          raised: "#f1f5f9",
          "dark-base": "#0c0c0e",
          "dark-card": "#141418",
          "dark-raised": "#1a1a22",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
