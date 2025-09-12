import React from "react";

export default function FlightCard({ flight }) {
  if (!flight) return null;

  return (
    <div className="bg-[#FF6B00] rounded-2xl p-5 shadow-md text-sm text-[#222] flex flex-col gap-2">
      {/* Aerolínea + Precio */}
      <div className="text-[#F5EBDD] font-extrabold text-xl flex justify-between items-center">
        <span>{flight.airline}</span>
        <span>USD {flight.price}</span>
      </div>

      {/* Clase de cabina */}
      <div className="text-[#F5EBDD] font-bold text-base mb-2">
        {flight.cabin}
      </div>

      {/* Salida */}
      <div className="flex justify-between">
        <span className="font-bold text-gray-900">Salida:</span>
        <span className="text-gray-900">{flight.depart}</span>
      </div>

      {/* Llegada */}
      <div className="flex justify-between">
        <span className="font-bold text-gray-900">Llegada:</span>
        <span className="text-gray-900">{flight.arrive}</span>
      </div>

      {/* Duración */}
      <div className="flex justify-between">
        <span className="font-bold text-gray-900">Duración:</span>
        <span className="text-gray-900">{flight.duration}</span>
      </div>

      {/* Escala (stopover) */}
      {flight.stopover && (
        <div className="flex justify-between">
          <span className="font-bold text-gray-900">Stopover:</span>
          <span className="text-gray-900">
            {flight.stopover.time} en {flight.stopover.city}
          </span>
        </div>
      )}

      {/* Beneficios */}
      {flight.benefits && (
        <div className="flex justify-between">
          <span className="font-bold text-gray-900">Beneficios:</span>
          <span className="text-gray-900">{flight.benefits}</span>
        </div>
      )}

      {/* Opciones de pago */}
      {flight.paymentOptions && (
        <div className="flex justify-between">
          <span className="font-bold text-gray-900">Opciones de pago:</span>
          <span className="text-gray-900">{flight.paymentOptions.join(" • ")}</span>
        </div>
      )}

      {/* Botón Comprar */}
      <div className="mt-4">
        <a
          href={flight.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 rounded-lg bg-emerald-500 font-bold text-[#F5EBDD] hover:bg-emerald-600 transition"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
