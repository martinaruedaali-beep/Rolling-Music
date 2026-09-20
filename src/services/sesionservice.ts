import type { Usuario } from '../types/usuario'

const CLAVE_SESION = 'sesion'

export function iniciarSesion(usuario: Usuario) {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario))
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}

export function obtenerSesion(): Usuario | null {
  const sesionGuardada = localStorage.getItem(CLAVE_SESION)

  if (!sesionGuardada) {
    return null
  }

  return JSON.parse(sesionGuardada) as Usuario
}