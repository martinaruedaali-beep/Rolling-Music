import { useState, useRef, useEffect } from 'react';
import { Boton } from './Boton/Boton';
import { ModalBuscador } from './Modal/ModalBuscador';
import { AlertaPlaylist } from './Alertas/AlertaPlaylist';
import { FiltrosGenero } from './Filtros/FiltrosGenero';
import { catalogoAlbums } from '../data/mockData';
import type { Cancion } from '../tipos/cancion';
import type { Album } from '../tipos/Album';
import { FaPlay, FaPause, FaHeart, FaPlus, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaCompass, FaTrash, FaFolderOpen, FaFolderPlus, FaCheck, FaListUl, FaCheckSquare, FaSquare } from 'react-icons/fa';

interface CancionConAlbum extends Cancion {
  albumPadre: Album;
}

interface CarpetaPersonalizada {
  id: string;
  nombre: string;
  canciones: Cancion[];
}

const listaGeneros = ['Todo', 'Rock', 'Hard Rock', 'Metal', 'Punk'];

export const AlbunDetalle = () => {
  const [albumActual, setAlbumActual] = useState<Album>(catalogoAlbums[0]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [textoAlerta, setTextoAlerta] = useState("¡Canción agregada con éxito!");
  
  const [indiceCancionActual, setIndiceCancionActual] = useState(0);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  
  const [menuExplorarAbierto, setMenuExplorarAbierto] = useState(false);
  const [generoActivo, setGeneroActivo] = useState<string>('Todo');

  
  const [usuarioLogueado] = useState<boolean>(() => {
    return localStorage.getItem("usuario") !== null || document.body.innerText.includes("Zabdiel");
  });

  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const [volumenAnterior, setVolumenAnterior] = useState(1);
  
  const [nombreNuevaCarpeta, setNombreNuevaCarpeta] = useState('');
  const [mostrarSelectorCarpetas, setMostrarSelectorCarpetas] = useState(false);
  const [carpetasUsuario, setCarpetasUsuario] = useState<CarpetaPersonalizada[]>([
    { id: '1', nombre: 'Mis Favoritos', canciones: [] }
  ]);

  const [colaReproduccion, setColaReproduccion] = useState<Cancion[]>([]);
  const [indiceColaActual, setIndiceColaActual] = useState(0);
  const [idsSeleccionados, setIdsSeleccionados] = useState<(string | number)[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cancionActual = colaReproduccion.length > 0 
    ? colaReproduccion[indiceColaActual] 
    : (albumActual.songs[indiceCancionActual] || albumActual.songs[0]);

  const estaEnAlgunaCarpeta = carpetasUsuario.some(c => c.canciones.some(s => s.id === cancionActual.id));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const actualizarTiempo = () => setTiempoActual(audio.currentTime);
    const actualizarDuracion = () => setDuracionTotal(audio.duration || 0);

    audio.addEventListener('timeupdate', actualizarTiempo);
    audio.addEventListener('loadedmetadata', actualizarDuracion);

    return () => {
      audio.removeEventListener('timeupdate', actualizarTiempo);
      audio.removeEventListener('loadedmetadata', actualizarDuracion);
    };
  }, [albumActual, indiceCancionActual, colaReproduccion, indiceColaActual]);

  useEffect(() => {
    if (alertaVisible) {
      const timer = setTimeout(() => {
        setAlertaVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertaVisible]);

  const manejarReproduccion = (cancion: Cancion, index?: number) => {
    // VALIDACIÓN ESTRICTA DE SESIÓN
    if (!usuarioLogueado) {
      alert("⚠️ Debe iniciar sesión para escuchar música.");
      return;
    }

    if (index !== undefined) setIndiceCancionActual(index);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (cancion.file) {
      const nuevoAudio = new Audio(cancion.file);
      nuevoAudio.volume = volumen;
      audioRef.current = nuevoAudio;
      nuevoAudio.play().catch(err => console.log("Reproduciendo audio:", err));
      setEstaReproduciendo(true);

      nuevoAudio.onended = () => {
        setEstaReproduciendo(false);
        siguienteCancion();
      };
    }
  };

  const siguienteCancionCola = () => {
    if (!usuarioLogueado) return;
    if (colaReproduccion.length > 0) {
      const siguienteIndice = indiceColaActual + 1;
      if (siguienteIndice < colaReproduccion.length) {
        setIndiceColaActual(siguienteIndice);
        manejarReproduccion(colaReproduccion[siguienteIndice]);
      } else {
        setEstaReproduciendo(false);
      }
    } else {
      const nuevoIndice = (indiceCancionActual + 1) % albumActual.songs.length;
      setIndiceCancionActual(nuevoIndice);
      manejarReproduccion(albumActual.songs[nuevoIndice], nuevoIndice);
    }
  };

  const siguienteCancion = () => {
    if (!usuarioLogueado) return;
    siguienteCancionCola();
  };

  const reproducirCola = (listaCanciones: Cancion[], indiceInicio = 0) => {
    if (!usuarioLogueado) {
      alert("⚠️ Debe iniciar sesión para reproducir música.");
      return;
    }
    if (listaCanciones.length === 0) return;

    setColaReproduccion(listaCanciones);
    setIndiceColaActual(indiceInicio);
    manejarReproduccion(listaCanciones[indiceInicio]);
    
    setTextoAlerta(`¡Reproduciendo cola de ${listaCanciones.length} tema(s)!`);
    setAlertaVisible(true);
  };

  const manejarPausa = () => {
    if (!usuarioLogueado) return;
    if (audioRef.current) {
      if (estaReproduciendo) {
        audioRef.current.pause();
        setEstaReproduciendo(false);
      } else {
        audioRef.current.play().catch(err => console.log("Reanudando audio:", err));
        setEstaReproduciendo(true);
      }
    }
  };

  const cambiarProgreso = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usuarioLogueado) return;
    const nuevoTiempo = Number(e.target.value);
    setTiempoActual(nuevoTiempo);
    if (audioRef.current) {
      audioRef.current.currentTime = nuevoTiempo;
    }
  };

  const cambiarVolumen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoVolumen = Number(e.target.value);
    setVolumen(nuevoVolumen);
    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen;
    }
  };

  const alternarMute = () => {
    if (volumen > 0) {
      setVolumenAnterior(volumen);
      setVolumen(0);
      if (audioRef.current) audioRef.current.volume = 0;
    } else {
      const restaurado = volumenAnterior > 0 ? volumenAnterior : 0.5;
      setVolumen(restaurado);
      if (audioRef.current) audioRef.current.volume = restaurado;
    }
  };

  const anteriorCancion = () => {
    if (!usuarioLogueado) return;
    if (colaReproduccion.length > 0) {
      const nuevoIndice = indiceColaActual === 0 ? colaReproduccion.length - 1 : indiceColaActual - 1;
      setIndiceColaActual(nuevoIndice);
      manejarReproduccion(colaReproduccion[nuevoIndice]);
    } else {
      const nuevoIndice = indiceCancionActual === 0 ? albumActual.songs.length - 1 : indiceCancionActual - 1;
      manejarReproduccion(albumActual.songs[nuevoIndice], nuevoIndice);
    }
  };

  const toggleSeleccionCancion = (id: string | number) => {
    if (!usuarioLogueado) return;
    setIdsSeleccionados(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const cancionesConAlbum: CancionConAlbum[] = catalogoAlbums.flatMap(album => 
    album.songs.map(song => ({ ...song, albumPadre: album }))
  );

  const cancionesFiltradas = generoActivo === 'Todo'
    ? cancionesConAlbum
    : cancionesConAlbum.filter((item) => item.genero === generoActivo);

  const toggleSeleccionarTodos = () => {
    if (!usuarioLogueado) return;
    const idsFiltrados = cancionesFiltradas.map(s => String(s.id));
    const todosSeleccionados = idsFiltrados.every(id => idsSeleccionados.map(String).includes(id));

    if (todosSeleccionados) {
      setIdsSeleccionados(prev => prev.filter(id => !idsFiltrados.includes(String(id))));
    } else {
      setIdsSeleccionados(prev => Array.from(new Set([...prev.map(String), ...idsFiltrados])));
    }
  };

  const reproducirSeleccionadas = () => {
    if (!usuarioLogueado) {
      alert("⚠️ Debe iniciar sesión.");
      return;
    }
    const cancionesSeleccionadas = cancionesFiltradas.filter(s => idsSeleccionados.includes(s.id));
    if (cancionesSeleccionadas.length > 0) {
      reproducirCola(cancionesSeleccionadas, 0);
    } else {
      alert("Selecciona al menos una canción de la lista.");
    }
  };

  const crearCarpeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioLogueado) {
      alert("⚠️ Debe iniciar sesión para crear carpetas.");
      return;
    }
    if (!nombreNuevaCarpeta.trim()) return;

    const nuevaCarpeta: CarpetaPersonalizada = {
      id: Date.now().toString(),
      nombre: nombreNuevaCarpeta.trim(),
      canciones: []
    };

    const actualizadas = [...carpetasUsuario, nuevaCarpeta];
    setCarpetasUsuario(actualizadas);
    setNombreNuevaCarpeta('');
    setTextoAlerta(`¡Carpeta "${nuevaCarpeta.nombre}" creada con éxito!`);
    setAlertaVisible(true);
  };

  const agregarACarpetaSeleccionada = (idCarpeta: string) => {
    if (!usuarioLogueado) {
      alert("⚠️ Debe iniciar sesión.");
      return;
    }
    const actualizadas = carpetasUsuario.map(carpeta => {
      if (carpeta.id === idCarpeta) {
        if (!carpeta.canciones.some(s => s.id === cancionActual.id)) {
          return { ...carpeta, canciones: [...carpeta.canciones, cancionActual] };
        }
      }
      return carpeta;
    });

    setCarpetasUsuario(actualizadas);
    setTextoAlerta(`¡Canción agregada a la carpeta!`);
    setAlertaVisible(true);
    setMostrarSelectorCarpetas(false);
  };

  const eliminarDeCarpeta = (idCarpeta: string, idCancion: string | number) => {
    if (!usuarioLogueado) return;
    const actualizadas = carpetasUsuario.map(carpeta => {
      if (carpeta.id === idCarpeta) {
        return {
          ...carpeta,
          canciones: carpeta.canciones.filter(s => String(s.id) !== String(idCancion))
        };
      }
      return carpeta;
    });

    setCarpetasUsuario(actualizadas);
  };

  const eliminarCarpeta = (idCarpeta: string) => {
    if (!usuarioLogueado) return;
    const actualizadas = carpetasUsuario.filter(c => c.id !== idCarpeta);
    setCarpetasUsuario(actualizadas);
    setTextoAlerta("Carpeta eliminada");
    setAlertaVisible(true);
  };

  const formatearTiempo = (segundos: number) => {
    if (isNaN(segundos)) return "0:00";
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const nombreAlbumActual = cancionActual?.album || albumActual.title;
  const artistaActual = cancionActual?.artista || albumActual.artist;

  const infoDiscos: Record<string, { lanzamiento: string; sello: string; duracion: string; temas: number }> = {
    "Despedazado por mil partes": {
      lanzamiento: "1996",
      sello: "La Renga Discos",
      duracion: "48 min",
      temas: albumActual.songs.length
    },
    "Rock": {
      lanzamiento: "Diversos",
      sello: "Independiente",
      duracion: "Varía",
      temas: albumActual.songs.length
    },
    "Metal": {
      lanzamiento: "Diversos",
      sello: "Metal Heavy Sello",
      duracion: "Varía",
      temas: albumActual.songs.length
    },
    "Hard Rock": {
      lanzamiento: "Diversos",
      sello: "Rock & Sello",
      duracion: "Varía",
      temas: albumActual.songs.length
    },
    "Punk": {
      lanzamiento: "Diversos",
      sello: "Underground",
      duracion: "Varía",
      temas: albumActual.songs.length
    }
  };

  const discoInfo = infoDiscos[nombreAlbumActual] || infoDiscos["Despedazado por mil partes"];

  return (
    <div className="detalle-album-wrapper">
      
      <AlertaPlaylist 
        mostrar={alertaVisible} 
        alCerrar={() => setAlertaVisible(false)} 
        mensaje={textoAlerta}
      />

      <div className="album-header-clean">
        
        <div className="header-top-row">
          <div>
            <h1 className="album-title-clean">{cancionActual.titulo}</h1>
            <div className="album-meta-clean">
              <span className="artista-texto-blanco">{cancionActual.artista}</span>
              <span>•</span>
              <span>{cancionActual.duracion}</span>
              {colaReproduccion.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-primary-color cola-reproduccion-texto">
                    Cola: {indiceColaActual + 1} de {colaReproduccion.length} cargadas
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="album-actions-clean">
            <Boton variante="contorno" onClick={() => {
              if (!usuarioLogueado) {
                alert("⚠️ Debe iniciar sesión.");
                return;
              }
              setModalAbierto(true);
            }}>
              <FaPlus /> Buscar y Agregar
            </Boton>
            
            <button 
              className={`heart-btn-dinamico ${estaEnAlgunaCarpeta ? 'heart-btn-activo' : 'heart-btn-inactivo'}`}
              onClick={() => {
                if (!usuarioLogueado) {
                  alert("⚠️ Debe iniciar sesión.");
                  return;
                }
                setMostrarSelectorCarpetas(!mostrarSelectorCarpetas);
              }}
              title="Guardar en carpeta"
            >
              <FaHeart />
            </button>

            {mostrarSelectorCarpetas && usuarioLogueado && (
              <div className="selector-carpetas-dropdown">
                <p className="selector-carpetas-titulo">📂 Guardar en carpeta:</p>
                {carpetasUsuario.length > 0 ? (
                  carpetasUsuario.map(c => {
                    const yaEsta = c.canciones.some(s => s.id === cancionActual.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => agregarACarpetaSeleccionada(c.id)}
                        className={`selector-carpeta-btn ${yaEsta ? 'selector-carpeta-activa' : ''}`}
                      >
                        <span>📁 {c.nombre}</span>
                        {yaEsta && <FaCheck className="selector-check-icon" />}
                      </button>
                    );
                  })
                ) : (
                  <p className="selector-carpeta-vacia">No tienes carpetas creadas.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="album-bottom-grid">
          <div 
            className="album-cover-box" 
            style={albumActual.coverImage ? { backgroundImage: `url(${albumActual.coverImage})` } : undefined} 
          />

          <div className="reproductor-panel-moderno-ancho">
            <div className="progress-container progress-container-clean">
              <input 
                type="range" 
                className="progress-bar-input"
                min={0}
                max={duracionTotal || 100}
                value={tiempoActual}
                onChange={cambiarProgreso}
              />
              <div className="progress-time-labels">
                <span>{formatearTiempo(tiempoActual)}</span>
                <span>{formatearTiempo(duracionTotal)}</span>
              </div>
            </div>

            <div className="reproductor-controles-modernos-fila">
              <button className="heart-action-btn" onClick={anteriorCancion} title="Anterior">
                <FaStepBackward className="icon-nav-style" />
              </button>

              {!estaReproduciendo ? (
                <button className="play-circle-btn-principal" onClick={() => manejarReproduccion(cancionActual)} title="Reproducir">
                  <FaPlay className="play-icon-inner" />
                </button>
              ) : (
                <button className="pause-circle-btn-principal" onClick={manejarPausa} title="Pausar">
                  <FaPause className="pause-icon-inner" />
                </button>
              )}

              <button className="heart-action-btn" onClick={siguienteCancion} title="Siguiente">
                <FaStepForward className="icon-nav-style" />
              </button>
            </div>

            <div className="reproductor-volumen-grupo">
              {volumen === 0 ? (
                <FaVolumeMute className="volume-icon-clickable" onClick={alternarMute} title="Activar sonido" />
              ) : (
                <FaVolumeUp className="volume-icon-clickable" onClick={alternarMute} title="Silenciar" />
              )}
              <input 
                type="range" 
                className="volume-slider-input"
                min={0}
                max={1}
                step={0.01}
                value={volumen}
                onChange={cambiarVolumen}
                title="Volumen"
              />
            </div>

            {colaReproduccion.length > 0 && (
              <div className="reproductor-badge-cola" title="Total de temas en la cola">
                {colaReproduccion.length}
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="playlist-usuario-box">
        <details className="carpeta-acordeon-details">
          <summary className="section-title-clean flex-center-gap">
            <FaFolderOpen className="text-primary-color" /> MIS CARPETAS ▾
          </summary>

          <div className="carpeta-contenido-desplegable">
            <form onSubmit={crearCarpeta} className="carpeta-form-container">
              <input 
                type="text" 
                placeholder="Nueva carpeta (ej. La Renga, Soda Stereo...)"
                className="login-input carpeta-input-clean"
                value={nombreNuevaCarpeta}
                onChange={(e) => setNombreNuevaCarpeta(e.target.value)}
              />
              <button type="submit" className="login-btn-entrar carpeta-crear-btn">
                <FaFolderPlus /> Crear
              </button>
            </form>

            {carpetasUsuario.length > 0 ? (
              carpetasUsuario.map(carpeta => (
                <details key={carpeta.id} className="carpeta-item-card-clean">
                  <summary className="carpeta-header-flex">
                    <span className="carpeta-titulo-estilo">
                      📁 {carpeta.nombre} <span className="carpeta-contador-texto">({carpeta.canciones.length} temas)</span>
                    </span>
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); eliminarCarpeta(carpeta.id); }} 
                      className="btn-eliminar-carpeta"
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </summary>

                  {carpeta.canciones.length > 0 && (
                    <div className="carpeta-canciones-lista">
                      {carpeta.canciones.map(song => (
                        <div key={song.id} className="playlist-item-card playlist-item-card-compact">
                          <span className="playlist-song-title">
                            <strong>{song.titulo}</strong> - <span className="playlist-song-artist">{song.artista}</span>
                          </span>
                          <div className="playlist-acciones-grupo">
                            <button className="playlist-acciones-btn" onClick={() => reproducirCola([song], 0)} title="Reproducir">
                              <FaPlay />
                            </button>
                            <button className="playlist-acciones-btn" onClick={() => eliminarDeCarpeta(carpeta.id, song.id)} title="Quitar">
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </details>
              ))
            ) : (
              <p className="text-muted-clean">No tienes carpetas creadas.</p>
            )}
          </div>
        </details>
      </div>

      <button 
        className="explorar-toggle-btn" 
        onClick={() => {
          if (!usuarioLogueado) {
            alert("⚠️ Debe iniciar sesión.");
            return;
          }
          setMenuExplorarAbierto(!menuExplorarAbierto);
        }}
      >
        <FaCompass /> {menuExplorarAbierto ? 'Ocultar Explorador de Géneros' : 'Explorar por Género y Artista'}
      </button>

      {menuExplorarAbierto && usuarioLogueado && (
        <div className="explorar-dropdown-panel">
          <div className="explorar-header-flex">
            <h3 className="section-title-clean">Filtro por Género Musical</h3>
            {idsSeleccionados.length > 0 && (
              <button 
                onClick={reproducirSeleccionadas}
                className="btn-reproducir-seleccionadas"
              >
                <FaListUl /> Reproducir seleccionadas ({idsSeleccionados.length})
              </button>
            )}
          </div>

          <FiltrosGenero generos={listaGeneros} generoActivo={generoActivo} alSeleccionar={setGeneroActivo} />
          
          <div className="artistas-genero-indicador">
            <span>🎵 Artistas en este género: </span>
            <strong className="artista-destacado-texto">
              {generoActivo === 'Todo' 
                ? "Todos los artistas del catálogo" 
                : Array.from(new Set(cancionesFiltradas.map(s => s.artista))).join(", ")}
            </strong>
          </div>

          <div className="explorar-filtro-fila">
            <button 
              onClick={toggleSeleccionarTodos}
              className="btn-seleccionar-todos-clean"
            >
              {cancionesFiltradas.length > 0 && cancionesFiltradas.every(s => idsSeleccionados.includes(s.id)) ? (
                <><FaCheckSquare /> Deseleccionar todos</>
              ) : (
                <><FaSquare /> Seleccionar todos ({cancionesFiltradas.length})</>
              )}
            </button>
            <span className="contador-seleccionados-texto">
              {idsSeleccionados.length} seleccionada(s)
            </span>
          </div>

         <div className="canciones-lista-flex">
            {cancionesFiltradas.map((song) => {
              const estaSeleccionada = idsSeleccionados.includes(song.id);
              return (
                <div key={song.id} className="cancion-item-fila">
                  <div className="cancion-item-info">
                    <button 
                      onClick={() => toggleSeleccionCancion(song.id)}
                      className={estaSeleccionada ? 'btn-check-item-activo' : 'btn-check-item-inactivo'}
                    >
                      {estaSeleccionada ? <FaCheckSquare /> : <FaSquare />}
                    </button>
                    <span className="cancion-texto-blanco"><strong>{song.titulo}</strong> - {song.artista} ({song.duracion})</span>
                  </div>
                  <button 
                    onClick={() => {
                      reproducirCola(cancionesFiltradas, cancionesFiltradas.findIndex(s => s.id === song.id));
                    }}
                    className="btn-reproducir-item-clean"
                    title="Reproducir este tema y poner el resto en cola"
                  >
                    <FaPlay />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="playlist-usuario-box">
        <h3 className="section-title-clean">
          📀 {nombreAlbumActual} - {artistaActual}
        </h3>
        
        <div className="album-info-grid">
          <div>📅 <strong>Lanzamiento:</strong> {discoInfo.lanzamiento}</div>
          <div>⏱️ <strong>Duración tema:</strong> {cancionActual?.duracion || discoInfo.duracion}</div>
          <div>🏷️ <strong>Sello:</strong> {discoInfo.sello}</div>
          <div>🎵 <strong>Pista actual:</strong> {cancionActual?.titulo}</div>
        </div>
      </div>

      <ModalBuscador 
        abierto={modalAbierto} 
        alCerrar={() => setModalAbierto(false)} 
        usuarioLogueado={usuarioLogueado}
        alSeleccionarCancion={(cancionConAlbum) => {
          setAlbumActual(cancionConAlbum.albumPadre);
          reproducirCola([cancionConAlbum], 0);
        }}
        alAgregarAPlaylist={() => {
          const carpetaDestino = carpetasUsuario.length > 0 ? carpetasUsuario[0].id : undefined;
          if (carpetaDestino) agregarACarpetaSeleccionada(carpetaDestino);
        }}
      />

    </div>
  );
};

export default AlbunDetalle;