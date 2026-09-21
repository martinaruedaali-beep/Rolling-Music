import { useState, type FormEvent } from 'react'
import {
  crearUsuario,
  obtenerUsuarios
} from '../../services/usuarioservice'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  

 const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (password !== confirmarPassword) {
    alert('Las contraseñas no coinciden')
    return
  }

  const usuarios = obtenerUsuarios()

  const usuarioExistente = usuarios.find(
    (usuario) => usuario.email === email
  )

  if (usuarioExistente) {
    alert('Ya existe un usuario con ese correo')
    return
  }

  crearUsuario(nombre, apellido, email, password)

  alert('Usuario registrado correctamente')

  setNombre('')
  setApellido('')
  setEmail('')
  setPassword('')
  setConfirmarPassword('')
}

  return (
    <div>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
        />

        <button type="submit">
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Registro