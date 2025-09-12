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
      if (params.quick) {
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

      if (params.to && params.to.toLowerCase() === "nope") {
        return resolve({ flights: [], recommendedSave: null });
      }

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

      let flights = base;
      if (params.airline) {
        flights = base.filter(f => f.airline.toLowerCase().includes(params.airline.toLowerCase()));
      }

      const recommendedSave = "Conviene comprar con 60 días de anticipación para ahorrar hasta 25%.";

      resolve({ flights, recommendedSave, calendar: generateCheapCalendar() });
    }, 1100 + Math.random() * 900);
  });
}

function generateCheapCalendar() {
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
    <div style={{minHeight:"100vh", padding:"28px", background:"var(--bg)"}}>
      <header style={{maxWidth:1200, margin:"0 auto 18px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:54,height:54,borderRadius:14,background:"var(--lore-verde)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--champagne)",fontSize:22,fontWeight:800}}>✈️</div>
          <div>
            <div className="app-title">Lore07 Viajando</div>
            <div style={{color:"var(--champagne)", fontWeight:800}}>
  Tu App de Vuelos Inteligente
</div>

          </div>
        </div>

        <div>
          <div className="support-badge">Soporte: info@lore07viajando.com</div>
        </div>
      </header>

      <main style={{maxWidth:1200, margin:"0 auto"}}>
        <SearchForm onSearch={handleSearch} />

        <section style={{marginTop:18}}>
          <div className="results-grid">
            <div className="left">
              <h2 style={{color:"#fff", marginBottom:12}}>Resultados</h2>

              {loading && <Loader text="Buscando mejores opciones..." />}

              {error && (
                <div className="card" style={{background:"rgba(255,0,0,0.06)",padding:12,borderRadius:12,color:"#ffdede"}}>{error}</div>
              )}

              {!loading && !error && flights.length === 0 && (
                <div className="card" style={{padding:18, borderRadius:12, color:"var(--muted-gray)"}}>
                  Los resultados aparecerán aquí. Probá con otro destino o buscá ofertas último momento.
                </div>
              )}

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr", gap:18, marginTop:12}}>
                {flights.map(f => <FlightCard key={f.id} flight={f} />)}
              </div>
            </div>

            <aside style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="side-card">
                <div className="title">Recomendación inteligente</div>
                <div className="desc" style={{marginTop:8}}>{recommendation || "Sin recomendaciones por el momento."}</div>
              </div>

              <div className="side-card">
                <div className="title">Calendario: mejores precios</div>
                <div style={{marginTop:8}}>
                  {calendar.length === 0 ? (
                    <div className="desc">No hay datos de calendario.</div>
                  ) : (
                    calendar.map((c,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                        <div style={{color:"var(--muted-gray)"}}>{c.month} • <span className="bold">{c.bestDay}</span></div>
                        <div className="bold">{c.price}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="side-card">
                <div className="title">Ofertas último momento</div>
                <div className="desc" style={{marginTop:8}}>Presioná "Ver ofertas último momento" en el formulario para ver oportunidades flash.</div>
              </div>

              <div className="side-card">
                <div className="title">Opciones de pago</div>
                <div className="desc" style={{marginTop:8}}>Aceptamos tarjeta, cuotas y millas (dependiendo de la aerolínea).</div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer style={{maxWidth:1200, margin:"36px auto 80px", textAlign:"center", color:"var(--muted-gray)"}}>
        © {new Date().getFullYear()} Lore07 Viajando — Demo funcional (datos simulados).
      </footer>
    </div>
  );
}
