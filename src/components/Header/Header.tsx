import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { catalogoAlbums } from "../../data/mockData";
import type { Cancion } from "../../tipos/cancion";
import {
  obtenerSesion,
  cerrarSesion,
} from "../../services/sesionservice";
import type { Usuario } from "../../types/usuario";
import { SearchOutlined } from "@ant-design/icons";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<Cancion[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(obtenerSesion());

  const manejarLogout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  const manejarBusqueda = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (!valor.trim()) {
      setResultados([]);
      return;
    }

    const coincidencias: Cancion[] = [];
    const q = valor.toLowerCase();

    for (const album of catalogoAlbums) {
      for (const cancion of album.songs) {
        if (
          cancion.titulo.toLowerCase().includes(q) ||
          cancion.artista.toLowerCase().includes(q)
        ) {
          coincidencias.push(cancion);
        }
      }
    }

    setResultados(coincidencias);
  };

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <header className="header">
        <form onSubmit={manejarEnvio} className="headerBusqueda">
          <SearchOutlined className="headerBusquedaIcon" />
          <input
            type="search"
            placeholder="Buscar..."
            value={busqueda}
            onChange={manejarBusqueda}
            className="headerBusquedaInput"
          />

          {busqueda.trim() &&
            (resultados.length > 0 ? (
              <ul className="headerResultados">
                {resultados.map((cancion) => (
                  <li key={cancion.id} onClick={() => setBusqueda("")} className="headerResultado">
                    {cancion.titulo} - {cancion.artista}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="headerSinResultados">Sin resultados para "{busqueda}".</p>
            ))}
        </form>

        <div className="headerAcciones">
          {usuario ? (
            <>
              <span className="headerBienvenido">Bienvenido, {usuario.nombre}</span>
              {usuario.rol === "Admin" && (
                <button type="button" onClick={() => navigate("/admin")} className="headerBoton">
                  Admin
                </button>
              )}
              <button type="button" onClick={manejarLogout} className="headerBoton headerBotonSecundario">
                Cerrar sesion
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => navigate("/login")} className="headerBoton">
                Iniciar Sesion
              </button>
              <button type="button" onClick={() => navigate("/registro")} className="headerBoton headerBotonSecundario">
                Registrarse
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
