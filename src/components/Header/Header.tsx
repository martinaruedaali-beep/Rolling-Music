import { useState, type ChangeEvent, type FormEvent } from "react";
import { catalogoAlbums } from "../../data/mockData";
import type { Cancion } from "../../tipos/cancion";

interface HeaderProps {
  iniciarSesion: () => void;
  registrarse: () => void;
}

function Header({ iniciarSesion, registrarse }: HeaderProps) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<Cancion[]>([]);

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
      <header>
        <form onSubmit={manejarEnvio}>
          <input
            type="search"
            placeholder="Buscar..."
            value={busqueda}
            onChange={manejarBusqueda}
          />

          {busqueda.trim() &&
            (resultados.length > 0 ? (
              <ul>
                {resultados.map((cancion) => (
                  <li key={cancion.id} onClick={() => setBusqueda("")}>
                    {cancion.titulo} - {cancion.artista}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin resultados para "{busqueda}".</p>
            ))}
        </form>

        <div>
          <a href="#" onClick={iniciarSesion}>
            Iniciar Sesion
          </a>
          <a href="#" onClick={registrarse}>
            Registrarse
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
