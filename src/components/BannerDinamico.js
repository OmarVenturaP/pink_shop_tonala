"use client";
import { useState, useEffect } from 'react';

export default function BannerCaptura() {
  const [codigo, setCodigo] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Generamos un código aleatorio único para esta sesión (Ej: PS-4829)
    const numAleatorio = Math.floor(1000 + Math.random() * 9000);
    setCodigo(`PS-${numAleatorio}`);

    // Aparece 1 segundo después de que carga la página para no estorbar
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 w-[95%] max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="bg-white rounded-2rem p-1 border-2 border-regalo-rosa shadow-[0_20px_50px_rgba(255,142,188,0.3)] overflow-hidden">
        
        <div className="flex items-center">
          {/* LADO IZQUIERDO: EL CÓDIGO (Diseño de Ticket) */}
          <div className="bg-regalo-rosa p-6 rounded-1.5rem text-center min-w-120px relative">
            {/* Medios círculos para efecto ticket */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
            
            <p className="text-[10px] text-white/80 font-black uppercase mb-1">Tu Código</p>
            <p className="text-xl font-black text-white tracking-tighter">{codigo}</p>
          </div>

          {/* LADO DERECHO: INSTRUCCIONES */}
          <div className="flex-1 px-6 py-2">
            <h4 className="text-sm font-black text-regalo-azul-r leading-tight mb-1 text-center">
              📸 ¡TOMA CAPTURA AHORA!
            </h4>
            <p className="text-[11px] text-gray-500 font-medium leading-tight">
              Compártela en el siguiente <span className="text-regalo-rosa font-bold">En Vivo</span> para ganar un regalo en tu compra.
            </p>
          </div>

          {/* BOTÓN CERRAR */}
          <button 
            onClick={() => setVisible(false)}
            className="pr-6 text-gray-300 hover:text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>
        
        {/* Lema de la tienda en el borde inferior */}

      </div>
    </div>
  );
}