import type { Cancion } from "./cancion";

export interface Album {
  id: number | string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  coverImage: string;
  description: string;
  songs: Cancion[]; 
}