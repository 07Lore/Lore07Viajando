
// src/components/SearchForm.jsx
import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("Cualquiera");
  const [to, setTo] = useState("Cualquiera");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [airline, setAirline] = useState("Todas / Cualquiera");
  const [stops, setStops] = useState("Cualquiera");
  const [multidest, setMultidest] = useState(false);
  const [destinations, setDestinations] = useState(["Cualquiera"]); // si multidest true, usa este array

  // construir payload común
  function buildPayload(extra = {}) {
    const payload = {
      from,
      airline,
      flexible,
      stops,
      date: flexible ? null : date || null,
      ...extra
    };

    if (multidest) {
      // limpiamos destinos vacíos y pasamos array
      payload.multiDest = destinations.filter((d) => !!d && d !== "Cualquiera");
      // para compatibilidad también dejamos 'to' como el primer valor si existe
      payload.to = payload.multiDest.length > 0 ? payload.multiDest[0] : "Cualquiera";
    } else {
      payload.to = to;
    }

    return payload;
  }

  function submit(e) {
    if (e) e.preventDefault();
    const payload = buildPayload();
    console.log("SEARCH PAYLOAD", payload);
    onSearch && onSearch(payload);
  }

  function quick(e) {
    if (e) e.preventDefault();
    const payload = buildPayload({ quick: true });
    console.log("SEARCH PAYLOAD (quick)", payload);
    onSearch && onSearch(payload);
  }

  function nearby(e) {
    if (e) e.preventDefault();
    const payload = buildPayload({ nearby: true });
    console.log("SEARCH PAYLOAD (nearby)", payload);
    onSearch && onSearch(payload);
  }

  // multidest handlers
  function addDestination() {
    if (destinations.length >= 3) return; // límite 3
    setDestinations([...destinations, "Cualquiera"]);
  }
  function updateDestination(i, val) {
    const arr = [...destinations];
    arr[i] = val;
    setDestinations(arr);
  }
  function removeDestination(i) {
    const arr = destinations.filter((_, idx) => idx !== i);
    setDestinations(arr.length ? arr : ["Cualquiera"]);
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="w-full bg-gray-900/60 rounded-xl p-5">
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

          {/* Destino (o multidestinations) */}
          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Destino</label>

            {!multidest ? (
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
            ) : (
              <div className="space-y-2">
                {destinations.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <select
                      value={d}
                      onChange={(e) => updateDestination(i, e.target.value)}
                      className="p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none min-w-[12rem]"
                    >
                      <option value="Cualquiera">Cualquiera</option>
                      <option value="MAD">MAD</option>
                      <option value="NYC">NYC</option>
                      <option value="MIA">MIA</option>
                      <option value="LON">LON</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeDestination(i)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      title="Quitar destino"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <div>
                  <button
                    type="button"
                    onClick={addDestination}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                    disabled={destinations.length >= 3}
                  >
                    + Agregar destino (máx 3)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Fecha (+ Flexible) */}
          <div className="flex-shrink-0 min-w-[16rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Fecha</label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 rounded bg-gray-800 text-[#F5EBDD] outline-none"
                disabled={flexible}
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
              <option value="Ninguna">Ninguna</option>
              <option value="1">1</option>
              <option value="2+">2 o más</option>
            </select>
          </div>
        </div>

        {/* Multidest toggle + botones */}
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-[#F5EBDD]">
            <input
              type="checkbox"
              checked={multidest}
              onChange={(e) => setMultidest(e.target.checked)}
              className="accent-emerald-400"
            />
            <span>Multidestino</span>
          </label>

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
