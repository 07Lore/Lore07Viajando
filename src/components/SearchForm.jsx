// src/components/SearchForm.jsx
import React, { useState } from "react";

/**
 * SearchForm
 * Props:
 *  - onSearch(params)  // function called when user busca / quick / nearby
 *
 * params object example:
 * { from, to, date, flexible, airline, stops, quick, nearby }
 */
export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("EZE");
  const [to, setTo] = useState("MAD");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [airline, setAirline] = useState(""); // empty = Todas / Cualquiera
  const [stops, setStops] = useState(""); // número de escalas (vacío = cualquiera)

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
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
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
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
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <option value="MAD">MAD</option>
            <option value="NYC">NYC</option>
            <option value="MIA">MIA</option>
            <option value="CUALQUIERA">Cualquiera</option>
          </select>
        </div>

        {/* Fecha + Flexible */}
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Fecha
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={flexible}
              className="rounded-md px-4 py-3 bg-[#0f1720] text-champagne w-full"
              style={{ border: "1px solid rgba(255,255,255,0.04)" }}
            />
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginLeft: 6,
                color: "#cbd5e1",
                fontSize: 14,
              }}
            >
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
        <div>
          <label className="block text-sm font-semibold text-[#00bfa5] mb-2">
            Aerolínea
          </label>
          <select
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="w-full rounded-md px-4 py-3 bg-[#0f1720] text-champagne"
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <option value="">Todas / Cualquiera</option>
            <option value="KLM">KLM</option>
            <option value="IB">Iberia (IB)</option>
            <option value="AF">Air France (AF)</option>
          </select>
        </div>
      </div>

      {/* Segunda fila: Escalas + botones */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        {/* Escalas */}
        <div style={{ width: 180 }}>
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
            style={{ border: "1px solid rgba(255,255,255,0.04)" }}
          />
        </div>

        {/* Buttons group */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button
            type="submit"
            onClick={submit}
            className="px-6 py-3 rounded-lg font-semibold"
            style={{
              background: "#00bfa5", // loreverde
              color: "#ffffff",
              boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
            }}
          >
            Buscar vuelos
          </button>

          <button
            type="button"
            onClick={quick}
            className="px-5 py-3 rounded-lg font-semibold"
            style={{
              background: "#f97316", // naranja
              color: "#fff",
              boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
            }}
          >
            Ver Ofertas Último Momento
          </button>

          {/* Champange button (Opciones desde Aeropuertos Cercanos) */}
          <button
            type="button"
            onClick={nearby}
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              background: "#f6e9da", // champagne
              color: "#213944", // gris oscuro del texto
              border: "1px solid rgba(0,0,0,0.06)",
            }}
            title="Opciones desde Aeropuertos Cercanos"
          >
            Opciones desde Aeropuertos Cercanos
          </button>
        </div>

        {/* espacio flexible */}
        <div style={{ flex: 1 }} />

        {/* pequeña leyenda a la derecha (opcional) */}
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
          Sugerencia: probá "Ofertas Último Momento" para oportunidades flash.
        </div>
      </div>
    </form>
  );
}
