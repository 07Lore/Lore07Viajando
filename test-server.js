import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Hola Lore 🚀 Servidor básico funcionando");
});

app.listen(PORT, () => {
  console.log("Servidor de prueba escuchando en http://localhost:" + PORT);
});

