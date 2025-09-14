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
              paymentOptions: ["Tarjeta", "Cuotas", "Millas"],
            },
          ],
          recommendedSave: "Viajar martes suele ser 20% más barato",
          calendar: [
            { month: "Oct 2025", bestDay: "Mar 14", price: "USD 650" },
            { month: "Nov 2025", bestDay: "Mar 21", price: "USD 620" },
          ],
        });
      }

      if (params && params.to && params.to.toLowerCase() === "nope") {
        return resolve({ flights: [], recommendedSave: null, calendar: [] });
      }

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
          paymentOptions: ["Tarjeta", "Cuotas"],
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
          paymentOptions: ["Tarjeta", "Millas"],
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
          paymentOptions: ["Tarjeta", "Cuotas", "Millas"],
        },
      ];

      let flights = base;
      if (params && params.airline) {
        const al = params.airline.toString().toLowerCase();
        if (
          al &&
          al !== "todas / cualquiera" &&
          al !== "todas" &&
          al !== "cualquiera"
        ) {
          flights = base.filter((f) => f.airline.toLowerCase().includes(al));
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
    { month: "Nov 2025", bestDay: "21 Nov", price: "USD 620" },
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
              <div className="text-sm font-bold text-stone-100">
                Tu App de Vuelos Inteligente
              </div>
            </div>
          </div>

          <div className="hidden md:block">
