import type { Usuario } from '../types/usuario'

const CLAVE_USUARIOS = 'usuarios'

export function obtenerUsuarios(): Usuario[] {

  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)

  if (!usuariosGuardados) {
    return []
  }

  return JSON.parse(usuariosGuardados) as Usuario[]
}

export function guardarUsuarios(usuarios: Usuario[]) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
}

export function crearUsuario(
  nombre: string,
  apellido: string,
  email: string,
  password: string
): Usuario {

  const usuarios = obtenerUsuarios()

  const nuevoUsuario: Usuario = {
    id: Date.now(),
    nombre,
    apellido,
    email,
    password
  }

  usuarios.push(nuevoUsuario)

  guardarUsuarios(usuarios)

  return nuevoUsuario
}