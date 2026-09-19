import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface AlertaPlaylistProps {
  mostrar: boolean;
  alCerrar: () => void;
  mensaje?: string;
}

export const AlertaPlaylist: React.FC<AlertaPlaylistProps> = ({ 
  mostrar, 
  alCerrar, 
  mensaje = "¡Canción agregada con éxito!" 
}) => {
  useEffect(() => {
    if (!mostrar) return;
    const timer = setTimeout(() => {
      alCerrar();
    }, 3500);

    return () => clearTimeout(timer);
  }, [mostrar, alCerrar]);

  if (!mostrar) return null;

  return (
    <div className="alerta-toast-container">
      <div className="alerta-toast-contenido">
        <FaCheckCircle className="alerta-toast-icono" />
        <span className="alerta-toast-texto">{mensaje}</span>
      </div>
      <button 
        className="alerta-toast-cerrar"
        onClick={alCerrar}
        title="Cerrar"
      >
        ✕
      </button>
    </div>
  );
};