import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="rounded-2xl p-4 md:p-6 shadow-lg bg-orange-500 text-pastelChampagne">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs opacity-80">Aerolínea</div>
          <div className="font-bold text-lg">{flight.airline}</div>
          <div className="text-sm opacity-90 mt-1">{flight.from} → {flight.to}</div>
        </div>

        <div className="text-right">
          <div className="text-xs opacity-80">Precio</div>
          <div className="text-2xl font-extrabold">{flight.currency} {flight.price}</div>
          <div className="text-sm opacity-90 mt-1">{flight.cabin}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-sm">
          <div>Salida: <span className="font-medium">{flight.depart}</span></div>
          <div>Llegada: <span className="font-medium">{flight.arrive}</span></div>
          <div>Duración: <span className="font-medium">{flight.duration}</span></div>
        </div>

        <div className="flex items-center gap-2">
          {flight.stopover && (
            <div className="text-xs px-2 py-1 rounded-md bg-pastelChampagne/20 text-pastelChampagne">
              Stopover: {flight.stopover.time} en {flight.stopover.city}
            </div>
          )}
          {flight.benefits && (
            <div className="text-xs px-2 py-1 rounded-md bg-pastelAguamarina/10 text-pastelAguamarina">
              Beneficios: {flight.benefits}
            </div>
          )}
          <a href={flight.buyLink} target="_blank" rel="noreferrer"
             className="inline-flex items-center px-3 py-2 rounded-2xl bg-loreVerde text-white text-sm font-semibold shadow-md hover:opacity-95">
            Comprar
          </a>
        </div>
      </div>

      <div className="mt-3 text-xs opacity-90">
        Opciones de pago: {flight.paymentOptions?.join(" · ")}
      </div>
    </div>
  );
}
