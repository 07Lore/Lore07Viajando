import React from "react";
import Card from "./components/ui/Card";

export default function FlightAlertApp() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Flight Alert App</h1>
      <p>Tu app de prueba en React funciona 🎉</p>

      <Card title="Vuelo a Madrid" description="Salida 14:30 - Llegada 22:00" />
      <Card title="Vuelo a París" description="Salida 09:00 - Llegada 12:00" />
    </div>
  );
}
