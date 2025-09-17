import React, { useState } from "react";

function FlightSearch() {
  const [origin, setOrigin] = useState("EZE");
  const [destination, setDestination] = useState("MAD");
  const [date, setDate] = useState("2025-12-05");
  const [adults, setAdults] = useState(1);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, date, adults })
    });
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <h2>Buscar vuelos</h2>
      <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Origen (EZE)" />
      <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destino (MAD)" />
      <input value={date} onChange={e => setDate(e.target.value)} type="date" />
      <input value={adults} onChange={e => setAdults(e.target.value)} type="number" min="1" />
      <button onClick={handleSearch}>Buscar</button>

      <h3>Resultados:</h3>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            {r.price.total} {r.price.currency} — {r.itineraries[0].segments[0].departure.iataCode} → {r.itineraries[0].segments.slice(-1)[0].arrival.iataCode}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightSearch;
