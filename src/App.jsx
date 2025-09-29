
// src/App.jsx
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import FlightCard from "./components/FlightCard";
import Loader from "./components/Loader";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [flightsData, setFlightsData] = useState([]); // array of flights or legs
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [calendar, setCalendar] = useState([]);

  async function handleSearch(params) {
    setError(null);
    setLoading(true);
    setFlightsData([]);
    setRecommendation(null);
    setCalendar([]);
    try {
      const resp = await fetch("http://localhost:4000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || err.detail || "Error en backend");
      }
      const data = await resp.json();
      // Si multi: data.multi true y data.legs array
      if (data.multi && Array.isArray(data.legs)) {
        setFlightsData(data.legs);
      } else if (data.flights) {
        setFlightsData(data.flights);
      } else {
        setFlightsData([]);
      }
      setRecommendation(data.recommendedSave || "Consejos personalizados aparecerán aquí.");
      setCalendar(data.calendar || []);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error buscando vuelos: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-transparent text-white text-2xl font-bold">
              ✈️
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-orange-500">
                Lore07 Viajando
              </h1>
              <div className="text-sm font-bold text-stone-100">
                Tu App de Vuelos Inteligente
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <span className="px-3 py-1 rounded-full bg-[#F5EBDD] text-orange-500 font-bold border">
              Soporte: info@lore07viajando.com
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto">
        <SearchForm onSearch={handleSearch} />

        <section className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="text-lg font-semibold text-stone-100">Resultados</div>

              {loading && <Loader text="Buscando mejores opciones..." />}

              {error && (
                <div className="p-4 rounded-2xl bg-red-600/20 text-red-200 font-medium">
                  {error}
                </div>
              )}

              {!loading && !error && (!flightsData || flightsData.length === 0) && (
                <div className="p-6 rounded-2xl bg-gray-800/40 text-stone-100">
                  Los resultados aparecerán aquí. Probá con otro destino o buscá ofertas último momento.
                </div>
              )}

              <div className="space-y-6">
                {/* Multidestino: flightsData is array of {from,to,date,flights:[] } */}
                {Array.isArray(flightsData) && flightsData[0] && flightsData[0].flights ? (
                  flightsData.map((legResult, idx) => (
                    <div key={idx}>
                      <h3 className="text-stone-200 font-semibold mb-2">
                        Tramo {idx + 1}: {legResult.from} → {legResult.to} • {legResult.date}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {legResult.flights.map((f) => (
                          <FlightCard key={f.id} flight={f} />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  // Single list of flights
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(flightsData) &&
                      flightsData.map((f) => <FlightCard key={f.id} flight={f} />)}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT ASIDE */}
            <aside className="space-y-4">
              <button type="button" className="w-full text-left p-4 rounded-2xl bg-[#F5EBDD] cursor-pointer">
                <div className="font-extrabold text-lg mb-2 text-green-600">Tips para ahorrar en tus vuelos</div>
                <div className="mt-2 text-base leading-relaxed text-gray-900">{recommendation || "Sin tips por el momento."}</div>
              </button>

              <div className="p-4 rounded-2xl bg-[#F5EBDD] cursor-pointer">
                <div className="font-extrabold text-lg mb-2 text-green-600">Calendario con Mejores Precios</div>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-gray-900">
                  {calendar.length === 0 ? <div>No hay datos de calendario.</div> : calendar.map((c, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>{c.month} • <span className="font-semibold">{c.bestDay}</span></div>
                      <div className="font-bold">{c.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5EBDD] cursor-pointer">
                <div className="font-extrabold text-lg mb-2 text-green-600">Oportunidades en Premium/Business</div>
                <div className="mt-2 text-base leading-relaxed text-gray-900">Encontrá Upgrades y tarifas especiales para viajar como te mereces.</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5EBDD] cursor-pointer">
                <div className="font-extrabold text-lg mb-2 text-green-600">Link a Stopover</div>
                <div className="mt-2 text-base leading-relaxed text-gray-900">Contacto directo con la Aerolínea</div>
              </div>

              <div className="space-y-3">
                {["Filtros", "Ordenar", "Guardados"].map((txt, i) => (
                  <button key={i} type="button" className="w-full py-2 px-4 rounded-xl font-semibold shadow cursor-pointer" style={{ backgroundColor: "#F5EBDD", color: "orange" }}>
                    {txt}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Lore07 Viajando — Demo funcional (datos simulados).
        </footer>
      </main>
    </div>
  );
}
