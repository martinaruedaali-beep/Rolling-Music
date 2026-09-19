import type { Cancion } from '../../tipos/cancion';
interface FilaCancionProps {
  cancion: Cancion;
  alReproducir: (cancion: Cancion) => void;
}

export const FilaCancion = ({ cancion, alReproducir }: FilaCancionProps) => {
  return (
    <tr onClick={() => alReproducir(cancion)} style={{ cursor: 'pointer' }} className="fila-cancion">
      <td>{cancion.titulo}</td>
      <td>{cancion.artista}</td>
      <td>{cancion.album}</td>
      <td>{cancion.duracion}</td>
    </tr>
  );
};