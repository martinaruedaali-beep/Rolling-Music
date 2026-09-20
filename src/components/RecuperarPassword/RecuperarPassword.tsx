import { useState, type FormEvent } from 'react'
import { obtenerUsuarios } from '../../services/usuarioservice'

function RecuperarPassword() {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const usuarios = obtenerUsuarios()

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email
    )

    if (!usuarioEncontrado) {
      setMensaje('No existe una cuenta con ese correo electrónico')
      return
    }

    setMensaje(
      'Se envió un correo de recuperación. (Simulación)'
    )
  }

  return (
    <div>
      <h1>Recuperar contraseña</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Recuperar contraseña
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default RecuperarPassword