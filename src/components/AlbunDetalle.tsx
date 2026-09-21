import { useState, useRef, useEffect } from 'react';
import { Boton } from './Boton/Boton';
import { TablaCanciones } from './TablaCanciones/TablaCanciones';
import { ModalBuscador } from './Modal/ModalBuscador';
import { AlertaPlaylist } from './Alertas/AlertaPlaylist';
import { FiltrosGenero } from './Filtros/FiltrosGenero';
import { catalogoAlbums } from '../data/mockData';
import type { Cancion } from '../tipos/cancion';
import type { Album } from '../tipos/Album';
import { FaPlay, FaPause, FaHeart, FaPlus, FaUserCircle, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaCompass, FaSignOutAlt, FaSignInAlt, FaTrash, FaLock, FaFolderOpen, FaFolderPlus, FaCheck, FaEye, FaEyeSlash, FaListUl, FaCheckSquare, FaSquare } from 'react-icons/fa';

interface CancionConAlbum extends Cancion {
  albumPadre: Album;
}

interface UsuarioRegistrado {
  email: string;
  pass: string;
  nombre: string;
}

interface CarpetaPersonalizada {
  id: string;
  nombre: string;
  canciones: Cancion[];
}

const USUARIOS_VALIDOS: UsuarioRegistrado[] = [
  { email: 'Usuario1@rock.com', pass: 'R1234', nombre: 'Fabricio (Usuario 1)' },
  { email: 'Usuario2@rock.com', pass: 'R2345', nombre: 'Mariana (Usuario 2)' },
  { email: 'Usuario3@rock.com', pass: 'R3456', nombre: 'Carlos (Usuario 3)' }
];

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
  const [mostrarMenuLogout, setMostrarMenuLogout] = useState(false);

  const [usuarioActual, setUsuarioActual] = useState<UsuarioRegistrado | null>(null);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);
  
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');

  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const [volumenAnterior, setVolumenAnterior] = useState(1);
  
  const [nombreNuevaCarpeta, setNombreNuevaCarpeta] = useState('');
  const [mostrarSelectorCarpetas, setMostrarSelectorCarpetas] = useState(false);
  const [carpetasUsuario, setCarpetasUsuario] = useState<CarpetaPersonalizada[]>([]);

  const [colaReproduccion, setColaReproduccion] = useState<Cancion[]>([]);
  const [indiceColaActual, setIndiceColaActual] = useState(0);
  const [idsSeleccionados, setIdsSeleccionados] = useState<(string | number)[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputEmailRef = useRef<HTMLInputElement | null>(null);

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
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para reproducir música.");
      setMostrarLoginModal(true);
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
    if (!usuarioActual) return;
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
    if (!usuarioActual) {
      setMostrarLoginModal(true);
      return;
    }
    siguienteCancionCola();
  };

  const reproducirCola = (listaCanciones: Cancion[], indiceInicio = 0) => {
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para reproducir música.");
      setMostrarLoginModal(true);
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
    if (!usuarioActual) {
      setMostrarLoginModal(true);
      return;
    }
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
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para usar el reproductor.");
      setMostrarLoginModal(true);
      return;
    }
    const nuevoTiempo = Number(e.target.value);
    setTiempoActual(nuevoTiempo);
    if (audioRef.current) {
      audioRef.current.currentTime = nuevoTiempo;
    }
  };

  const cambiarVolumen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para modificar el volumen.");
      setMostrarLoginModal(true);
      return;
    }
    const nuevoVolumen = Number(e.target.value);
    setVolumen(nuevoVolumen);
    if (audioRef.current) {
      audioRef.current.volume = nuevoVolumen;
    }
  };

  const alternarMute = () => {
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para modificar el sonido.");
      setMostrarLoginModal(true);
      return;
    }
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
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para usar los controles.");
      setMostrarLoginModal(true);
      return;
    }
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
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para seleccionar canciones.");
      setMostrarLoginModal(true);
      return;
    }
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
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para seleccionar canciones.");
      setMostrarLoginModal(true);
      return;
    }
    const idsFiltrados = cancionesFiltradas.map(s => String(s.id));
    const todosSeleccionados = idsFiltrados.every(id => idsSeleccionados.map(String).includes(id));

    if (todosSeleccionados) {
      setIdsSeleccionados(prev => prev.filter(id => !idsFiltrados.includes(String(id))));
    } else {
      setIdsSeleccionados(prev => Array.from(new Set([...prev.map(String), ...idsFiltrados])));
    }
  };

  const reproducirSeleccionadas = () => {
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para reproducir canciones.");
      setMostrarLoginModal(true);
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
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para crear carpetas.");
      setMostrarLoginModal(true);
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
    localStorage.setItem(`carpetas_${usuarioActual.email}`, JSON.stringify(actualizadas));
    setNombreNuevaCarpeta('');
    setTextoAlerta(`¡Carpeta "${nuevaCarpeta.nombre}" creada con éxito!`);
    setAlertaVisible(true);
  };

  const agregarACarpetaSeleccionada = (idCarpeta: string) => {
    if (!usuarioActual) {
      setMostrarLoginModal(true);
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
    localStorage.setItem(`carpetas_${usuarioActual.email}`, JSON.stringify(actualizadas));
    setTextoAlerta(`¡Canción agregada a la carpeta!`);
    setAlertaVisible(true);
    setMostrarSelectorCarpetas(false);
  };

  const eliminarDeCarpeta = (idCarpeta: string, idCancion: string | number) => {
    if (!usuarioActual) return;
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
    localStorage.setItem(`carpetas_${usuarioActual.email}`, JSON.stringify(actualizadas));
  };

  const eliminarCarpeta = (idCarpeta: string) => {
    if (!usuarioActual) return;
    const actualizadas = carpetasUsuario.filter(c => c.id !== idCarpeta);
    setCarpetasUsuario(actualizadas);
    localStorage.setItem(`carpetas_${usuarioActual.email}`, JSON.stringify(actualizadas));
    setTextoAlerta("Carpeta eliminada");
    setAlertaVisible(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encontrado = USUARIOS_VALIDOS.find(
      u => u.email.toLowerCase() === emailInput.trim().toLowerCase() && u.pass === passInput.trim()
    );

    if (encontrado) {
      setUsuarioActual(encontrado);
      try {
        const carpetasGuardadas = localStorage.getItem(`carpetas_${encontrado.email}`);
        setCarpetasUsuario(carpetasGuardadas ? JSON.parse(carpetasGuardadas) : [
          { id: '1', nombre: 'Mis Favoritos', canciones: [] }
        ]);
      } catch (err) {
        console.error("Error al leer carpetas:", err);
        setCarpetasUsuario([{ id: '1', nombre: 'Mis Favoritos', canciones: [] }]);
      }
      
      setErrorLogin('');
      setEmailInput('');
      setPassInput('');
      setMostrarPassword(false);
      setMostrarLoginModal(false);
    } else {
      setErrorLogin('❌ Credenciales incorrectas.');
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setCarpetasUsuario([]);
    setColaReproduccion([]);
    setMostrarMenuLogout(false);
    if (audioRef.current) audioRef.current.pause();
    setEstaReproduciendo(false);
  };

  const formatearTiempo = (segundos: number) => {
    if (isNaN(segundos)) return "0:00";
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="detalle-album-wrapper">
      
      <AlertaPlaylist 
        mostrar={alertaVisible} 
        alCerrar={() => setAlertaVisible(false)} 
        mensaje={textoAlerta}
      />

      <div className="user-badge-container">
        <div 
          className="user-badge-box"
          onClick={() => {
            if (usuarioActual) {
              setMostrarMenuLogout(!mostrarMenuLogout);
            } else {
              setMostrarLoginModal(true);
            }
          }}
        >
          <FaUserCircle className="user-icon-clean" />
          <span>{usuarioActual ? usuarioActual.nombre : 'Invitado (Sin Registrar)'}</span>

          {usuarioActual && mostrarMenuLogout && (
            <div className="logout-dropdown" onClick={(e) => { e.stopPropagation(); cerrarSesion(); }}>
              <FaSignOutAlt /> Cerrar Sesión
            </div>
          )}
        </div>
      </div>

      {!usuarioActual && (
        <div className="guest-banner-warning">
          <span>🔒 Estás navegando como invitado. Las funciones de reproducción y playlists están restringidas.</span>
          <Boton variante="primario" onClick={() => setMostrarLoginModal(true)}>
            <FaSignInAlt /> Iniciar Sesión
          </Boton>
        </div>
      )}

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
              if (!usuarioActual) {
                alert("⚠️ Debe iniciar sesión para usar el buscador.");
                setMostrarLoginModal(true);
                return;
              }
              setModalAbierto(true);
            }}>
              <FaPlus /> Buscar y Agregar
            </Boton>
            
            <button 
              className={`heart-btn-dinamico ${estaEnAlgunaCarpeta ? 'heart-btn-activo' : 'heart-btn-inactivo'}`}
              onClick={() => {
                if (!usuarioActual) {
                  alert("⚠️ Debe iniciar sesión para marcar canciones.");
                  setMostrarLoginModal(true);
                  return;
                }
                setMostrarSelectorCarpetas(!mostrarSelectorCarpetas);
              }}
              title="Guardar en carpeta"
            >
              <FaHeart />
            </button>

            {mostrarSelectorCarpetas && usuarioActual && (
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

      {usuarioActual && (
        <div className="playlist-usuario-box">
          <h3 className="section-title-clean flex-center-gap">
            <FaFolderOpen className="text-primary-color" /> MIS CARPETAS ({usuarioActual.nombre.toUpperCase()})
          </h3>

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
              <div key={carpeta.id} className="carpeta-item-card-clean">
                <div className="carpeta-header-flex">
                  <h4 className="carpeta-titulo-estilo">
                    📁 {carpeta.nombre} <span className="carpeta-contador-texto">({carpeta.canciones.length} temas)</span>
                  </h4>
                  <button onClick={() => eliminarCarpeta(carpeta.id)} className="btn-eliminar-carpeta">
                    <FaTrash /> Eliminar
                  </button>
                </div>

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
              </div>
            ))
          ) : (
            <p className="text-muted-clean">No tienes carpetas creadas.</p>
          )}
        </div>
      )}

      <button 
        className="explorar-toggle-btn" 
        onClick={() => {
          if (!usuarioActual) {
            alert("⚠️ Debe iniciar sesión para explorar los géneros.");
            setMostrarLoginModal(true);
            return;
          }
          setMenuExplorarAbierto(!menuExplorarAbierto);
        }}
      >
        <FaCompass /> {menuExplorarAbierto ? 'Ocultar Explorador de Géneros' : 'Explorar por Género y Artista'}
      </button>

      {menuExplorarAbierto && usuarioActual && (
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
                      if (!usuarioActual) {
                        alert("⚠️ Debe iniciar sesión para reproducir canciones.");
                        setMostrarLoginModal(true);
                        return;
                      }
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
          Canciones del Álbum actual: <span className="reproduciendo-subtext">{albumActual.title}</span> ({albumActual.artist})
        </h3>

        <TablaCanciones 
          canciones={albumActual.songs} 
          cancionActualId={cancionActual.id}
          alReproducirCancion={(cancion) => {
            if (!usuarioActual) {
              alert("⚠️ Debe iniciar sesión para reproducir música.");
              setMostrarLoginModal(true);
              return;
            }
            const index = albumActual.songs.findIndex(s => s.id === cancion.id);
            reproducirCola(albumActual.songs, index !== -1 ? index : 0);
          }} 
        />
      </div>

      {mostrarLoginModal && (
        <div className="login-overlay-modern" onClick={() => setMostrarLoginModal(false)}>
          <form className="login-card-modern" onSubmit={handleLoginSubmit} onClick={(e) => e.stopPropagation()}>
            
            <div className="login-header-accent">
              <span className="login-badge-tag">ÁREA RESTRINGIDA</span>
              <h3 className="login-titulo-moderno">
                <FaLock className="login-lock-icon" /> Rock Music Access
              </h3>
              <p className="login-subtitulo-moderno">
                Inicia sesión con tu cuenta autorizada para desbloquear el reproductor y tus carpetas:
              </p>
            </div>

            <div className="login-fields-group">
              <div className="input-with-icon login-input-row">
                <input 
                  ref={inputEmailRef}
                  type="text" 
                  placeholder="usuario@rock.com"
                  className="login-input-modern"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  autoComplete="off"
                  style={{ flex: 1 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput(prev => prev + '@');
                    if (inputEmailRef.current) {
                      inputEmailRef.current.focus();
                    }
                  }}
                  className="btn-arroba-clean"
                  title="Insertar @"
                >
                  @
                </button>
              </div>

              <div className="password-input-wrapper">
                <input 
                  type={mostrarPassword ? "text" : "password"} 
                  placeholder="Contraseña"
                  className="login-input-modern password-input-field"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  title={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {mostrarPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {errorLogin && <p className="login-error-modern">{errorLogin}</p>}

            <div className="login-botones-modernos">
              <button type="submit" className="login-btn-primary">
                Entrar a la plataforma
              </button>
              <button 
                type="button" 
                className="login-btn-ghost"
                onClick={() => {
                  setMostrarLoginModal(false);
                  setErrorLogin('');
                  setMostrarPassword(false);
                }}
              >
                Cancelar
              </button>
            </div>

          </form>
        </div>
      )}

      <ModalBuscador 
        abierto={modalAbierto} 
        alCerrar={() => setModalAbierto(false)} 
        usuarioLogueado={!!usuarioActual}
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