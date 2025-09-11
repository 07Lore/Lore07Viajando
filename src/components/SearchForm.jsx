import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("EZE");
  const [to, setTo] = useState("MAD");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ from, to, date, airline });
  }

  function handleLastMinute() {
    onSearch({ quick: true });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-pastelChampagne rounded-2xl p-6 shadow-lg space-y-4"
    >
      {/* Origen */}
      <div>
        <label className="block text-loreverde font-bold mb-1">Origen</label>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-2 rounded-xl text-gray-900"
          placeholder="Ej: EZE"
        />
      </div>

      {/* Destino */}
      <div>
        <label className="block text-loreverde font-bold mb-1">Destino</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-2 rounded-xl text-gray-900"
          placeholder="Ej: MAD"
        />
      </div>

      {/* Fecha */}
      <div>
        <label className="block text-loreverde font-bold mb-1">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded-xl text-gray-900"
        />
      </div>

      {/* Aerolínea */}
      <div>
        <label className="block text-loreverde font-bold mb-1">Aerolínea</label>
        <input
          type="text"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
          className="w-full p-2 rounded-xl text-gray-900"
          placeholder="Ej: KLM"
        />
      </div>

      {/* Botones */}
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 rounded-2xl bg-loreverde text-pastelChampagne font-bold text-lg shadow-md hover:opacity-90 transition"
        >
          Buscar vuelos
        </button>

        <button
          type="button"
          onClick={handleLastMinute}
          className="flex-1 px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-lg shadow-md hover:opacity-90 transition"
        >
          Ver ofertas último momento
        </button>
      </div>
    </form>
  );
}
