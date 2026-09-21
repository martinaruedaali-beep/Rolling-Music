import type { Cancion } from '../tipos/cancion'
import { catalogoAlbums } from '../data/mockData'

const CLAVE_CANCIONES = 'canciones_crud'

function obtenerSeed(): Cancion[] {
  return catalogoAlbums.flatMap((album) => album.songs.map((s) => ({ ...s })))
}

function seedAndSave(): Cancion[] {
  const seed = obtenerSeed()
  localStorage.setItem(CLAVE_CANCIONES, JSON.stringify(seed))
  return seed
}

export function obtenerCanciones(): Cancion[] {
  const raw = localStorage.getItem(CLAVE_CANCIONES)
  if (!raw) return seedAndSave()
  try {
    const parsed = JSON.parse(raw) as Cancion[]
    if (!Array.isArray(parsed) || parsed.length === 0) return seedAndSave()
    return parsed
  } catch {
    return seedAndSave()
  }
}

export function guardarCanciones(canciones: Cancion[]): void {
  if (canciones.length === 0) {
    // No persistir array vacío: eliminar clave para que la próxima lectura haga seed
    localStorage.removeItem(CLAVE_CANCIONES)
    return
  }
  localStorage.setItem(CLAVE_CANCIONES, JSON.stringify(canciones))
}

export function crearCancion(datos: Omit<Cancion, 'id'>): Cancion {
  const canciones = obtenerCanciones()
  const nueva: Cancion = { id: `song-${Date.now()}`, ...datos }
  const actualizadas = [...canciones, nueva]
  guardarCanciones(actualizadas)
  return nueva
}

export function actualizarCancion(cancionActualizada: Cancion): Cancion {
  const canciones = obtenerCanciones()
  const actualizadas = canciones.map((c) =>
    String(c.id) === String(cancionActualizada.id) ? cancionActualizada : c
  )
  guardarCanciones(actualizadas)
  return cancionActualizada
}

export function eliminarCancion(id: string | number): Cancion[] {
  const canciones = obtenerCanciones()
  const filtradas = canciones.filter((c) => String(c.id) !== String(id))
  if (filtradas.length === 0) {
    // Recarga automática: al vaciar, re-seed desde mockData
    localStorage.removeItem(CLAVE_CANCIONES)
    return seedAndSave()
  }
  guardarCanciones(filtradas)
  return filtradas
}

export function restaurarSiVacio(): Cancion[] {
  return obtenerCanciones()
}

export const CLAVE = CLAVE_CANCIONES
