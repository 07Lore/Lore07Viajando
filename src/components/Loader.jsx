import React from "react";

export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-loreverde border-t-transparent mb-4"></div>
      <p className="text-pastelChampagne font-bold">{text}</p>
    </div>
  );
}
