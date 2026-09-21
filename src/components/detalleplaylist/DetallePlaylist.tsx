import { useParams, useNavigate } from 'react-router-dom';
import { catalogoAlbums } from '../../data/mockData';
import { TablaCanciones } from '../TablaCanciones/TablaCanciones';
import './DetallePlaylist.css';

function DetallePlaylist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const album = catalogoAlbums.find((a) => a.id === id);

  if (!album) {
    return <p>No se encontró la playlist</p>;
  }

  return (
    <section className="detalle-playlist">
      <h2>{album.title}</h2>
      <p>
        {album.genre} - {album.songs.length} canciones
      </p>

      <TablaCanciones
        canciones={album.songs}
        cancionActualId=""
        alReproducirCancion={() => navigate('/cancion-no-disponible')}
      />
    </section>
  );
}

export default DetallePlaylist;