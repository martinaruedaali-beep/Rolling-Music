<<<<<<< HEAD
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Boton } from '../Boton/Boton';
import { catalogoAlbums } from '../../data/mockData';
import type { Cancion } from '../../tipos/cancion';
import type { Album } from '../../tipos/Album';
import { FaMusic, FaArrowsAlt, FaPlus } from 'react-icons/fa';
=======
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaPlus, FaPlay } from 'react-icons/fa';
import { catalogoAlbums } from '../../data/mockData';
import type { Cancion } from '../../tipos/cancion';
import type { Album } from '../../tipos/Album';
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)

interface CancionConAlbum extends Cancion {
  albumPadre: Album;
}

interface ModalBuscadorProps {
  abierto: boolean;
  alCerrar: () => void;
<<<<<<< HEAD
  alSeleccionarCancion: (cancionConAlbum: CancionConAlbum) => void;
  alAgregarAPlaylist: (cancion: Cancion) => void;
  usuarioLogueado: boolean;
}

export const ModalBuscador: React.FC<ModalBuscadorProps> = ({ 
  abierto, 
  alCerrar, 
  alSeleccionarCancion, 
  alAgregarAPlaylist,
  usuarioLogueado 
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<CancionConAlbum[]>([]);
  const [buscadoRealizado, setBuscadoRealizado] = useState(false);

  const [posicion, setPosicion] = useState({ x: 0, y: 50 });
  const [arrastrando, setArrastrando] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCerrar = useCallback(() => {
    setBusqueda('');
    setResultados([]);
    setBuscadoRealizado(false);
    alCerrar();
  }, [alCerrar]);

  const handleBuscar = useCallback(() => {
    if (!busqueda.trim()) {
      setResultados([]);
      setBuscadoRealizado(false);
      return;
    }

    const todasLasCanciones: CancionConAlbum[] = catalogoAlbums.flatMap(album => 
      album.songs.map(song => ({ ...song, albumPadre: album }))
    );

    const filtradas = todasLasCanciones.filter(item => 
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.artista.toLowerCase().includes(busqueda.toLowerCase())
    );

    setResultados(filtradas);
    setBuscadoRealizado(true);
  }, [busqueda]);

  const iniciarArrastre = (e: React.MouseEvent) => {
    setArrastrando(true);
    setOffset({
      x: e.clientX - posicion.x,
      y: e.clientY - posicion.y
    });
  };

  useEffect(() => {
    const alMoverMouse = (e: MouseEvent) => {
      if (!arrastrando) return;
      setPosicion({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    };

    const detenerArrastre = () => {
      setArrastrando(false);
    };

    if (arrastrando) {
      window.addEventListener('mousemove', alMoverMouse);
      window.addEventListener('mouseup', detenerArrastre);
    }

    return () => {
      window.removeEventListener('mousemove', alMoverMouse);
      window.removeEventListener('mouseup', detenerArrastre);
    };
  }, [arrastrando, offset]);

  useEffect(() => {
    if (!abierto) return;

    const manejarTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCerrar();
      } else if (e.key === 'Enter') {
        handleBuscar();
      }
    };

    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [abierto, handleCerrar, handleBuscar]);

  if (!abierto) return null;

 return (
  <div className="modal-overlay-custom">
    <div 
      ref={modalRef}
      className="modal-content-custom"
      style={{ transform: `translate(${posicion.x}px, ${posicion.y}px)` }}
    >
      <div className="modal-drag-header" onMouseDown={iniciarArrastre} title="Haz clic y arrastra para mover">
        <span><FaArrowsAlt className="modal-drag-icon" /> Arrastrar ventana</span>
        <span>(Móvil / Libre)</span>
      </div>

      <h3 className="modal-titulo-limpio">
        Buscar y Guardar Canciones
      </h3>
      
      <p className="modal-texto-limpio">
        {usuarioLogueado 
          ? "Busca temas y reprodúcelos o agrégalos directamente a tu playlist personal." 
          : "Inicia sesión para poder guardar canciones en tu playlist personal."}
      </p>
      
      <input 
        type="text" 
        placeholder="Ej: Soda Stereo, La Renga..." 
        className="modal-input-limpio"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        autoFocus
      />

      {buscadoRealizado && (
        <div className="modal-resultados-box">
          {resultados.length > 0 ? (
            resultados.map(song => (
              <div key={song.id} className="modal-resultado-item">
                
                <div 
                  className="modal-resultado-info"
                  onClick={() => {
                    alSeleccionarCancion(song);
                    handleCerrar();
                  }}
                  title="Haz clic para reproducir"
                >
                  <FaMusic className="modal-resultado-icono-musica" />
                  <strong>{song.titulo}</strong> - <span className="modal-resultado-artista">{song.artista}</span>
                </div>

                {usuarioLogueado && (
                  <button 
                    className="playlist-acciones-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      alAgregarAPlaylist(song);
                    }}
                    title="Agregar a mi Playlist personal"
                  >
                    <FaPlus /> Playlist
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="modal-no-encontrado">
              ❌ Canción o artista no encontrado.
            </p>
          )}
        </div>
      )}

      <div className="modal-acciones-limpio">
        <Boton variante="primario" onClick={handleBuscar}>Buscar</Boton>
        <Boton variante="contorno" onClick={handleCerrar}>Cerrar</Boton>
      </div>
    </div>
  </div>
);
=======
  usuarioLogueado: boolean;
  alSeleccionarCancion: (cancion: CancionConAlbum) => void;
  alAgregarAPlaylist: (cancion: CancionConAlbum) => void;
}

export const ModalBuscador = ({
  abierto,
  alCerrar,
  usuarioLogueado,
  alSeleccionarCancion,
  alAgregarAPlaylist
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
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
};