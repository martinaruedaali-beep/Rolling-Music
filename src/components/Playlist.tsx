import { useState, type FormEvent } from "react";
import { FiltrosGenero } from "../components/Filtros/FiltrosGenero";
import "./Playlist.css";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
}

interface SavedPlaylist {
  id: string;
  name: string;
  count: string;
}

type Tab = "canciones" | "guardadas";

export default function Playlist() {
  const [generoActivo, setGeneroActivo] = useState<string>("");
  const [albumSeleccionado, setAlbumSeleccionado] = useState<string>("Despedazado por mil partes");

  const [songs] = useState<Song[]>([
    { id: "1", title: "", artist: "", album: "", duration: "" },
    { id: "2", title: "", artist: "", album: "", duration: "" },
    { id: "3", title: "", artist: "", album: "", duration: "" },
    { id: "4", title: "", artist: "", album: "", duration: "" },
    { id: "5", title: "", artist: "", album: "", duration: "" },
  ]);

  const [activeTab, setActiveTab] = useState<Tab>("canciones");

  const [playlist, setPlaylist] = useState<SavedPlaylist[]>([
    { id: "p1", name: "Fiesta", count: "12" },
    { id: "p2", name: "Rock para manejar", count: "8" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleCreate(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Ingresa un nombre para la playlist.");
      return;
    }

    if (playlist.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setError("Ya existe una playlist con ese nombre.");
      return;
    }

    const nueva: SavedPlaylist = {
      id: crypto.randomUUID(),
      name: trimmed,
      count: "0",
    };

    setPlaylist((prev) => [nueva, ...prev]);
    setModalOpen(false);
    setActiveTab("guardadas");
    setName("");
    setError("");
  }

  return (
    <div className="playlist-screen">
      <h1 className="playlist-title">Mi Playlist</h1>
      <p className="album-actual-texto">Álbum actual: {albumSeleccionado}</p>

      <div className="playlist-tabs">
        <button
          className={`playlist-tab ${activeTab === "canciones" ? "active" : ""}`}
          onClick={() => setActiveTab("canciones")}
        >
          Mis canciones
        </button>
        <button
          className={`playlist-tab ${activeTab === "guardadas" ? "active" : ""}`}
          onClick={() => setActiveTab("guardadas")}
        >
          Playlist guardadas
        </button>
      </div>

      {activeTab === "canciones" ? (
        <div className="playlist-table-wrap">
          <FiltrosGenero 
            generos={["Todo", "Rock", "Hard Rock", "Metal", "Punk"]} 
            generoActivo={generoActivo}
            alSeleccionar={(genero: string) => {
              if (genero === "Todo") {
                setGeneroActivo("");
                setAlbumSeleccionado("Despedazado por mil partes");
              } else {
                setGeneroActivo(genero);
                setAlbumSeleccionado(genero);
              }
            }}
          />

          <table className="playlist-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Artista</th>
                <th>Álbum</th>
                <th className="col-dur">Duración</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td className="col-dur">{song.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="playlist-grid">
          {playlist.length === 0 ? (
            <p className="empty-state">Todavía no creaste ninguna playlist.</p>
          ) : (
            playlist.map((p) => (
              <div className="playlist-card" key={p.id}>
                <div className="playlist-name">{p.name}</div>
                <div className="playlist-meta">{p.count} canciones</div>
              </div>
            ))
          )}
        </div>
      )}

      <button className="create-btn" onClick={() => setModalOpen(true)}>
        + Nueva playlist
      </button>

      {modalOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <form className="modal" onSubmit={handleCreate}>
            <h2>Nueva playlist</h2>
            <p className="hint">Ponele un nombre para empezar a agregar canciones.</p>

            <label className="field-label" htmlFor="playlistName">
              Nombre de la playlist
            </label>
            <input
              id="playlistName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Noche de asado"
            />
            <div className="field-error">{error}</div>

            <div className="modal-actions">
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancelar
              </button>
              <button type="submit">Crear playlist</button>
            </div>
          </form>
        </div>
      )}
    </div>  
  );
}