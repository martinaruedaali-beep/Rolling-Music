import { Link } from 'react-router-dom';
import { catalogoAlbums } from '../../data/mockData';
import './NuevosLanzamientos.css';

function NuevosLanzamientos() {
  // ordeno los álbumes por año, del más nuevo al más viejo
  const nuevos = [...catalogoAlbums].sort(
    (a, b) => Number(b.year) - Number(a.year)
  );

  return (
    <section className="lanzamientos">
      <h2>Todo lo nuevo para vos.</h2>

      <div className="lanzamientos-carrusel">
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
    </section>
  );
}

export default NuevosLanzamientos;