/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],

  theme: {
    extend: {
      colors: {
        loreverde: "#00B894",     // Verde personalizado
        champagne: #F7E7CE",     // Champagne
        naranja: "#FF6F00",       // Naranja
        grisoscuro: "#1E1E1E",    // Gris oscuro
      },
    },
  },
  plugins: [],
};

