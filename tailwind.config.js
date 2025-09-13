// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        loreverde: "#00B894",
        champagne: "#F7E7CE",
        naranja: "#FF6F00",
        grisoscuro: "#1E1E1E"
      }
    }
  },
  plugins: [],
};
