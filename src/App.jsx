// src/App.jsx
import React, { useState } from "react";

/* -------------------------
   Icono avión (SVG reutilizable)
   ------------------------- */
function AirplaneIcon({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
    </svg>
  );
}

/* -------------------------
   Loader
   ------------------------- */
function Loader({ text = "Buscando..." }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-900/40 rounded-2xl">
      <div className="animate-spin rounded-full border-4 border-t-transparent border-champagneText w-8 h-8" />
      <div className="text-sm text-champagneText">{text}</div>
    </div>
  );
}

/* -------------------------
   Search Form (interno)
   - onSearch({ from, to, date, airline, quick })
   ------------------------- */
function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");
  const [quick, setQuick] = useState(false);

  function submit(e) {
    e.preventDefault();
    onSearch({ from: from.trim(), to: to.trim(), date: date || null, airline: airline.trim(), quick });
  }

  return (
    <form onSubmit={submit} className="w-full bg-gray-900/60 rounded-3xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <input className="flex-1 p-3 rounded-lg bg-gray-800 placeholder-gray-400 text-champagneText font-semibold" placeholder="Origen (IATA o ciudad)" value={from} onChange={e => setFrom(e.target.value)} />
        <input className="flex-1 p-3 rounded-lg bg-gray-800 placeholder-gray-400 text-champagneText font-semibold" placeholder="Destino (IATA o ciudad)" value={to} onChange={e => setTo(e.target.value)} />
        <input type="date" className="p-3 rounded-lg bg-gray-800 text-champagneText" value={date} onChange={e => setDate(e.target.value)} />
        <input className="w-48 p-3 rounded-lg bg-gray-800 placeholder-gray-400 text-champagneText" placeholder="Aerolínea (opcional)" value={airline} onChange={e => setAirline(e.target.value)} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button type="submit" className="px-5 py-2 rounded-full bg-loreVerde text-white font-bold shadow-md">Buscar vuelos</button>
          <button type="button" onClick={() => { setQuick(true); onSearch({ from: from.trim(), to: to.trim(), date: date || null, airline: airline.trim(), quick: true }); setQuick(false); }} className="text-sm text-champagneText/90 hover:underline">Ver ofertas último momento</button>
        </div>

        <div className="text-sm text-champagneText/90">
          Búsqueda inteligente: <span className="font-semibold text-loreVerde">proponemos aeropuertos cercanos</span>
        </div>
      </div>
    </form>
  );
}

/* -------------------------
   FlightCard (muestra cada vuelo)
   ------------------------- */
function FlightCard({ flight }) {
  return (
    <div className="rounded-2xl bg-naranjaCard p-5 text-white shadow-lg relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm font-bold text-gray-900">{flight.airline}</div>
          <div className="mt-1 text-gray-900 font-bold">{flight.from} → {flight.to}</div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-extrabold">{flight.currency} {flight.price}</div>
          <div className="text-sm font-semibold mt-1">{flight.cabin}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div>
          <div className="font-semibold text-gray-900">Salida:</div>
          <div className="text-champagneText mt-1">{flight.depart}</div>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Llegada:</div>
          <div className="text-champagneText mt-1">{flight.arrive}</div>
        </div>

        <div>
          <div className="font-semibold text-gray-900">Duración:</div>
          <div className="text-champagneText mt-1">{flight.duration}</div>
        </div>

        <div>
          <div className="font-semibold text-gray-900">Opciones de pago:</div>
          <div className="text-champagneText mt-1">{(flight.paymentOptions || []).join(" · ")}</div>
        </div>
      </div>

      {flight.stopover && (
        <div className="mt-3 inline-flex items-center gap-2 bg-black/20 rounded-full px-3 py-1 text-xs text-champagneText">
          Stopover: {flight.stopover.city} • {flight.stopover.time}
        </div>
      )}

      {flight.benefits && (
        <div className="mt-3 text-xs text-champagneText/90">{flight.benefits}</div>
      )}

      <div className="mt-4">
        <a href={flight.buyLink} target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded-full bg-loreVerde text-white font-semibold shadow">Comprar</a>
      </div>
    </div>
  );
}

/* -------------------------
   Simulación de búsqueda (reemplazar con API real)
   ------------------------- */
function simulateFetchFlights(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Si quick (último momento)
      if (params.quick) {
        return resolve({
          flights: [
            {
              id: "last1",
              price: 420,
              currency: "USD",
              airline: "Iberia",
              from: params.from || "EZE",
              to: params.to || "MAD",
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

      // Simulación normal
      const base = [
        {
          id: "f1",
          price: 720,
          currency: "USD",
          airline: "KLM",
          from: params.from || "EZE",
          to: params.to || "MAD",
          depart: `${params.date || "2025-09-11"} 10:00`,
          arrive: `${params.date || "2025-09-11"} 22:00`,
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
          depart: `${params.date || "2025-09-11"} 06:00`,
          arrive: `${params.date || "2025-09-11"} 18:00`,
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
          depart: `${params.date || "2025-09-11"} 09:00`,
          arrive: `${params.date || "2025-09-11"} 21:00`,
          duration: "12h",
          cabin: "Business",
          stopover: null,
          benefits: "Upgrade con diferencia mínima",
          buyLink: "https://example.com/buy/f3",
          paymentOptions: ["Tarjeta", "Cuotas", "Millas"]
        }
      ];

      // Filtrado simple por airline si se pasa
      const flights = params.airline ? base.filter(f => f.airline.toLowerCase().includes(params.airline.toLowerCase())) : base;

      const recommendedSave = "Conviene comprar con 60 días de anticipación para ahorrar hasta 25%.";

      resolve({ flights, recommendedSave, calendar: [
        { month: "Oct 2025", bestDay: "Mar 14", price: "USD 650" },
        { month: "Nov 2025", bestDay: "Mar 21", price: "USD 620" }
      ] });
    }, 900 + Math.random() * 1000);
  });
}

/* -------------------------
   App principal
   ------------------------- */
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
      setRecommendation(data.recommendedSave || data.recommendedSave || null);
      setCalendar(data.calendar || []);
    } catch (err) {
      setError("Ocurrió un error buscando vuelos. Intentá nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-fondoOscuro text-champagneText font-comic">
      <header className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-pastelAguamarina p-3">
              <AirplaneIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-naranjaCard">Lore07 Viajando</h1>
              <div className="text-sm font-semibold text-champagneText">Tu app para encontrar vuelos y oportunidades (premium, upgrades, ofertas último momento).</div>
            </div>
          </div>

          <div className="hidden md:block">
            <span className="px-4 py-2 rounded-full bg-pastelChampagne font-bold text-naranjaCard">Soporte: info@lore07viajando.com</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchForm onSearch={handleSearch} />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-champagneText">Resultados</h2>

            {loading && <Loader text="Buscando mejores opciones..." />}

            {error && (
              <div className="p-4 rounded-2xl bg-red-700/30 text-red-200">{error}</div>
            )}

            {!loading && !error && flights.length === 0 && (
              <div className="p-6 rounded-2xl bg-gray-900/40 text-champagneText">Los resultados aparecerán aquí. Probá con otro destino o buscá ofertas último momento.</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flights.map(f => <FlightCard key={f.id} flight={f} />)}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl p-4 bg-pastelChampagne text-champagneText">
              <div className="text-sm font-bold text-loreVerde">Recomendación inteligente</div>
              <div className="mt-2 text-gray-800">{recommendation || "Sin recomendaciones por el momento."}</div>
            </div>

            <div className="rounded-2xl p-4 bg-pastelChampagne text-champagneText">
              <div className="text-sm font-bold text-loreVerde">Calendario: mejores precios</div>
              <div className="mt-3 space-y-2">
                {calendar.length === 0 ? <div className="text-sm text-gray-800">No hay datos de calendario.</div> : calendar.map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="text-sm">{c.month} • <span className="font-bold text-gray-800">{c.bestDay}</span></div>
                    <div className="text-sm font-bold text-gray-800">{c.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 bg-pastelChampagne text-champagneText">
              <div className="text-sm font-bold text-loreVerde">Ofertas último momento</div>
              <div className="mt-2 text-gray-800 text-sm">Presioná "Ver ofertas último momento" en el formulario para ver oportunidades flash.</div>
            </div>

            <div className="rounded-2xl p-4 bg-pastelChampagne text-champagneText">
              <div className="text-sm font-bold text-loreVerde">Opciones de pago</div>
              <div className="mt-2 text-gray-800 text-sm">Aceptamos tarjeta, cuotas y millas (dependiendo de la aerolínea).</div>
            </div>
          </aside>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Lore07 Viajando — Demo funcional (datos simulados).
      </footer>
    </div>
  );
}
