<<<<<<< HEAD
import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
=======
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)

interface AlertaPlaylistProps {
  mostrar: boolean;
  alCerrar: () => void;
<<<<<<< HEAD
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
=======
  mensaje: string;
}

export const AlertaPlaylist = ({ mostrar, alCerrar, mensaje }: AlertaPlaylistProps) => {
  if (!mostrar) return null;

  return (
    <div className="alerta-playlist-overlay">
      <div className="alerta-contenido-box">
        <FaCheckCircle className="alerta-icono-check" />
        <span className="alerta-texto">{mensaje}</span>
        <button className="alerta-cerrar-btn" onClick={alCerrar} title="Cerrar">
          <FaTimes />
        </button>
      </div>
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
    </div>
  );
};