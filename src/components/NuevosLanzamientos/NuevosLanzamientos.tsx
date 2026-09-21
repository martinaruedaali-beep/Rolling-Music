import { useRef } from "react";
import { Link } from "react-router-dom";
import { catalogoAlbums } from "../../data/mockData";
import "./NuevosLanzamientos.css";

function NuevosLanzamientos() {
  const carrusel = useRef<HTMLDivElement>(null);

  // ordeno los álbumes por año, del más nuevo al más viejo
  const nuevos = [...catalogoAlbums].sort(
    (a, b) => Number(b.year) - Number(a.year),
  );

  const mover = (direccion: number) => {
    carrusel.current?.scrollBy({ left: direccion * 300, behavior: "smooth" });
  };

  return (
    <section className="lanzamientos">
      <h2>Todo lo nuevo para vos.</h2>

      <div className="lanzamientos-contenedor">
        <button className="flecha flecha-izq" onClick={() => mover(-1)}>
          ‹
        </button>

        <div className="lanzamientos-carrusel" ref={carrusel}>
          {nuevos.map((album) => (
            <Link
              to={`/playlist/${album.id}`}
              className="lanzamiento-tarjeta"
              key={album.id}
            >
              <img src={album.coverImage} alt={album.title} />
              <h3>{album.title}</h3>
              <p>{album.artist}</p>
              <p>{album.year}</p>
            </Link>
          ))}
        </div>

        <button className="flecha flecha-der" onClick={() => mover(1)}>
          ›
        </button>
      </div>
    </section>
  );
}

export default NuevosLanzamientos;
