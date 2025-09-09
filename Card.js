import React from "react";

export default function Card({ title, description }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
