
// src/components/SearchForm.jsx
import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("EZE");
  const [to, setTo] = useState("MAD");
  const [date, setDate] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [airline, setAirline] = useState("Todas / Cualquiera");
  const [stops, setStops] = useState("Cualquiera");
  const [multi, setMulti] = useState(false);
  const [legs, setLegs] = useState([{ from: "EZE", to: "MAD", date: "" }]);

  function submit(e) {
    e && e.preventDefault();
    if (multi) {
      onSearch && onSearch({ multi: true, legs, airline, stops, flexible });
    } else {
      onSearch && onSearch({ from, to, date: flexible ? null : date || null, flexible, airline, stops });
    }
  }

  function quick(e) {
    e && e.preventDefault();
    if (multi) {
      onSearch && onSearch({ multi: true, legs, quick: true, airline, stops });
    } else {
      onSearch && onSearch({ from, to, quick: true, date: flexible ? null : date || null, airline, stops });
    }
  }

  function nearby(e) {
    e && e.preventDefault();
    if (multi) {
      onSearch && onSearch({ multi: true, legs, nearby: true, airline, stops });
    } else {
      onSearch && onSearch({ from, to, nearby: true, date: flexible ? null : date || null, airline, stops });
    }
  }

  function tips(e) {
    e && e.preventDefault();
    onSearch && onSearch({ tips: true });
  }

  function addLeg() {
    setLegs([...legs, { from: "", to: "", date: "" }]);
  }
  function updateLeg(i, field, value) {
    const copy = [...legs]; copy[i][field] = value; setLegs(copy);
  }
  function removeLeg(i) { setLegs(legs.filter((_, idx) => idx !== i)); }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="w-full bg-gray-900/60 rounded-xl p-5">
        <div className="flex flex-wrap items-end gap-6">
          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Origen</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD]">
              <option>EZE</option><option>AEP</option><option>BUE</option>
            </select>
          </div>

          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Destino</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD]">
              <option>MAD</option><option>NYC</option><option>MIA</option>
            </select>
          </div>

          <div className="flex-shrink-0 min-w-[16rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Fecha</label>
            <div className="flex items-center gap-3">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 rounded bg-gray-800 text-[#F5EBDD]" />
              <label className="flex items-center gap-2 text-sm text-[#F5EBDD]">
                <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)} className="accent-emerald-400" /> <span className="text-sm">Flexible</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl space-y-4">
          <label className="flex items-center gap-2 text-[#F5EBDD] font-semibold">
            <input type="checkbox" checked={multi} onChange={(e) => setMulti(e.target.checked)} className="accent-emerald-400" /> Activar Multidestino
          </label>

          {multi && <div className="space-y-4">
            {legs.map((leg, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-700/50 p-3 rounded-lg">
                <input type="text" placeholder="Origen (ej: EZE)" value={leg.from} onChange={(e) => updateLeg(i, "from", e.target.value)} className="p-2 rounded bg-gray-700 text-[#F5EBDD] flex-1" />
                <input type="text" placeholder="Destino (ej: CDG)" value={leg.to} onChange={(e) => updateLeg(i, "to", e.target.value)} className="p-2 rounded bg-gray-700 text-[#F5EBDD] flex-1" />
                <input type="date" value={leg.date} onChange={(e) => updateLeg(i, "date", e.target.value)} className="p-2 rounded bg-gray-700 text-[#F5EBDD]" />
                <button type="button" onClick={() => removeLeg(i)} className="px-3 py-2 bg-red-500 text-white rounded">✕</button>
              </div>
            ))}
            <button type="button" onClick={addLeg} className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-bold shadow">➕ Agregar tramo</button>
          </div>}
        </div>

        <div className="mt-6 flex flex-wrap gap-6">
          <div className="flex-shrink-0 min-w-[14rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Aerolínea</label>
            <input type="text" value={airline} onChange={(e) => setAirline(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD]" />
          </div>

          <div className="flex-shrink-0 min-w-[12rem]">
            <label className="block text-sm font-bold text-emerald-300 mb-2">Escalas</label>
            <select value={stops} onChange={(e) => setStops(e.target.value)} className="w-full p-2 rounded bg-gray-800 text-[#F5EBDD]">
              <option>Cualquiera</option><option>0</option><option>1</option><option>2+</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="submit" className="px-8 py-3 rounded-lg bg-emerald-500 text-white font-bold shadow">Buscar Vuelos</button>
          <button type="button" onClick={quick} className="px-6 py-3 rounded-lg bg-orange-500 text-white font-bold shadow">Ofertas de Último Momento</button>
          <button type="button" onClick={nearby} className="px-6 py-3 rounded-lg bg-[#F5EBDD] text-gray-900 font-bold shadow">Opciones desde Aeropuertos Cercanos</button>
          
        </div>
      </div>
    </form>
  );
}
