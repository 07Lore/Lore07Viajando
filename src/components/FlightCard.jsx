import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="p-6 rounded-2xl bg-orange-500 shadow-lg flex flex-col justify-between">
      {/* Aerolínea y Precio */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-extrabold text-[#F7E7CE] tracking-wide">
          {flight.airline}
        </h3>
        <div className="text-2xl font-extrabold text-[#F7E7CE] tracking-wide">
          {flight.currency} {flight.price}
        </div>
      </div>

      {/* Cabina */}
      <div className="font-semibold mb-4 text-lg text-[#F7E7CE] tracking-wide">
        {flight.cabin || "—"}
      </div>

      {/* Detalles */}
      <div className="space-y-2 text-base text-gray-800 leading-relaxed">
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
      <div className="mt-5">
        <a
          href={flight.buyLink || "#"}
          className="block w-full py-3 rounded-xl text-center font-bold bg-green-300 text-gray-900 hover:bg-green-400 text-lg"
        >
          Comprar
        </a>
      </div>
    </div>
  );
}
