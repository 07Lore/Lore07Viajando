import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("Cualquiera");
  const [to, setTo] = useState("Cualquiera");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [airline, setAirline] = useState("Todas / Cualquiera");
  const [stops, setStops] = useState("Cualquiera");

  function submit(e) {
    e?.preventDefault();
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
    e?.preventDefault();
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
    e?.preventDefault();
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
    <form
      onSubmit={submit}
      className="w-full rounded-xl p-6"
      style={{
        background: "rgba(255,255,255,0.05)",
      }}
    >
      {/* Línea con todos los filtros */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Origen */}
        <div className="flex flex-col">
          <label className="text-loreverde font-bold">Origen</label>
          <select
            className="p-2 rounded bg-gray-800 text-champagne"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="Cualquiera">Cualquiera</option>
            <option value="EZE">EZE</option>
            <option value="AEP">AEP</option>
            <option value="BUE">BUE</option>
          </select>
        </div>

        {/* Destino */}
        <div className="flex flex-col">
          <label className="text-loreverde font-bold">Destino</label>
          <select
            className="p-2 rounded bg-gray-800 text-champagne"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="Cualquiera">Cualquiera</option>
            <option value="MAD">MAD</option>
            <option value="NYC">NYC</option>
            <option value="MIA">MIA</option>
          </select>
        </div>

        {/* Fecha + Flexible */}
        <div className="flex flex-col">
          <label className="text-loreverde font-bold">Fecha</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="p-2 rounded bg-gray-800 text-champagne"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <label className="text-champagne text-sm flex items-center gap-1">
              <input
                type="checkbox"
                checked={flexible}
                onChange={(e) => setFlexible(e.target.checked)}
              />
              Flexible
            </label>
          </div>
        </div>

        {/* Aerolínea */}
        <div className="flex flex-col">
          <label className="text-loreverde font-bold">Aerolínea</label>
          <select
            className="p-2 rounded bg-gray-800 text-champagne"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          >
            <option value="Todas / Cualquiera">Todas / Cualquiera</option>
            <option value="KLM">KLM</option>
            <option value="IB">IB</option>
            <option value="AA">AA</option>
          </select>
        </div>

        {/* Escalas */}
        <div className="flex flex-col">
          <label className="text-loreverde font-bold">Escalas</label>
          <select
            className="p-2 rounded bg-gray-800 text-champagne"
            value={stops}
            onChange={(e) => setStops(e.target.value)}
          >
            <option value="Cualquiera">Cualquiera</option>
            <option value="0">0 (Directo)</option>
            <option value="1">1</option>
            <option value="2+">2 o más</option>
          </select>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          className="bg-loreverde text-champagne font-bold px-6 py-2 rounded-lg"
        >
          Buscar Vuelos
        </button>
        <button
          onClick={quick}
          type="button"
          className="bg-naranja text-champagne font-bold px-6 py-2 rounded-lg"
        >
          Ofertas de Último Momento
        </button>
        <button
          onClick={nearby}
          type="button"
          className="bg-champagne text-gray-900 font-bold px-6 py-2 rounded-lg"
        >
          Opciones desde Aeropuertos Cercanos
        </button>
      </div>
    </form>
  );
}
