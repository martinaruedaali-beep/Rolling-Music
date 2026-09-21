import type { Album } from '../tipos/Album';

export const catalogoAlbums: Album[] = [
  {
    id: 'alb-01',
    title: 'Despedazado por mil partes',
    artist: 'La Renga',
    year: 1996,
    genre: 'Hard Rock',
    description: 'Disco fundamental del hard rock nacional.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-01',
        titulo: 'Desnudo para siempre',
        artista: 'La Renga',
        album: 'Despedazado por mil partes',
        duracion: '5:41',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
      },
      {
        id: 'song-02',
        titulo: 'El final es donde partí',
        artista: 'La Renga',
        album: 'Despedazado por mil partes',
        duracion: '4:25',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      },
      {
        id: 'song-03',
        titulo: 'Balada del diablo y la muerte',
        artista: 'La Renga',
        album: 'Despedazado por mil partes',
        duracion: '5:02',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
      }
    ]
  },
  {
    id: 'alb-02',
    title: 'Canción Animal',
    artist: 'Soda Stereo',
    year: 1990,
    genre: 'Rock',
    description: 'El quinto álbum de estudio de la banda consagratoria del rock en español.',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-04',
        titulo: 'De Música Ligera',
        artista: 'Soda Stereo',
        album: 'Canción Animal',
        duracion: '3:32',
        genero: 'Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
      },
      {
        id: 'song-05',
        titulo: 'Un Millón de Años Luz',
        artista: 'Soda Stereo',
        album: 'Canción Animal',
        duracion: '5:05',
        genero: 'Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
      }
    ]
  },
  {
    id: 'alb-03',
    title: 'Master of Puppets (Tributo/Ref)',
    artist: 'Metallica Style',
    year: 1986,
    genre: 'Metal',
    description: 'Álbum icónico del thrash metal mundial.',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-06',
        titulo: 'Battery (Live)',
        artista: 'Metal Power',
        album: 'Metal Underground',
        duracion: '5:12',
        genero: 'Metal',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
      },
      {
        id: 'song-07',
        titulo: 'The Trooper Spirit',
        artista: 'Iron Cover',
        album: 'Metal Legacy',
        duracion: '4:10',
        genero: 'Metal',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
      }
    ]
  },
  {
    id: 'alb-04',
    title: 'Anarquía y Punk',
    artist: 'Los Violadores Style',
    year: 1985,
    genre: 'Punk',
    description: 'Selección de temas crudos y directos del movimiento punk underground.',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-08',
        titulo: 'Represión Urbana',
        artista: 'Punk Riot',
        album: 'Grita el Sur',
        duracion: '2:45',
        genero: 'Punk',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
      },
      {
        id: 'song-09',
        titulo: 'Fuera de Control',
        artista: 'Los Anarkos',
        album: 'Sin Ley',
        duracion: '2:15',
        genero: 'Punk',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
      },
      {
        id: 'song-10',
        titulo: 'Callejón Sin Salida',
        artista: 'Furia Punk',
        album: 'Resistencia',
        duracion: '3:05',
        genero: 'Punk',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3'
      }
    ]
  }
];