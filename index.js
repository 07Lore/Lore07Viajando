import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import FlightAlertApp from "./App";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<FlightAlertApp />);
} else {
  console.error("No se encontró el contenedor root en index.html");
}
