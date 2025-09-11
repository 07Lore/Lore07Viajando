import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Loader from "./components/Loader";
import FlightCard from "./components/FlightCard";

/* --- Mock helper: simula búsqueda (reemplazar por API real) --- */
function simulateFetchFlights(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const base = [
        {
          id: "f1",
          price: 720,
          currency: "USD",
          airline: "KLM",
          from: params.from || "EZE",
          to: params.to || "MAD",
          depart: `${params.date || "2025-10-10"} 10:00`,
          arrive: `${params.date || "2025-10-10"} 22:00`,
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
          from: params.from || "EZE",
          to: params.to || "MAD",
          depart: `${params.date || "2025-10-10"} 06:00`,
          arrive: `${params.date || "2025-10-10"} 18:00`,
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
          from: params.from || "EZE",
          to: params.to || "MAD",
          depart: `${params.date || "2025-10-10"} 09:00`,
          arrive: `${params.date || "2025-10-10"} 21:00`,
          duration: "12h",
          cabin: "Business",
          stopover: null,
          benefits: "Upgrade con diferencia mínima",
          buyLink: "https://example.com/buy/f3",
          paymentOptions: ["Tarjeta", "Cuotas", "Millas"]
        }
      ];

      resolve({
        flights: base,
        recommendedSave: "Conviene comprar con 60 días de anticipación para ahorrar hasta 25%.",
        calendar: [
          { month: "Oct 2025", bestDay: "Mar 14", price: "USD 650" },
          { month: "Nov 2025", bestDay: "Mar 21", price: "USD 620" }
        ]
      });
    }, 1200);
  });
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
      const data = await simulateFetchFlights(params);
      if (!data || !data.flights || data.flights.length === 0) {
        setError("No hay vuelos disponibles para esos parámetros.");
        setFlights([]);
      } else {
        setFlights(data.flights);
      }
      setRecommendation(data.recommendedSave || null);
      setCalendar(data.calendar || []);
    } catch {
      setError("Ocurrió un error buscando vuelos. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pastelAguamarina flex items-center justify-center text-white text-xl font-bold">✈️</div>
            <div>
              {/* Título en naranja */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-orange-500">Lore07 Viajando</h1>
              {/* Subtítulo champagne negrita */}
              <div className="text-sm font-bold text-pastelChampagne">
                Tu app para encontrar vuelos y oportunidades (premium, upgrades, ofertas último momento).
              </div>
            </div>
          </div>
          <div className="hidden md:block text-sm">
            {/* soporte → texto naranja negrita */}
            <span className="px-3 py-1 rounded-full bg-pastelChampagne border font-bold text-orange-500">
              Soporte: info@lore07viajando.com
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto mt-6 space-y-6">
        <SearchForm onSearch={handleSearch} />

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="text-lg font-semibold text-pastelChampagne">Resultados</div>

              {loading && <Loader text="Buscando mejores opciones..." />}
              {error && <div className="p-4 rounded-2xl border border-red-100 bg-red-50 text-red-800">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flights.map((f) => (
                  <FlightCard key={f.id} flight={f} />
                ))}
              </div>
            </div>

            {/* LADO DERECHO */}
            <aside className="space-y-4">
              {/* Fondo champagne, títulos verde, texto gris */}
              <div className="p-4 rounded-2xl bg-pastelChampagne">
                <div className="text-sm font-bold text-loreverde">Recomendación inteligente</div>
                <div className="mt-2 text-sm text-gray-700">{recommendation || "Sin recomendaciones."}</div>
              </div>

              <div className="p-4 rounded-2xl bg-pastelChampagne">
                <div className="text-sm font-bold text-loreverde">Calendario: mejores precios</div>
                <div className="mt-3 space-y-2 text-gray-700">
                  {calendar.length === 0 ? (
                    <div className="text-sm">No hay datos de calendario.</div>
                  ) : (
                    calendar.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-sm">
                          {c.month} • <span className="font-medium">{c.bestDay}</span>
                        </div>
                        <div className="text-sm font-bold">{c.price}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-pastelChampagne">
                <div className="text-sm font-bold text-loreverde">Ofertas último momento</div>
                <div className="mt-3 text-sm text-gray-700">Presioná "Ver ofertas último momento" en el formulario para ver oportunidades flash.</div>
              </div>

              <div className="p-4 rounded-2xl bg-pastelChampagne">
                <div className="text-sm font-bold text-loreverde">Opciones de pago</div>
                <div className="mt-3 text-sm text-gray-700">Aceptamos tarjeta, cuotas y millas (dependiendo de la aerolínea).</div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto mt-10 mb-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Lore07 Viajando — Demo funcional (datos simulados).
      </footer>
    </div>
  );
}
