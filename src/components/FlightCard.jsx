import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="p-5 rounded-2xl bg-orange-500 text-gray-900 shadow-lg">
      {/* Aerolínea y Precio */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-extrabold text-champagne">{flight.airline}</h3>
        <div className="text-xl font-extrabold text-champagne">
          {flight.currency} {flight.price}
        </div>
      </div>

      {/* Cabina */}
      <div className="text-champagne font-bold mb-3">{flight.cabin || "—"}</div>

      {/* Detalles */}
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-bold text-gray-800">Salida:</span>{" "}
          <span>{flight.depart || "—"}</span>
        </div>
        <div>
          <span className="font-bold text-gray-800">Llegada:</span>{" "}
          <span>{flight.arrive || "—"}</span>
        </div>
        <div>
          <span className="font-bold text-gray-800">Duración:</span>{" "}
          <span>{flight.duration || "—"}</span>
        </div>
        <div>
          <span className="font-bold text-gray-800">Stopover:</span>{" "}
          <span>
            {flight.stopover
              ? `${flight.stopover.time} en ${flight.stopover.city}`
              : "—"}
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-800">Beneficios:</span>{" "}
          <span>{flight.benefits || "—"}</span>
        </div>
        <div>
          <span className="font-bold text-gray-800">Opciones de pago:</span>{" "}
          <span>{flight.paymentOptions?.join(" · ") || "—"}</span>
        </div>
      </div>

      {/* Botón */}
      <div className="mt-4">
        <a
          href={flight.buyLink || "#"}
          className="block w-full py-2 rounded-xl text-center font-bold bg-emerald-300 text-gray-900 hover:bg-emerald-400"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
