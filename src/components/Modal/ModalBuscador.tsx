import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaPlus, FaPlay } from 'react-icons/fa';
import { catalogoAlbums } from '../../data/mockData';
import type { Cancion } from '../../tipos/cancion';
import type { Album } from '../../tipos/Album';

interface CancionConAlbum extends Cancion {
  albumPadre: Album;
}

interface ModalBuscadorProps {
  abierto: boolean;
  alCerrar: () => void;
  usuarioLogueado: boolean;
  alSeleccionarCancion: (cancion: CancionConAlbum) => void;
  alAgregarAPlaylist: (cancion: CancionConAlbum) => void;
}

export const ModalBuscador = ({
  abierto,
  alCerrar,
  usuarioLogueado,
  alSeleccionarCancion,
  alAgregarAPlaylist,
}: ModalBuscadorProps) => {
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (!abierto) {
      const timer = setTimeout(() => setBusqueda(''), 0);
      return () => clearTimeout(timer);
    }
  }, [abierto]);

  useEffect(() => {
    const manejarKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && abierto) {
        alCerrar();
      }
    };
    window.addEventListener('keydown', manejarKeyDown);
    return () => window.removeEventListener('keydown', manejarKeyDown);
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  const todasLasCanciones: CancionConAlbum[] = catalogoAlbums.flatMap(album =>
    album.songs.map(song => ({ ...song, albumPadre: album }))
  );

  const cancionesFiltradas = busqueda.trim() === ''
    ? []
    : todasLasCanciones.filter(song =>
        song.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        song.artista.toLowerCase().includes(busqueda.toLowerCase())
      );

  return (
    <div className="modal-overlay" onClick={alCerrar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={alCerrar}>
          <FaTimes />
        </button>

        <h3 className="modal-title">Buscar y Agregar Canciones</h3>
        <p className="modal-subtitle">Busca temas y reprodúcelos o agrégalos a tus carpetas.</p>

        <div className="modal-search-wrapper">
          <FaSearch className="modal-search-icon" />
          <input 
            type="text" 
            placeholder="Ej: Soda Stereo, La Renga..."
            className="modal-input"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            autoFocus
          />
        </div>

        <div className="modal-results-list">
          {busqueda.trim() !== '' ? (
            cancionesFiltradas.length > 0 ? (
              cancionesFiltradas.map(song => (
                <div key={song.id} className="modal-song-row">
                  <span><strong>{song.titulo}</strong> - {song.artista}</span>
                  <div className="modal-row-actions">
                    <button 
                      className="modal-icon-btn" 
                      onClick={() => {
                        if (!usuarioLogueado) {
                          alert("⚠️ Debe iniciar sesión para reproducir.");
                          return;
                        }
                        alSeleccionarCancion(song);
                        alCerrar();
                      }}
                      title="Reproducir"
                    >
                      <FaPlay />
                    </button>
                    <button 
                      className="modal-icon-btn" 
                      onClick={() => {
                        if (!usuarioLogueado) {
                          alert("⚠️ Debe iniciar sesión para guardar.");
                          return;
                        }
                        alAgregarAPlaylist(song);
                      }}
                      title="Agregar"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="modal-no-results">No se encontraron canciones.</p>
            )
          ) : (
            <p className="modal-no-results">Escribe algo para comenzar la búsqueda...</p>
          )}
        </div>
      </div>
    </div>
  );
};