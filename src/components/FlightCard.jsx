// src/components/FlightCard.jsx
import React from "react";

export default function FlightCard({ flight }) {
  return (
    <article className="flight-card card">
      {/* Head: airline/route + price area (gris oscuro, champagne bold) */}
      <div className="flight-head" style={{marginBottom:12}}>
        <div>
          <div style={{fontSize:12,opacity:.9}}>Aerolínea</div>
          <div style={{fontSize:18}} className="form-value">{flight.airline} — {flight.from} → {flight.to}</div>
        </div>

        <div style={{textAlign:"right"}}>
          <div style={{fontSize:12,opacity:.95}}>Precio</div>
          <div style={{fontSize:20, fontWeight:800}} className="form-value">{flight.currency} {flight.price}</div>
          <div style={{fontSize:12, marginTop:4}} className="small-muted">{flight.cabin}</div>
        </div>
      </div>

      {/* Details: labels bold but keep color theme */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 320px"}}>
          <div className="label-strong">Salida:</div>
          <div className="small-muted" style={{marginBottom:8}}>{flight.depart}</div>

          <div className="label-strong">Llegada:</div>
          <div className="small-muted" style={{marginBottom:8}}>{flight.arrive}</div>

          <div className="label-strong">Duración:</div>
          <div className="small-muted" style={{marginBottom:8}}>{flight.duration}</div>

          {flight.stopover && (
            <>
              <div className="label-strong">Stopover:</div>
              <div className="small-muted" style={{marginBottom:8}}>{flight.stopover.time} en {flight.stopover.city}</div>
            </>
          )}

          {flight.benefits && (
            <>
              <div className="label-strong">Beneficios:</div>
              <div className="small-muted" style={{marginBottom:8}}>{flight.benefits}</div>
            </>
          )}

          <div style={{marginTop:8}} className="small-muted"><span className="label-strong">Opciones de pago:</span> { (flight.paymentOptions||[]).join(" · ") }</div>
        </div>

        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-end",minWidth:180,gap:12}}>
          <a className="btn-primary" href={flight.buyLink} target="_blank" rel="noreferrer">Comprar</a>
        </div>
      </div>
    </article>
  );
}
