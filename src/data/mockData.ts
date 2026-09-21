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
  },
  // --- NUEVOS ÁLBUMES Y 12 CANCIONES NUEVAS (Con repetición en La Renga, Soda Stereo y Metal Power) ---
  {
    id: 'alb-05',
    title: 'La Esquina del Infinite',
    artist: 'La Renga',
    year: 2000,
    genre: 'Hard Rock',
    description: 'Nuevo disco agregado para sumar más temas de La Renga.',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-11',
        titulo: 'En el Baldío',
        artista: 'La Renga',
        album: 'La Esquina del Infinite',
        duracion: '4:15',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3'
      },
      {
        id: 'song-12',
        titulo: 'Panic Show',
        artista: 'La Renga',
        album: 'La Esquina del Infinite',
        duracion: '3:50',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3'
      },
      {
        id: 'song-13',
        titulo: 'A La Carga',
        artista: 'La Renga',
        album: 'La Esquina del Infinite',
        duracion: '4:30',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3'
      },
      {
        id: 'song-14',
        titulo: 'arte Infernal',
        artista: 'La Renga',
        album: 'La Esquina del Infinite',
        duracion: '5:10',
        genero: 'Hard Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3'
      }
    ]
  },
  {
    id: 'alb-06',
    title: 'Doble Vida',
    artist: 'Soda Stereo',
    year: 1988,
    genre: 'Rock',
    description: 'Más éxitos incorporados de Soda Stereo.',
    coverImage: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-15',
        titulo: 'En la Ciudad de la Furia',
        artista: 'Soda Stereo',
        album: 'Doble Vida',
        duracion: '5:48',
        genero: 'Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3'
      },
      {
        id: 'song-16',
        titulo: 'Lo que Sangra (La Cúpula)',
        artista: 'Soda Stereo',
        album: 'Doble Vida',
        duracion: '4:12',
        genero: 'Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'
      },
      {
        id: 'song-17',
        titulo: 'Corazón Delator',
        artista: 'Soda Stereo',
        album: 'Doble Vida',
        duracion: '5:08',
        genero: 'Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3'
      },
      {
        id: 'song-18',
        titulo: 'Danza Rota',
        artista: 'Soda Stereo',
        album: 'Doble Vida',
        duracion: '3:35',
        genero: 'Rock',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3'
      }
    ]
  },
  {
    id: 'alb-07',
    title: 'Metal Power Live Session',
    artist: 'Metal Power',
    year: 2022,
    genre: 'Metal',
    description: 'Nuevos tracks pesados de la banda repetida Metal Power.',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80',
    songs: [
      {
        id: 'song-19',
        titulo: 'Rige el Metal',
        artista: 'Metal Power',
        album: 'Metal Power Live Session',
        duracion: '4:45',
        genero: 'Metal',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3'
      },
      {
        id: 'song-20',
        titulo: 'Acero Pesado',
        artista: 'Metal Power',
        album: 'Metal Power Live Session',
        duracion: '3:55',
        genero: 'Metal',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3'
      },
      {
        id: 'song-21',
        titulo: 'Guerreros de la Noche',
        artista: 'Metal Power',
        album: 'Metal Power Live Session',
        duracion: '5:20',
        genero: 'Metal',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3'
      },
      {
        id: 'song-22',
        titulo: 'Furia en el Mosh',
        artista: 'Metal Power',
        album: 'Metal Power Live Session',
        duracion: '4:02',
        genero: 'Metal',
        file: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3'
      }
    ]
  }
];