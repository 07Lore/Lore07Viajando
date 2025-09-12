// src/components/Loader.jsx
import React from "react";

export default function Loader({ text = "Buscando mejores opciones..." }) {
  return (
    <div className="card p-4 rounded-2xl" style={{background:"transparent"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:36,height:36,borderRadius:18,border:"4px solid rgba(255,255,255,0.12)",borderTopColor:"var(--lore-verde)",animation:"spin 1s linear infinite"}}/>
        <div className="small-muted">{text}</div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
