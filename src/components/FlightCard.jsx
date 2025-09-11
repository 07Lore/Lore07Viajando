import React from "react";

export default function FlightCard({ flight }) {
  // flight: {price, currency, airline, from, to, depart, arrive, duration, cabin, stopover, benefits, buyLink}
  return (
    <div className="card p-4 md:p-6 rounded-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-gray-500">Aerolínea</div>
          <div className="font-bold text-lg">{flight.airline}</div>
          <div className="text-sm text-gray-600 mt-1">{flight.from} → {flight.to}</div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-500">Precio</div>
          <div className="text-2xl font-extrabold">{flight.currency} {flight.price}</div>
          <div className="text-sm text-gray-600 mt-1">{flight.cabin}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-sm text-gray-700">
          <div>Salida: <span className="font-medium">{flight.depart}</span></div>
          <div>Llegada: <span className="font-medium">{flight.arrive}</span></div>
          <div>Duración: <span className="font-medium">{flight.duration}</span></div>
        </div>

        <div className="flex items-center gap-2">
          {flight.stopover && (
            <div className="text-xs px-2 py-1 rounded-md bg-pastelChampagne border border-gray-200">
              Stopover: {flight.stopover.time} en {flight.stopover.city}
            </div>
          )}
          {flight.benefits && (
            <div className="text-xs px-2 py-1 rounded-md bg-pastelAguamarina/10 text-pastelAguamarina">
              Beneficios: {flight.benefits}
            </div>
          )}
          <a href={flight.buyLink} target="_blank" rel="noreferrer"
             className="inline-flex items-center px-3 py-2 rounded-2xl bg-pastelOrange text-white text-sm font-semibold shadow-md hover:opacity-95">
            Comprar
          </a>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Opciones de pago: {flight.paymentOptions?.join(" · ")}
      </div>
    </div>
  );
}
