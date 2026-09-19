import React from 'react';
import type { Cancion } from '../../tipos/cancion';
import { FaPlay } from 'react-icons/fa';

interface TablaCancionesProps {
  canciones: Cancion[];
  alReproducirCancion: (cancion: Cancion) => void;
  cancionActualId?: string | number; // 
}

export const TablaCanciones: React.FC<TablaCancionesProps> = ({ 
  canciones, 
  alReproducirCancion, 
  cancionActualId 
}) => {
  return (
    <div className="table-container">
      <table className="song-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map((song) => {
            const estaActiva = song.id === cancionActualId;

            return (
              <tr 
                key={song.id} 
                className={`song-row ${estaActiva ? 'song-row-activa' : ''}`}
                onClick={() => alReproducirCancion(song)}
              >
                <td>
                  {estaActiva && <FaPlay style={{ fontSize: '0.7rem', marginRight: '8px', color: 'var(--primary)' }} />}
                  {song.titulo}
                </td>
                <td>{song.artista}</td>
                <td>{song.album}</td>
                <td>{song.duracion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};