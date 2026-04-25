/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ["'Playfair Display'", 'serif'],
        sans: ["'DM Sans'", 'Arial', 'sans-serif'],
        btn:  ["'Montserrat'", 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};