import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({ from: from || "EZE", to: to || "MAD", date: date || new Date().toISOString().slice(0,10), airline });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-4 md:p-6 bg-gray-800 text-pastelChampagne">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="text-sm font-medium opacity-90">Origen (IATA o ciudad)</label>
          <input value={from} onChange={(e)=>setFrom(e.target.value)}
                 placeholder="EZE, AEP, BUE o ciudad"
                 className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400" />
        </div>
        <div>
          <label className="text-sm font-medium opacity-90">Destino</label>
          <input value={to} onChange={(e)=>setTo(e.target.value)}
                 placeholder="MAD, NYC, MIA"
                 className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400"/>
        </div>
        <div>
          <label className="text-sm font-medium opacity-90">Fecha</label>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}
                 className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white" />
        </div>
        <div>
          <label className="text-sm font-medium opacity-90">Aerolínea (opcional)</label>
          <input value={airline} onChange={(e)=>setAirline(e.target.value)}
                 placeholder="KLM, IB, AA"
                 className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-400" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="submit" className="inline-flex items-center px-5 py-2 rounded-2xl bg-loreVerde text-white font-bold shadow">
          Buscar vuelos
        </button>

        <button type="button" onClick={() => onSearch({ quick: true })}
                className="text-sm text-pastelChampagne/90 hover:underline">
          Ver ofertas último momento
        </button>

        <div className="ml-auto text-sm opacity-80">Búsqueda inteligente: proponemos aeropuertos cercanos.</div>
      </div>
    </form>
  );
}
