import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="rounded-2xl shadow-md p-4 bg-orange-500 text-white flex flex-col gap-3">
      {/* Encabezado: aerolínea + ruta */}
      <div className="text-gray-900 font-bold text-lg">
        {flight.airline} • {flight.from} → {flight.to}
      </div>

      {/* Precio */}
      <div className="text-2xl font-extrabold">
        {flight.currency} {flight.price}
      </div>

      {/* Detalles */}
      <div className="text-sm font-bold">
        <p>Salida: {flight.depart}</p>
        <p>Llegada: {flight.arrive}</p>
        <p>Duración: {flight.duration}</p>
        {flight.stopover && (
          <p>
            Stopover: {flight.stopover.city} ({flight.stopover.time})
          </p>
        )}
        {flight.benefits && <p>Beneficios: {flight.benefits}</p>}
      </div>

      {/* Cabina */}
      <div className="italic font-bold text-sm">{flight.cabin}</div>

      {/* Opciones de pago */}
      {flight.paymentOptions && (
        <div className="text-sm font-bold">
          Opciones de pago: {flight.paymentOptions.join(", ")}
        </div>
      )}

      {/* Botón comprar */}
      <a
        href={flight.buyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-center bg-loreverde text-white font-bold px-4 py-2 rounded-xl hover:opacity-90 transition"
      >
        Comprar
      </a>
    </div>
  );
}
