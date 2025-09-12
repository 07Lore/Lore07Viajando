// src/components/SearchForm.jsx
import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("EZE");
  const [to, setTo] = useState("MAD");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch({ from, to, date, airline });
  }

  function quick(e) {
    e.preventDefault();
    onSearch({ from, to, date, airline, quick: true });
  }

  return (
    <form
      onSubmit={submit}
      className="card"
      style={{
        padding: 18,
        borderRadius: 16,
        background: "rgba(255,255,255,0.02)",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 220px 240px",
          gap: 12,
          alignItems: "end",
        }}
      >
        {/* Origen */}
        <div>
          <label className="form-label">Origen</label>
          <select
            className="input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="EZE">EZE</option>
            <option value="AEP">AEP</option>
            <option value="BUE">BUE</option>
            <option value="CUALQUIERA">Cualquiera</option>
          </select>
        </div>

        {/* Destino */}
        <div>
          <label className="form-label">Destino</label>
          <select
            className="input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="MAD">MAD</option>
            <option value="NYC">NYC</option>
            <option value="MIA">MIA</option>
            <option value="CUALQUIERA">Cualquiera</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="form-label">Fecha</label>
          <select
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="">Seleccionar fecha</option>
            <option value="2025-10-10">10/10/2025</option>
            <option value="2025-11-10">10/11/2025</option>
            <option value="FLEXIBLE">Flexible</option>
          </select>
        </div>

        {/* Aerolínea */}
        <div>
          <label className="form-label">Aerolínea</label>
          <select
            className="input"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="KLM">KLM</option>
            <option value="IB">IB</option>
            <option value="AA">AA</option>
            <option value="TODAS">Todas / Cualquiera</option>
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginTop: 14,
          alignItems: "center",
        }}
      >
        <button
          type="submit"
          className="btn-primary"
          style={{ fontSize: 16 }}
        >
          Buscar Vuelos
        </button>
        <button onClick={quick} className="btn-alt" style={{ fontSize: 16 }}>
          Ofertas de Último Momento
        </button>
      </div>
    </form>
  );
}
