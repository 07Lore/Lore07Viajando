
import React, { useState } from "react";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("EZE");
  const [destination, setDestination] = useState("MAD");
  const [date, setDate] = useState("2025-12-05");
  const [adults, setAdults] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, date, adults }),
      });

      if (!res.ok) throw new Error("Error al buscar vuelos");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("No se pudieron cargar vuelos. Verificá el backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-gray-800/60 text-stone-100 mt-6">
      <h2 className="text-xl font-bold mb-4 text-orange-400">🔎 Buscar vuelos (API Amadeus)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origen (EZE)"
          className="p-2 rounded text-black"
        />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destino (MAD)"
          className="p-2 rounded text-black"
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="p-2 rounded text-black"
        />
        <input
          value={adults}
          onChange={(e) => setAdults(e.target.value)}
          type="number"
          min="1"
          className="p-2 rounded text-black"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
      >
        Buscar
      </button>

      {/* Mensajes */}
      {loading && <p className="mt-4 text-yellow-300">Cargando vuelos...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* Resultados */}
      <h3 className="mt-6 text-lg font-bold">Resultados:</h3>
      <ul className="mt-2 space-y-2">
        {results.map((r, idx) => (
          <li key={idx} className="p-3 rounded bg-gray-700">
            {r.price?.total} {r.price?.currency} —{" "}
            {r.itineraries?.[0]?.segments?.[0]?.departure?.iataCode} →{" "}
            {r.itineraries?.[0]?.segments?.slice(-1)[0]?.arrival?.iataCode}
          </li>
        ))}
      </ul>
    </div>
  );
}

