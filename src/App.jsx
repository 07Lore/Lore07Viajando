import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Loader from "./components/Loader";
import FlightCard from "./components/FlightCard";

/* --- Mocked helper: simula búsqueda de vuelos (reemplazar por API real) --- */
function simulateFetchFlights(params) {
  return new Promise((resolve, reject) => {
    // simulamos delay
    setTimeout(() => {
      // Si se envía quick (ofertas último minuto) devolvemos un set reducido
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
          recommendedSave: "Viajar martes suele ser 20% más barato"
        });
      }

      // Simulación: si destino es "nope" devolvemos vacío
      if (params && params.to && params.to.toLowerCase() === "nope") {
        return resolve({ flights: [], recommendedSave: null });
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

      // Añadimos una pequeña lógica: si buscás una aerolínea concreta filtramos
      let flights = base;
      if (params && params.airline) {
        flights = base.filter(f => f.airline.toLowerCase().includes(params.airline.toLowerCase()));
      }

      // Recomendación de ahorro
      const recommendedSave = "Conviene comprar con 60 días de anticipación para ahorrar hasta 25%.";

      resolve({ flights, recommendedSave, calendar: generateCheapCalendar() });
    }, 1100 + Math.random() * 900); // entre 1.1s y 2s
  });
}

function generateCheapCalendar() {
  // simulamos precios por mes/día: retornamos sólo un sample
  return [
    { month: "Oct 2025", bestDay: "Mar 14", price: "USD 650" },
    { month: "Nov 2025", bestDay: "Mar 21", price: "USD 620" }
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
      const data = await simulateFetchFlights(params);
      if (!data || !data.flights || data.flights.length === 0) {
        setError("No hay vuelos disponibles para esos parámetros.");
        setFlights([]);
      } else {
        setFlights(data.flights);
      }
      setRecommendation(data.recommendedSave || null);
      setCalendar(data.calendar || []);
    } catch (err) {
      setError("Ocurrió un error buscando vuelos. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-pastelChampagne">
      <header className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-loreVerde flex items-center justify-center text-white text-xl font-bold">✈️</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold">Lore07 Viajando</h1>
              <div className="text-sm opacity-75">
                Tu app para encontrar vuelos y oportunidades (premium, upgrades, ofertas último momento).
              </div>
            </div>
          </div>
          <div className="hidden md:block text-sm">
            <span className="px-3 py-1 rounded-full bg-pastelChampagne text-gray-900 font-semibold">
              Soporte: info@lore07viajando.com
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-6 space-y-6">
        <SearchForm onSearch={handleSearch} />

        <section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="text-lg font-semibold text-pastelChampagne">Resultados</div>

              {loading && <Loader text="Buscando mejores opciones..." />}

              {error && (
                <div className="p-4 rounded-2xl bg-red-600 text-white">
                  {error}
                </div>
              )}

              {!loading && !error && flights.length === 0 && (
                <div className="p-6 rounded-2xl bg-gray-800 text-pastelChampagne/70">
                  Los resultados aparecerán aquí. Probá con otro destino o buscá ofertas último momento.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {flights.map(f => (
                  <FlightCard key={f.id} flight={f} />
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="p-4 rounded-2xl bg-orange-500 text-pastelChampagne">
                <div className="text-sm font-bold">Recomendación inteligente</div>
                <div className="mt-2 text-sm">{recommendation || "Sin recomendaciones por el momento."}</div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-500 text-pastelChampagne">
                <div className="text-sm font-bold">Calendario: mejores precios</div>
                <div className="mt-3 space-y-2">
                  {calendar.length === 0 ? (
                    <div className="text-sm">No hay datos de calendario.</div>
                  ) : (
                    calendar.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="text-sm">{c.month} • <span className="font-medium">{c.bestDay}</span></div>
                        <div className="text-sm font-bold">{c.price}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-500 text-pastelChampagne">
                <div className="text-sm font-bold">Ofertas último momento</div>
                <div className="mt-3 text-sm">Presioná "Ver ofertas último momento" en el formulario para ver oportunidades flash.</div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-500 text-pastelChampagne">
                <div className="text-sm font-bold">Opciones de pago</div>
                <div className="mt-3 text-sm">Aceptamos tarjeta, cuotas y millas (dependiendo de la aerolínea).</div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-10 mb-8 text-center text-sm opacity-70 text-pastelChampagne">
        © {new Date().getFullYear()} Lore07 Viajando — Demo funcional (datos simulados). Integraciones con APIs reales pueden añadirse.
      </footer>
    </div>
  );
}
