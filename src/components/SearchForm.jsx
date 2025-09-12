import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("Cualquiera");
  const [to, setTo] = useState("Cualquiera");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [airline, setAirline] = useState("Todas / Cualquiera");
  const [stops, setStops] = useState("Cualquiera");

  function submit(e) {
    if (e) e.preventDefault();
    onSearch &&
      onSearch({
        from,
        to,
        date: flexible ? null : date || null,
        flexible,
        airline,
        stops,
      });
  }

  function quick(e) {
    if (e) e.preventDefault();
    onSearch &&
      onSearch({
        from,
        to,
        date: flexible ? null : date || null,
        flexible,
        airline,
        stops,
        quick: true,
      });
  }

  function nearby(e) {
    if (e) e.preventDefault();
    onSearch &&
      onSearch({
        from,
        to,
        date: flexible ? null : date || null,
        flexible,
        airline,
        stops,
        nearby: true,
      });
  }

  return (
    <form onSubmit={submit} className="w-full">
      {/* contenedor oscuro del form */}
      <div className="w-full bg-gray-900/60 rounded-xl p-5">
        {/* Fila única: flex-nowrap + overflow-x-auto para que no se rompa en varias líneas */}
        <div className="flex flex-nowrap items-end gap-6 overflow-x-auto">
          {/* Origen */}
          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Origen</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none"
            >
              <option value="Cualquiera">Cualquiera</option>
              <option value="EZE">EZE</option>
              <option value="AEP">AEP</option>
              <option value="BUE">BUE</option>
            </select>
          </div>

          {/* Destino */}
          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Destino</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none"
            >
              <option value="Cualquiera">Cualquiera</option>
              <option value="MAD">MAD</option>
              <option value="NYC">NYC</option>
              <option value="MIA">MIA</option>
            </select>
          </div>

          {/* Fecha (+ Flexible dentro del campo) */}
          <div className="flex-shrink-0 min-w-[16rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Fecha</label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none"
              />
              <label className="flex items-center gap-2 text-sm text-[#F5EBDD]">
                <input
                  type="checkbox"
                  checked={flexible}
                  onChange={(e) => setFlexible(e.target.checked)}
                  className="accent-emerald-400"
                />
                <span className="text-sm">Flexible</span>
              </label>
            </div>
          </div>

          {/* Aerolínea */}
          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Aerolínea</label>
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none"
            >
              <option value="Todas / Cualquiera">Todas / Cualquiera</option>
              <option value="KLM">KLM</option>
              <option value="IB">IB</option>
              <option value="AA">AA</option>
            </select>
          </div>

          {/* Escalas */}
          <div className="flex-shrink-0 min-w-[12rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Escalas</label>
            <select
              value={stops}
              onChange={(e) => setStops(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none"
            >
              <option value="Cualquiera">Cualquiera</option>
              <option value="0">0 (Directo)</option>
              <option value="1">1</option>
              <option value="2+">2 o más</option>
            </select>
          </div>
        </div>

        {/* Botones: en una línea abajo; si necesitas que estén en la misma fila superior lo adaptamos */}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-bold shadow"
            aria-label="Buscar Vuelos"
          >
            Buscar Vuelos
          </button>

          <button
            type="button"
            onClick={quick}
            className="px-6 py-3 rounded-lg bg-orange-500 text-white font-bold shadow"
          >
            Ofertas de Último Momento
          </button>

          <button
            type="button"
            onClick={nearby}
            className="px-6 py-3 rounded-lg bg-[#F5EBDD] text-gray-900 font-bold shadow"
          >
            Opciones desde Aeropuertos Cercanos
          </button>
        </div>
      </div>
    </form>
  );
}
