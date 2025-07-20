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
        primary: "#aaba5b",
        secondary: "#efe6ce",
        background: "#191d1e",
        highlight: "#D5E8A1",
        text: "#efe6ce",
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
