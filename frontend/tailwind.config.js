/** @type {import('tailwindcss').Config} */
export default {
  content: ["./main.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      heading: "'Titillium Web'",
      context: "'Rubik'",
    },
    extend: {
      colors: {
        primary: "#A9B665",
        secondary: "#EBDBB2",
        background: "#1D2021",
        highlight: "#D5E8A1",
        text: "#EBDBB2",
        dark: "#141414",
        mid: "#ebebeb",
        light: "#ffffff",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "spin-slower": "spin 3s linear infinite",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  darkMode: "class",
};
