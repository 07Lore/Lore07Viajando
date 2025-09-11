import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="bg-orange-500 text-white rounded-2xl p-4 shadow-lg">
      {/* Encabezado de la card */}
      <div className="mb-3">
        <div className="text-lg font-bold text-gray-900">
          {flight.airline} — {flight.from} → {flight.to}
        </div>
        <div className="text-md font-bold text-gray-900">
          {flight.cabin} • {flight.price} {flight.currency}
        </div>
      </div>

      {/* Detalles */}
      <div className="space-y-1 text-sm">
        <div className="font-bold">
          <span className="underline">Salida:</span> {flight.depart}
        </div>
        <div className="font-bold">
          <span className="underline">Llegada:</span> {flight.arrive}
        </div>
        <div className="font-bold">
          <span className="underline">Duración:</span> {flight.duration}
        </div>

        {flight.stopover && (
          <div className="font-bold">
            <span className="underline">Stopover:</span> {flight.stopover.time} en {flight.stopover.city}
          </div>
        )}

        {flight.benefits && (
          <div className="font-bold">
            <span className="underline">Beneficios:</span> {flight.benefits}
          </div>
        )}

        <div className="font-bold">
          <span className="underline">Opciones de pago:</span>{" "}
          {flight.paymentOptions.join(", ")}
        </div>
      </div>

      {/* Botón comprar */}
      <div className="mt-4">
        <a
          href={flight.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center px-4 py-2 rounded-xl bg-loreverde text-pastelChampagne font-bold text-lg shadow-md hover:opacity-90 transition"
        >
          Comprar vuelo
        </a>
      </div>
    </div>
  );
}
