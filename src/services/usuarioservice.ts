import type { Usuario } from '../types/usuario'

const CLAVE_USUARIOS = 'usuarios'

export function obtenerUsuarios(): Usuario[] {

  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)

  if (!usuariosGuardados) {
    return [
      {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan@gmail.com",
        password: "1234",
        rol: "Usuario",
      },
      {
        id: 2,
        nombre: "María",
        apellido: "Gómez",
        email: "maria@gmail.com",
        password: "1234",
        rol: "Admin",
      },
      {
        id: 3,
        nombre: "Carlos",
        apellido: "Rodríguez",
        email: "carlos@gmail.com",
        password: "1234",
        rol: "Usuario",
      },
    ];
  }

  return JSON.parse(usuariosGuardados) as Usuario[]
}

export function guardarUsuarios(usuarios: Usuario[]) {
  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify(usuarios)
  )
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
    password,
    rol:'Usuario' 
   }

  usuarios.push(nuevoUsuario)

  guardarUsuarios(usuarios)

  return nuevoUsuario
}

export function actualizarUsuarios(usuarioActualizado: Usuario): Usuario {
  const usuarios = obtenerUsuarios()
  const usuarioActualizados = usuarios.map((usuario) => {
    if (usuario.id === usuarioActualizado.id) {
      return usuarioActualizado
    }
    return usuario
  })
  guardarUsuarios(usuarioActualizados)
  return usuarioActualizado
}
