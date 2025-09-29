 
// server/index.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 4000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Hola Lore 🚀 Backend funcionando en el puerto " + PORT);
});

// Ruta de test
app.get("/test", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente 🎉" });
});

app.listen(PORT, () => {
  console.log("Servidor escuchando en http://localhost:" + PORT);
});
