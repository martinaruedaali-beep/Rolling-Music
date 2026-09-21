import { Link } from 'react-router-dom';
import { catalogoAlbums } from '../../data/mockData';
import './PlaylistsDestacadas.css';

function PlaylistsDestacadas() {
  return (
    <section className="destacadas">
      <h2>Las mejores para vos.</h2>

      <div className="destacadas-grilla">
        {catalogoAlbums.map((album) => (
          <Link to={`/playlist/${album.id}`} className="tarjeta" key={album.id}>
            <img src={album.coverImage} alt={album.title} />
            <h3>{album.title}</h3>
            <p>{album.genre}</p>
            <p>{album.songs.length} canciones</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PlaylistsDestacadas;