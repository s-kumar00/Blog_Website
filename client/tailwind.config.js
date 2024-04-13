/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}","node_modules/flowbite-react/lib/esm/**/*.js",],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#f0f2f5",
        secondary: "#ff813f",
        tertiary: "#222222",
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        spinText: {
          to: { transform: 'rotate(360deg)'}
        }
      },
      animation: {
        spinText: 'spinText 30s linear infinite',
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
