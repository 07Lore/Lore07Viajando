/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // busca clases en todo src
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        loreverde: "#00B894",     // Verde personalizado
        champagne: "#F5EBDD",     // Champagne
        naranja: "#FF6F00",       // Naranja
        grisoscuro: "#1E1E1E",    // Gris oscuro
      },
    },
  },
  plugins: [],
};

