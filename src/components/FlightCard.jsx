
// src/components/FlightCard.jsx
import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="p-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl shadow text-gray-900">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-bold">{flight.airline}</div>
          <div className="text-sm">{flight.from} → {flight.to}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold">${flight.price}</div>
          <div className="text-sm">{flight.currency}</div>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-800">
        {flight.date && <div>Fecha: {flight.date}</div>}
        {flight.depart && <div>Salida: {flight.depart}</div>}
        {flight.arrive && <div>Llega: {flight.arrive}</div>}
        {flight.duration && <div>Duración: {flight.duration}</div>}
        {flight.cabin && <div>Cabina: {flight.cabin}</div>}
        {flight.stopover && <div>Escalas: {flight.stopover.stops || "1+"}</div>}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a href={flight.buyLink || "#"} target="_blank" rel="noreferrer" className="px-3 py-2 bg-white/90 rounded font-bold text-orange-600">Comprar</a>
        <div className="text-xs text-gray-800">{(flight.paymentOptions || []).join(" • ")}</div>
      </div>
    </div>
  );
}
