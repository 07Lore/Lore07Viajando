/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pastelChampagne: "#F7E7CE",
        pastelAguamarina: "#3EB89A",
        loreVerde: "#20B486",
        fondoOscuro: "#0f1720",
        naranjaCard: "#FF7A3D",
        champagneText: "#F5E6D3"
      }
    }
  },
  plugins: []
};
