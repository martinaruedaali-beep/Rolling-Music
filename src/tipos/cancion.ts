export interface Cancion {
  id: string;
  titulo: string;
  artista: string;
  album: string;
  duracion: string;
  file?: string;
  genero?:string;
}