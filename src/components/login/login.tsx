import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerUsuarios } from '../../services/usuarioservice'
import { iniciarSesion } from '../../services/sesionservice'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const usuarios = obtenerUsuarios()

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.email === email &&
        usuario.password === password
    )

    if (!usuarioEncontrado) {
      alert('Correo o contraseña incorrectos')
      return
    }

    iniciarSesion(usuarioEncontrado)
    navigate('/')
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default Login