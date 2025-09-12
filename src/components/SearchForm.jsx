import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("EZE");
  const [to, setTo] = useState("MAD");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [airline, setAirline] = useState("");
  const [stops, setStops] = useState("");

  function submit(e) {
    e?.preventDefault();
    onSearch &&
      onSearch({
        from,
        to,
        date: flexible ? null : date || null,
        flexible,
        airline: airline || null,
        stops: stops === "" ? null : Number(stops),
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
        airline: airline || null,
        stops: stops === "" ? null : Number(stops),
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
        airline: airline || null,
        stops: stops === "" ? null : Number(stops),
        nearby: true,
      });
  }

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-xl p-6"
      style={{
        background: "rgba(255,255,255,0.02)",
        boxShadow: "0 6px 18px rgba(2,6,23,0.6)",
      }}
    >
      {/* Primera fila: Origen, Destino, Fecha, Aerolínea, Escalas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 14,
          alignItems: "end",
        }}
      >
        {/* Origen */}
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Origen
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-[#0f1720] text-champagne"
          >
            <option value="EZE">EZE</option>
            <option value="AEP">AEP</option>
            <option value="BUE">BUE</option>
            <option value="CUALQUIERA">Cualquiera</option>
          </select>
        </div>

        {/* Destino */}
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Destino
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-[#0f1720] text-champagne"
          >
            <option value="MAD">MAD</option>
            <option value="NYC">NYC</option>
            <option value="MIA">MIA</option>
            <option value="CUALQUIERA">Cualquiera</option>
          </select>
        </div>

        {/* Fecha con Flexible */}
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={flexible}
            className="rounded-md px-4 py-3 bg-[#0f1720] text-champagne w-full"
          />
          <label className="block mt-1 text-xs text-champagne font-medium">
            <input
              type="checkbox"
              checked={flexible}
              onChange={(e) => setFlexible(e.target.checked)}
              className="mr-1"
            />
            Flexible
          </label>
        </div>

        {/* Aerolínea */}
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Aerolínea
          </label>
          <select
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-[#0f1720] text-champagne"
          >
            <option value="">Todas / Cualquiera</option>
            <option value="KLM">KLM</option>
            <option value="IB">Iberia</option>
            <option value="AF">Air France</option>
          </select>
        </div>

        {/* Escalas */}
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Escalas
          </label>
          <input
            type="number"
            min="0"
            placeholder="Cualquiera"
            value={stops}
            onChange={(e) => setStops(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-[#0f1720] text-champagne"
          />
        </div>
      </div>

      {/* Botones */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          onClick={submit}
          className="px-10 py-3 rounded-lg font-semibold"
          style={{
            background: "#00bfa5",
            color: "#ffffff",
            boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
          }}
        >
          Buscar Vuelos
        </button>

        <button
          type="button"
          onClick={quick}
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            background: "#f97316",
            color: "#fff",
            boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
          }}
        >
          Ofertas de Último Momento
        </button>

        <button
          type="button"
          onClick={nearby}
          className="px-5 py-3 rounded-lg font-medium"
          style={{
            background: "#f6e9da",
            color: "#213944",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          Opciones desde Aeropuertos Cercanos
        </button>
      </div>
    </form>
  );
}
