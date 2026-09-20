<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
=======
import { useState, useRef, useEffect, useCallback } from 'react';
import './Playlist.css'; // O el nombre del CSS que uses para darle diseño
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
import { Boton } from '../../../components/Boton/Boton';
import { TablaCanciones } from '../../../components/TablaCanciones/TablaCanciones';
import { ModalBuscador } from '../../../components/Modal/ModalBuscador';
import { AlertaPlaylist } from '../../../components/Alertas/AlertaPlaylist';
import { FiltrosGenero } from '../../../components/Filtros/FiltrosGenero';
import { catalogoAlbums } from '../../../data/mockData';
import type { Cancion } from '../../../tipos/cancion';
import type { Album } from '../../../tipos/Album';
<<<<<<< HEAD
import { FaPlay, FaPause, FaHeart, FaPlus, FaUserCircle, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaCompass, FaSignOutAlt, FaSignInAlt, FaTrash, FaLock, FaFolderOpen, FaFolderPlus, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
=======
import { FaPlay, FaPause, FaHeart, FaPlus, FaUserCircle, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaCompass, FaSignOutAlt, FaSignInAlt, FaTrash, FaLock, FaFolderOpen, FaFolderPlus, FaCheck } from 'react-icons/fa';
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)

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

export const DetalleAlbum = () => {
  const [albumActual, setAlbumActual] = useState<Album>(catalogoAlbums[0]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [textoAlerta, setTextoAlerta] = useState("¡Canción agregada con éxito!");
  
  const [indiceCancionActual, setIndiceCancionActual] = useState(0);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  
  const [menuExplorarAbierto, setMenuExplorarAbierto] = useState(false);
  const [generoActivo, setGeneroActivo] = useState<string>('Todo');
  const [mostrarMenuLogout, setMostrarMenuLogout] = useState(false);

<<<<<<< HEAD
  const [usuarioActual, setUsuarioActual] = useState<UsuarioRegistrado | null>(null);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
=======
  const [usuarioActual, setUsuarioActual] = useState<UsuarioRegistrado | null>(USUARIOS_VALIDOS[0]);
  const [mostrarLoginModal, setMostrarLoginModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
  const [errorLogin, setErrorLogin] = useState('');

  const [tiempoActual, setTiempoActual] = useState(0);
  const [duracionTotal, setDuracionTotal] = useState(0);
  const [volumen, setVolumen] = useState(1);
  const [volumenAnterior, setVolumenAnterior] = useState(1);
  
  const [nombreNuevaCarpeta, setNombreNuevaCarpeta] = useState('');
  const [mostrarSelectorCarpetas, setMostrarSelectorCarpetas] = useState(false);

<<<<<<< HEAD
  const [carpetasUsuario, setCarpetasUsuario] = useState<CarpetaPersonalizada[]>([]);
=======
  const [carpetasUsuario, setCarpetasUsuario] = useState<CarpetaPersonalizada[]>(() => {
    try {
      const guardadas = localStorage.getItem(`carpetas_${USUARIOS_VALIDOS[0].email}`);
      return guardadas ? JSON.parse(guardadas) : [
        { id: '1', nombre: 'Mis Favoritos', canciones: [] }
      ];
    } catch (error) {
      console.error("Error al leer el localStorage:", error);
      return [{ id: '1', nombre: 'Mis Favoritos', canciones: [] }];
    }
  });
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const cancionActual = albumActual.songs[indiceCancionActual] || albumActual.songs[0];
  const estaEnAlgunaCarpeta = carpetasUsuario.some(c => c.canciones.some(s => s.id === cancionActual.id));

<<<<<<< HEAD
=======
  const siguienteCancion = useCallback(() => {
    const nuevoIndice = (indiceCancionActual + 1) % albumActual.songs.length;
    setIndiceCancionActual(nuevoIndice);
  }, [indiceCancionActual, albumActual.songs.length]);

>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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
  }, [albumActual, indiceCancionActual]);

<<<<<<< HEAD
  useEffect(() => {
    const manejarTecladoLogin = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mostrarLoginModal) {
        setMostrarLoginModal(false);
        setErrorLogin('');
      }
    };

    window.addEventListener('keydown', manejarTecladoLogin);
    return () => window.removeEventListener('keydown', manejarTecladoLogin);
  }, [mostrarLoginModal]);

  const manejarReproduccion = (cancion: Cancion, index?: number) => {
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para reproducir música.");
      setMostrarLoginModal(true);
      return;
    }

=======
  const manejarReproduccion = (cancion: Cancion, index?: number) => {
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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

  const manejarPausa = () => {
<<<<<<< HEAD
    if (!usuarioActual) {
      setMostrarLoginModal(true);
      return;
    }

=======
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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
<<<<<<< HEAD
    if (!usuarioActual) return;
=======
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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

<<<<<<< HEAD
  const siguienteCancion = () => {
    if (!usuarioActual) {
      setMostrarLoginModal(true);
      return;
    }
    const nuevoIndice = (indiceCancionActual + 1) % albumActual.songs.length;
    manejarReproduccion(albumActual.songs[nuevoIndice], nuevoIndice);
  };

  const anteriorCancion = () => {
    if (!usuarioActual) {
      setMostrarLoginModal(true);
      return;
    }
=======
  const anteriorCancion = () => {
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
    const nuevoIndice = indiceCancionActual === 0 ? albumActual.songs.length - 1 : indiceCancionActual - 1;
    manejarReproduccion(albumActual.songs[nuevoIndice], nuevoIndice);
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

<<<<<<< HEAD
  const agregarACarpetaSeleccionada = (idCarpeta: string, cancionSeleccionada: Cancion = cancionActual) => {
=======
  const agregarACarpetaSeleccionada = (idCarpeta: string) => {
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
    if (!usuarioActual) return;

    const actualizadas = carpetasUsuario.map(carpeta => {
      if (carpeta.id === idCarpeta) {
<<<<<<< HEAD
        if (!carpeta.canciones.some(s => s.id === cancionSeleccionada.id)) {
          return { ...carpeta, canciones: [...carpeta.canciones, cancionSeleccionada] };
        } else {
          setTextoAlerta(`La canción ya está en "${carpeta.nombre}"`);
          return carpeta;
=======
        if (!carpeta.canciones.some(s => s.id === cancionActual.id)) {
          return { ...carpeta, canciones: [...carpeta.canciones, cancionActual] };
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
        }
      }
      return carpeta;
    });

    setCarpetasUsuario(actualizadas);
    localStorage.setItem(`carpetas_${usuarioActual.email}`, JSON.stringify(actualizadas));
<<<<<<< HEAD
    
    if (!carpetasUsuario.find(c => c.id === idCarpeta)?.canciones.some(s => s.id === cancionSeleccionada.id)) {
      setTextoAlerta(`¡Canción agregada a la carpeta!`);
    }
=======
    setTextoAlerta(`¡Canción agregada a la carpeta!`);
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
    setAlertaVisible(true);
    setMostrarSelectorCarpetas(false);
  };

  const eliminarDeCarpeta = (idCarpeta: string, idCancion: string | number) => {
    if (!usuarioActual) return;
    const actualizadas = carpetasUsuario.map(carpeta => {
      if (carpeta.id === idCarpeta) {
        return {
          ...carpeta,
          canciones: carpeta.canciones.filter(s => s.id !== idCancion)
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
<<<<<<< HEAD
      
      const carpetasGuardadas = localStorage.getItem(`carpetas_${encontrado.email}`);
      setCarpetasUsuario(carpetasGuardadas ? JSON.parse(carpetasGuardadas) : [
        { id: '1', nombre: 'Mis Favoritos', canciones: [] }
      ]);
=======
      try {
        const carpetasGuardadas = localStorage.getItem(`carpetas_${encontrado.email}`);
        setCarpetasUsuario(carpetasGuardadas ? JSON.parse(carpetasGuardadas) : [
          { id: '1', nombre: 'Mis Favoritos', canciones: [] }
        ]);
      } catch (err) {
        console.error("Error al leer carpetas de usuario:", err);
        setCarpetasUsuario([{ id: '1', nombre: 'Mis Favoritos', canciones: [] }]);
      }
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
      
      setErrorLogin('');
      setEmailInput('');
      setPassInput('');
      setMostrarLoginModal(false);
    } else {
      setErrorLogin('❌ Credenciales incorrectas.');
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    setCarpetasUsuario([]);
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

  const seleccionarCancionDelExplorador = (cancionConAlbum: CancionConAlbum) => {
<<<<<<< HEAD
    if (!usuarioActual) {
      alert("⚠️ Debe iniciar sesión para reproducir música.");
      setMostrarLoginModal(true);
      return;
    }
=======
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
    setAlbumActual(cancionConAlbum.albumPadre);
    const index = cancionConAlbum.albumPadre.songs.findIndex(s => s.id === cancionConAlbum.id);
    const indexValido = index !== -1 ? index : 0;
    setIndiceCancionActual(indexValido);
    manejarReproduccion(cancionConAlbum.albumPadre.songs[indexValido], indexValido);
    setMenuExplorarAbierto(false);
  };

  const cancionesConAlbum: CancionConAlbum[] = catalogoAlbums.flatMap(album => 
    album.songs.map(song => ({ ...song, albumPadre: album }))
  );

  const cancionesFiltradas = generoActivo === 'Todo'
    ? cancionesConAlbum
    : cancionesConAlbum.filter((item) => item.genero === generoActivo);

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
<<<<<<< HEAD
          <span>🔒 Estás navegando como invitado. Las funciones de reproducción y playlists están restringidas.</span>
=======
          <span>🔒 Estás navegando como invitado. Las funciones de crear carpetas y playlists están restringidas.</span>
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
          <Boton variante="primario" onClick={() => setMostrarLoginModal(true)}>
            <FaSignInAlt /> Iniciar Sesión
          </Boton>
        </div>
      )}

      <div className="album-header-clean">
        <div 
          className="album-cover-box" 
          style={albumActual.coverImage ? { backgroundImage: `url(${albumActual.coverImage})` } : undefined} 
        />
        
        <div>
          <h1 className="album-title-clean">{albumActual.title}</h1>
          
          <div className="album-meta-clean">
            <span className="artista-texto-blanco">{albumActual.artist}</span>
            <span>•</span>
            <span>{albumActual.year}</span>
            <span>•</span>
            <span>{albumActual.genre}</span>
          </div>

          <div className="reproductor-panel-moderno">
            <div className="reproductor-controles-grupo">
              {!estaReproduciendo ? (
                <Boton variante="primario" onClick={() => manejarReproduccion(cancionActual, indiceCancionActual)}>
                  <FaPlay /> Play
                </Boton>
              ) : (
                <button className="pausa-btn-estilo" onClick={manejarPausa} title="Pausar">
                  <FaPause /> Pausa
                </button>
              )}

              <button className="heart-action-btn" onClick={anteriorCancion} title="Anterior">
                <FaStepBackward className="icon-nav-style" />
              </button>
              <button className="heart-action-btn" onClick={siguienteCancion} title="Siguiente">
                <FaStepForward className="icon-nav-style" />
              </button>
            </div>

            <div className="progress-container progress-container-clean">
              <input 
                type="range" 
                className="progress-bar-input"
<<<<<<< HEAD
                disabled={!usuarioActual}
=======
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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
          </div>
          
<<<<<<< HEAD
          <div className="album-actions-clean album-actions-spacing">
=======
          <div className="album-actions-clean margin-top-relative">
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
            <Boton variante="contorno" onClick={() => {
              if (!usuarioActual) {
                alert("⚠️ Debe iniciar sesión para usar el buscador y guardar temas.");
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

            {mostrarSelectorCarpetas && (
              <div className="selector-carpetas-dropdown">
                <p className="selector-carpetas-titulo">
                  📂 Guardar en carpeta:
                </p>
                {carpetasUsuario.length > 0 ? (
                  carpetasUsuario.map(c => {
                    const yaEsta = c.canciones.some(s => s.id === cancionActual.id);
                    return (
                      <button
                        key={c.id}
<<<<<<< HEAD
                        onClick={() => agregarACarpetaSeleccionada(c.id, cancionActual)}
=======
                        onClick={() => agregarACarpetaSeleccionada(c.id)}
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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
      </div>

      {usuarioActual && (
        <div className="playlist-usuario-box">
<<<<<<< HEAD
          <h3 className="section-title-clean section-title-flex">
            <FaFolderOpen className="section-title-icon" /> MIS CARPETAS ({usuarioActual.nombre.toUpperCase()})
=======
          <h3 className="section-title-clean flex-center-gap">
            <FaFolderOpen className="text-primary-color" /> MIS CARPETAS ({usuarioActual.nombre.toUpperCase()})
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
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
                  <button 
                    onClick={() => eliminarCarpeta(carpeta.id)} 
<<<<<<< HEAD
                    className="carpeta-eliminar-btn-clean"
=======
                    className="btn-eliminar-carpeta"
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
                    title="Eliminar carpeta"
                  >
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
<<<<<<< HEAD
                          <button className="playlist-acciones-btn carpeta-btn-chico" onClick={() => manejarReproduccion(song)} title="Reproducir">
                            <FaPlay className="playlist-action-icon-small" />
                          </button>
                          <button className="playlist-acciones-btn carpeta-btn-chico" onClick={() => eliminarDeCarpeta(carpeta.id, song.id)} title="Quitar">
=======
                          <button className="playlist-acciones-btn" onClick={() => manejarReproduccion(song)} title="Reproducir" style={{ width: '26px', height: '26px' }}>
                            <FaPlay className="playlist-action-icon-small" />
                          </button>
                          <button className="playlist-acciones-btn" onClick={() => eliminarDeCarpeta(carpeta.id, song.id)} title="Quitar" style={{ width: '26px', height: '26px' }}>
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
                            <FaTrash className="playlist-action-icon-small" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
<<<<<<< HEAD
            <p className="carpeta-vacia-texto-clean">
=======
            <p className="text-muted-clean">
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
              No tienes carpetas creadas. Usa el campo de arriba para crear una.
            </p>
          )}
        </div>
      )}

      <button className="explorar-toggle-btn" onClick={() => setMenuExplorarAbierto(!menuExplorarAbierto)}>
        <FaCompass /> {menuExplorarAbierto ? 'Ocultar Explorador de Géneros' : 'Explorar por Género y Artista'}
      </button>

      {menuExplorarAbierto && (
        <div className="explorar-dropdown-panel">
<<<<<<< HEAD
          <h3 className="section-title-clean explorar-titulo-margen">Filtro por Género Musical</h3>
          <FiltrosGenero generos={listaGeneros} generoActivo={generoActivo} alSeleccionar={setGeneroActivo} />
          <p className="album-info-clean explorar-info-espaciado">
=======
          <h3 className="section-title-clean margin-bottom-15">Filtro por Género Musical</h3>
          <FiltrosGenero generos={listaGeneros} generoActivo={generoActivo} alSeleccionar={setGeneroActivo} />
          <p className="album-info-clean margin-vertical-info">
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
            Mostrando <strong>{cancionesFiltradas.length}</strong> canciones para: <em>{generoActivo}</em>.
          </p>
          <TablaCanciones canciones={cancionesFiltradas} alReproducirCancion={(song) => seleccionarCancionDelExplorador(song as CancionConAlbum)} />
        </div>
      )}

      <h3 className="section-title-clean">
<<<<<<< HEAD
        Canciones del Álbum <span className="reproduciendo-subtext">({cancionActual.titulo})</span>
=======
        Canciones del Álbum: <span className="reproduciendo-subtext">{albumActual.title}</span>
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
      </h3>

      <TablaCanciones 
        canciones={albumActual.songs} 
        cancionActualId={cancionActual.id}
        alReproducirCancion={(cancion) => {
          const index = albumActual.songs.findIndex(s => s.id === cancion.id);
          manejarReproduccion(cancion, index);
        }} 
      />

      {mostrarLoginModal && (
        <div className="login-overlay">
          <form className="login-card login-card-clean" onSubmit={handleLoginSubmit}>
            
            <img 
              src="/logo-rolling-rock.png" 
              alt="Logo marca de agua" 
              className="login-logo-watermark"
            />

            <div className="login-content-wrapper">
<<<<<<< HEAD
              <h3 className="modal-titulo-limpio login-titulo-centrado">
                <FaLock /> Acceso Restringido - Rock Music
              </h3>
              <p className="modal-texto-limpio login-titulo-centrado">
                Ingrese con una de las cuentas de prueba autorizadas para gestionar su carpeta y playlist:
              </p>

              <div className="login-credenciales-caja">
=======
              <h3 className="modal-titulo-limpio text-center">
                <FaLock /> Acceso Restringido - Rock Music
              </h3>
              <p className="modal-texto-limpio text-center">
                Ingrese con una de las cuentas de prueba autorizadas para gestionar su carpeta y playlist:
              </p>

              <div className="login-credentials-box">
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
                <p><strong>Usuario 1:</strong> Usuario1@rock.com | R1234</p>
                <p><strong>Usuario 2:</strong> Usuario2@rock.com | R2345</p>
                <p><strong>Usuario 3:</strong> Usuario3@rock.com | R3456</p>
              </div>

              <input 
                type="email" 
                placeholder="Correo electrónico"
                className="login-input"
<<<<<<< HEAD
                autoComplete="off"
=======
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />

<<<<<<< HEAD
              <div className="login-password-wrapper">
                <input 
                  type={mostrarContrasena ? "text" : "password"} 
                  placeholder="Contraseña"
                  className="login-input login-input-password-ext"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  className="login-eye-btn"
                  title={mostrarContrasena ? "Ocultar contraseña" : "Ver contraseña"}
                >
                  {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
=======
              <input 
                type="password" 
                placeholder="Contraseña"
                className="login-input"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                required
              />
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)

              {errorLogin && <p className="login-error-text">{errorLogin}</p>}

              <div className="login-botones-container">
                <button type="submit" className="login-btn-entrar">
                  Entrar
                </button>
                <button 
                  type="button" 
                  className="login-btn-cancelar"
                  onClick={() => {
                    setMostrarLoginModal(false);
                    setErrorLogin('');
                  }}
                >
                  Cancelar
                </button>
              </div>
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
          const index = cancionConAlbum.albumPadre.songs.findIndex(s => s.id === cancionConAlbum.id);
          const indexValido = index !== -1 ? index : 0;
          setIndiceCancionActual(indexValido);
          manejarReproduccion(cancionConAlbum.albumPadre.songs[indexValido], indexValido);
        }}
<<<<<<< HEAD
        alAgregarAPlaylist={(cancion) => {
          if (carpetasUsuario.length > 0) {
            agregarACarpetaSeleccionada(carpetasUsuario[0].id, cancion);
          } else {
            setTextoAlerta("⚠️ Crea una carpeta primero en 'MIS CARPETAS' para poder guardar.");
            setAlertaVisible(true);
          }
=======
        alAgregarAPlaylist={() => {
          const carpetaDestino = carpetasUsuario.length > 0 ? carpetasUsuario[0].id : undefined;
          if (carpetaDestino) agregarACarpetaSeleccionada(carpetaDestino);
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
        }}
      />

    </div>
  );
};