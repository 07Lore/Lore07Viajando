import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="p-5 rounded-2xl bg-orange-500 shadow-lg flex flex-col justify-between">
      {/* Aerolínea y Precio */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-extrabold text-[#F7E7CE]">
          {flight.airline}
        </h3>
        <div className="text-xl font-extrabold text-[#F7E7CE]">
          {flight.currency} {flight.price}
        </div>
      </div>

      {/* Cabina */}
      <div className="font-semibold mb-3 text-[#F7E7CE]">
        {flight.cabin || "—"}
      </div>

      {/* Detalles */}
      <div className="space-y-1 text-sm text-gray-800">
        <div>
          <span className="font-bold">Salida:</span>{" "}
          <span>{flight.depart || "—"}</span>
        </div>
        <div>
          <span className="font-bold">Llegada:</span>{" "}
          <span>{flight.arrive || "—"}</span>
        </div>
        <div>
          <span className="font-bold">Duración:</span>{" "}
          <span>{flight.duration || "—"}</span>
        </div>
        <div>
          <span className="font-bold">Stopover:</span>{" "}
          <span>
            {flight.stopover
              ? `${flight.stopover.time} en ${flight.stopover.city}`
              : "—"}
          </span>
        </div>
        <div>
          <span className="font-bold">Beneficios:</span>{" "}
          <span>{flight.benefits || "—"}</span>
        </div>
        <div>
          <span className="font-bold">Opciones de pago:</span>{" "}
          <span>{flight.paymentOptions?.join(" · ") || "—"}</span>
        </div>
      </div>

      {/* Botón */}
      <div className="mt-4">
        <a
          href={flight.buyLink || "#"}
          className="block w-full py-2 rounded-xl text-center font-bold bg-green-300 text-gray-900 hover:bg-green-400"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
