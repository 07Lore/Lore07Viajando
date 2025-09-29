
// src/components/Results.jsx
import React from "react";

export default function Results({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No hay resultados todavía. Inicia una búsqueda ✈️
      </p>
    );
  }

  // Si son tips (detectamos por la key "tip")
  if (data[0].tip) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-purple-400 mb-4 text-center">
          💡 Consejos para tus vuelos
        </h2>
        <ul className="space-y-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-gray-800/70 rounded-lg border border-purple-500/40 shadow"
            >
              <p className="text-lg text-gray-200">{item.tip}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Si son vuelos
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4 text-center">
        ✈️ Resultados de búsqueda
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {data.map((flight) => (
          <div
            key={flight.id}
            className="p-5 bg-gray-800/70 rounded-xl shadow border border-emerald-500/40"
          >
            <p className="text-lg font-semibold text-gray-100">
              {flight.from} → {flight.to}
            </p>
            {flight.date && (
              <p className="text-sm text-gray-400">Fecha: {flight.date}</p>
            )}
            <p className="text-sm text-gray-400">
              Aerolínea: {flight.airline || "Cualquiera"}
            </p>
            <p className="text-xl font-bold text-emerald-300 mt-2">
              ${flight.price} USD
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
