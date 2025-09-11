import React from "react";

export default function Loader({ text = "Buscando..." }) {
  return (
    <div className="flex items-center gap-3 justify-center p-6">
      <svg className="animate-spin h-8 w-8 text-pastelAguamarina" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <div className="text-lg font-medium text-pastelChampagne">{text}</div>
    </div>
  );
}
