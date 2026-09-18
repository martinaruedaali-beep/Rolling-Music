import { Boton } from './Boton/Boton';
import { FaPlay, FaHeart, FaPlus } from 'react-icons/fa';

export const AlbunDetalle = () => {
  return (
    <div className="album-detail-container">
      
      <div className="album-header">
        <div className="album-cover" />
        
        <div>
          <h1 className="album-title">
            DESPEDAZADO POR MIL PARTES
          </h1>
          <p className="album-info">
            Álbum • La Renga • 1996 • Rock
          </p>
          
          <div className="album-actions">
            <Boton variante="primario">
              <FaPlay /> Reproducir
            </Boton>
            
            <Boton variante="contorno">
              <FaPlus /> Agregar a Playlist
            </Boton>
            
            <button className="album-heart-btn" aria-label="Marcar como favorito">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Listado de canciones del álbum */}-----------listado
      <h3 className="album-section-title">
        Canciones del Álbum
      </h3>
      
      <div className="table-container">
        <table className="song-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Artista</th>
              <th>Álbum</th>
              <th style={{ textAlign: 'right' }}>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr className="song-row">
              <td>Desnudo para siempre</td>
              <td>La Renga</td>
              <td>Despedazado por mil partes</td>
              <td style={{ textAlign: 'right' }}>5:41</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};