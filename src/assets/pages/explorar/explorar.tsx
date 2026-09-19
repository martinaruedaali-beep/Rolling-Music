import { useState } from 'react';
import { FiltrosGenero } from '../../../components/Filtros/FiltrosGenero';
import { TablaCanciones } from '../../../components/TablaCanciones/TablaCanciones';
import { Boton } from '../../../components/Boton/Boton';
import { catalogoAlbums } from '../../../data/mockData';
import type { Cancion } from '../../../tipos/cancion';
import type { Album } from '../../../tipos/Album';

interface ExplorarProps {
  alSeleccionarAlbum?: (album: Album, cancionIndex: number) => void;
}

interface CancionConAlbum extends Cancion {
  albumPadre: Album;
}

const listaGeneros = ['Todo', 'Rock', 'Hard Rock', 'Metal', 'Punk'];

export const Explorar: React.FC<ExplorarProps> = ({ alSeleccionarAlbum }) => {
  const [generoActivo, setGeneroActivo] = useState<string>('Todo');

  // Obtenemos todas las canciones aplanadas del catálogo con su respectivo álbum de referencia
  const cancionesConAlbum: CancionConAlbum[] = catalogoAlbums.flatMap(album => 
    album.songs.map(song => ({ ...song, albumPadre: album }))
  );

  const cancionesFiltradas = generoActivo === 'Todo'
    ? cancionesConAlbum
    : cancionesConAlbum.filter((item) => item.genero === generoActivo);

  const manejarSeleccionCancion = (cancionConAlbum: CancionConAlbum) => {
    const albumCorrespondiente = cancionConAlbum.albumPadre;
    const indexCancion = albumCorrespondiente.songs.findIndex(s => s.id === cancionConAlbum.id);

    if (alSeleccionarAlbum) {
      alSeleccionarAlbum(albumCorrespondiente, indexCancion !== -1 ? indexCancion : 0);
    }
  };

  return (
    <div className="explorar-container">
      <h2 className="explorar-titulo">Explorar por Género y Artista</h2>

      <FiltrosGenero
        generos={listaGeneros}
        generoActivo={generoActivo}
        alSeleccionar={setGeneroActivo}
      />

        <p className="album-info-clean" style={{ marginTop: '15px', fontSize: '0.9rem' }}>
        Mostrando <strong>{cancionesFiltradas.length}</strong> {cancionesFiltradas.length === 1 ? 'resultado' : 'resultados'} para el género: <em>{generoActivo}</em>
      </p>

      <TablaCanciones 
        canciones={cancionesFiltradas} 
        alReproducirCancion={(song) => manejarSeleccionCancion(song as CancionConAlbum)} 
      />

      <div className="explorar-btn-centrado">
        <Boton variante="contorno" onClick={() => setGeneroActivo('Todo')}>
          Reiniciar Filtros
        </Boton>
      </div>
    </div>
  );
};