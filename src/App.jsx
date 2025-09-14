// src/App.jsx
import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Loader from "./components/Loader";
import FlightCard from "./components/FlightCard";
import "./styles.css";

/* --- Mocked helper: simula búsqueda de vuelos (reemplazar por API real) --- */
function simulateFetchFlights(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (params && params.quick) {
        return resolve({
          flights: [
            {
              id: "last1",
              price: 420,
              currency: "USD",
              airline: "Iberia",
              from: "EZE",
              to: "MAD",
              depart: "2025-10-01 23:30",
              arrive: "2025-10-02 14:10",
              duration: "12h 40m",
              cabin: "Business - Oferta Último Momento",
              stopover: { time: "2h", city: "GRU" },
              benefits: "1 noche gratis en destino",
              buyLink: "https://example.com/buy/last1",
              paymentOptions: ["Tarjeta", "Cuotas", "Millas"]
            }
          ],
          recommendedSave: "Viajar martes suele ser 20% más barato",
          calendar: [
            { month: "Oct 2025", bestDay: "Mar 14", price: "USD 650" },
            { month: "Nov 2025", bestDay: "Mar 21", price: "USD 620" }
          ]
        });
      }

      // Si "to" es "nope" devolvemos vacío (simulación)
      if (params && params.to && params.to.toLowerCase() === "nope") {
        return resolve({ flights: [], recommendedSave: null, calendar: [] });
      }

      // Resultado simulado normal
      const base = [
        {
          id: "f1",
          price: 720,
          currency: "USD",
          airline: "KLM",
          from: (params && params.from) || "EZE",
          to: (params && params.to) || "MAD",
          depart: `${(params && params.date) || "2025-10-10"} 10:00`,
          arrive: `${(params && params.date) || "2025-10-10"} 22:00`,
          duration: "12h",
          cabin: "Economy",
          stopover: { time: "3h", city: "AMS" },
          benefits: "1-3 noches gratis en Ámsterdam",
          buyLink: "https://example.com/buy/f1",
          paymentOptions: ["Tarjeta", "Cuotas"]
        },
        {
          id: "f2",
          price: 980,
          currency: "USD",
          airline: "Air France",
          from: (params && params.from) || "EZE",
          to: (params && params.to) || "MAD",
          depart: `${(params && params.date) || "2025-10-10"} 06:00`,
          arrive: `${(params && params.date) || "2025-10-10"} 18:00`,
          duration: "12h",
          cabin: "Premium Economy",
          stopover: null,
          benefits: null,
          buyLink: "https://example.com/buy/f2",
          paymentOptions: ["Tarjeta", "Millas"]
        },
        {
          id: "f3",
          price: 1600,
          currency: "USD",
          airline: "Iberia",
          from: (params && params.from) || "EZE",
          to: (params && params.to) || "MAD",
          depart: `${(params && params.date) || "2025-10-10"} 09:00`,
          arrive: `${(params && params.date) || "2025-10-10"} 21:00`,
          duration: "12h",
          cabin: "Business",
          stopover: null,
          benefits: "Upgrade con diferencia mínima",
          buyLink: "https://example.com/buy/f3",
          paymentOptions: ["Tarjeta", "Cuotas", "Millas"]
        }
      ];

      // Filtro por aerolínea si viene
      let flights = base;
      if (params && params.airline) {
        // params.airline puede ser "Todas / Cualquiera" o nombre
        const al = params.airline.toString().toLowerCase();
        if (al && al !== "todas / cualquiera" && al !== "todas" && al !== "cualquiera") {
          flights = base.filter((f) =>
            f.airline.toLowerCase().includes(al)
          );
        }
      }

      const recommendedSave =
        "Conviene comprar con 60 días de anticipación para ahorrar hasta 25%.";

      resolve({ flights, recommendedSave, calendar: generateCheapCalendar() });
    }, 1000 + Math.random() * 600);
  });
}

function generateCheapCalendar() {
  return [
    { month: "Oct 2025", bestDay: "14 Oct", price: "USD 650" },
    { month: "Nov 2025", bestDay: "21 Nov", price: "USD 620" }
  ];
}

/* --- App principal --- */
export default function App() {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [calendar, setCalendar] = useState([]);

  async function handleSearch(params) {
    setError(null);
    setLoading(true);
    setFlights([]);
    setRecommendation(null);
    setCalendar([]);
    try {
      const data = await simulateFetchFlights(params || {});
      if (!data || !data.flights || data.flights.length === 0) {
        setError("No hay vuelos disponibles para esos parámetros.");
        setFlights([]);
      } else {
        setFlights(data.flights);
      }
      setRecommendation(data.recommendedSave || null);
      setCalendar(data.calendar || []);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error buscando vuelos. Intentá nuevamente.");
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
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-300 text-white text-2xl font-bold">
              ✈️
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-orange-500">
                Lore07 Viajando
              </h1>
              <div className="text-sm font-bold text-champagne">
                Tu App de Vuelos Inteligente
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <span className="px-3 py-1 rounded-full bg-champagne text-orange-500 font-bold border">
              Soporte: info@lore07viajando.com
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto">
        {/* Search form */}
        <SearchForm onSearch={handleSearch} />

        {/* Section results */}
        <section className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: results (span 2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="text-lg font-semibold text-champagne">Resultados</div>

              {loading && <Loader text="Buscando mejores opciones..." />}

              {error && (
                <div className="p-4 rounded-2xl bg-red-600/20 text-red-200 font-medium">
                  {error}
                </div>
              )}

              {!loading && !error && flights.length === 0 && (
                <div className="p-6 rounded-2xl bg-gray-800/40 text-champagne">
                  Los resultados aparecerán aquí. Probá con otro destino o buscá ofertas último momento.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flights.map((f) => (
                  <FlightCard key={f.id} flight={f} />
                ))}
              </div>
            </div>

           {/* Right: sidebar */}
<aside className="space-y-4">
  {/* Tips (clickeable) */}
  <button
    type="button"
    onClick={() => { /* acción Tips (opcional) */ }}
    className="w-full text-left p-4 rounded-2xl bg-champagne cursor-pointer focus:outline-none focus:ring-2 focus:ring-loreverde"
    style={{ backgroundColor: "#F7E7CE" }} // fallback en caso de que bg-champagne no se genere
  >
    <div className="text-loreverde font-extrabold text-lg mb-2" style={{ color: "#00B894" }}>
      Tips
    </div>
    <div className="mt-2 text-base text-grisoscuro leading-relaxed" style={{ color: "#1E1E1E" }}>
      {recommendation || "Sin tips por el momento."}
    </div>
  </button>

  {/* Calendario */}
  <div className="p-4 rounded-2xl bg-champagne" style={{ backgroundColor: "#F7E7CE" }}>
    <div className="text-loreverde font-extrabold text-lg mb-2" style={{ color: "#00B894" }}>
      Calendario con Mejores Precios
    </div>
    <div className="mt-3 space-y-3 text-base text-grisoscuro leading-relaxed" style={{ color: "#1E1E1E" }}>
      {calendar.length === 0 ? (
        <div>No hay datos de calendario.</div>
      ) : (
        calendar.map((c, i) => (
          <div key={i} className="flex items-center justify-between">
            <div>{c.month} • <span className="font-semibold">{c.bestDay}</span></div>
            <div className="font-bold">{c.price}</div>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Premium / Business */}
  <div className="p-4 rounded-2xl bg-champagne" style={{ backgroundColor: "#F7E7CE" }}>
    <div className="text-loreverde font-extrabold text-lg mb-2" style={{ color: "#00B894" }}>
      Oportunidades en Premium/Business
    </div>
    <div className="mt-2 text-base text-grisoscuro leading-relaxed" style={{ color: "#1E1E1E" }}>
      Encontrá Upgrades y tarifas especiales para viajar como te mereces.
    </div>
  </div>

  {/* Stopover */}
  <div className="p-4 rounded-2xl bg-red-500">
  <div className="text-emerald-300 font-extrabold text-lg mb-2">Tips</div>
  <div className="mt-2 text-base text-gray-800 leading-relaxed">
    {recommendation || "Sin tips por el momento."}
  </div>
</div>


  {/* Botones extras (mismo estilo champagne) */}
  <div className="space-y-3">
    <button
      type="button"
      onClick={() => { /* acción filtros */ }}
      className="w-full py-2 px-4 rounded-xl font-semibold shadow cursor-pointer hover:bg-naranja"
      style={{ backgroundColor: "#F7E7CE", color: "#1E1E1E" }}
    >
      Filtros
    </button>

    <button
      type="button"
      onClick={() => { /* acción ordenar */ }}
      className="w-full py-2 px-4 rounded-xl font-semibold shadow cursor-pointer hover:bg-naranja"
      style={{ backgroundColor: "#F7E7CE", color: "#1E1E1E" }}
    >
      Ordenar
    </button>

    <button
      type="button"
      onClick={() => { /* acción guardados */ }}
      className="w-full py-2 px-4 rounded-xl font-semibold shadow cursor-pointer hover:bg-naranja"
      style={{ backgroundColor: "#F7E7CE", color: "#1E1E1E" }}
    >
      Guardados
    </button>
  </div>
</aside>


               
          </div> {/* <-- cierre del grid */}
        </section> {/* <-- cierre de la sección */}

        {/* FOOTER */}
        <footer className="mt-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Lore07 Viajando — Demo funcional (datos simulados).
        </footer>
