import { FaCheckCircle, FaTimes } from 'react-icons/fa';

interface AlertaPlaylistProps {
  mostrar: boolean;
  alCerrar: () => void;
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
    </div>
  );
};