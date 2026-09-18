import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Boton } from '../Boton/Boton';
import { catalogoAlbums } from '../../data/mockData';
import type { Cancion } from '../../tipos/cancion';
import type { Album } from '../../tipos/Album';
import { FaMusic, FaArrowsAlt, FaPlus } from 'react-icons/fa';

interface CancionConAlbum extends Cancion {
  albumPadre: Album;
}

interface ModalBuscadorProps {
  abierto: boolean;
  alCerrar: () => void;
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
          <span><FaArrowsAlt style={{ marginRight: '5px' }} /> Arrastrar ventana</span>
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
                <div 
                  key={song.id} 
                  className="modal-resultado-item"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div 
                    style={{ flex: 1 }}
                    onClick={() => {
                      alSeleccionarCancion(song);
                      handleCerrar();
                    }}
                    title="Haz clic para reproducir"
                  >
                    <FaMusic style={{ color: 'var(--primary)', marginRight: '6px' }} />
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
                      style={{ background: 'var(--surface-light)', padding: '4px 8px', borderRadius: '4px' }}
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
};