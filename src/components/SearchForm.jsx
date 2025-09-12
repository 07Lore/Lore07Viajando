// src/components/SearchForm.jsx
import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("EZE");
  const [to, setTo] = useState("MAD");
  const [date, setDate] = useState("");
  const [airline, setAirline] = useState("");

  function submit(e){
    e.preventDefault();
    onSearch({ from, to, date, airline });
  }
  function quick(e){
    e.preventDefault();
    onSearch({ from, to, date, airline, quick: true });
  }

  return (
    <form onSubmit={submit} className="card" style={{padding:18, borderRadius:16, background:"rgba(255,255,255,0.02)", marginBottom:18}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 220px 240px", gap:12, alignItems:"end"}}>
        <div>
          <label className="form-label">Origen</label>
          <input className="input" value={from} onChange={(e)=>setFrom(e.target.value)} placeholder="EZE, AEP, BUE o ciudad"/>
        </div>
        <div>
          <label className="form-label">Destino</label>
          <input className="input" value={to} onChange={(e)=>setTo(e.target.value)} placeholder="MAD, NYC, MIA"/>
        </div>
        <div>
          <label className="form-label">Fecha</label>
          <input className="input" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="dd/mm/yyyy"/>
        </div>
        <div>
          <label className="form-label">Aerolínea (opcional)</label>
          <input className="input" value={airline} onChange={(e)=>setAirline(e.target.value)} placeholder="KLM, IB, AA"/>
        </div>
      </div>

      <div style={{display:"flex",gap:12,marginTop:14,alignItems:"center"}}>
        <button type="submit" className="btn-primary" style={{fontSize:16}}> <span style={{color:"var(--champagne)", fontWeight:800}}>Buscar vuelos</span></button>
        <button onClick={quick} className="btn-alt" style={{fontSize:16}}> <span style={{color:"var(--card-text-dark)", fontWeight:800}}>Ver ofertas último momento</span></button>

        <div style={{marginLeft:"auto"}} className="small-muted bold">Búsqueda inteligente: proponemos aeropuertos cercanos.</div>
      </div>
    </form>
  );
}
