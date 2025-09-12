/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        loreverde: "#00B894",     // tu verde personalizado
        champagne: "#F5EBDD",    // champagne
        naranja: "#FF6F00",      // naranja
        grisoscuro: "#1E1E1E",   // gris oscuro
      },
    },
  },
  plugins: [],
};
