import { useState, type FormEvent } from 'react'
import { obtenerUsuarios } from '../../services/usuarioservice'
import '../auth.css'

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
    <div className="auth-page">
      <section className="auth-card">
      <h1 className="auth-title">Recuperar contraseña</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="auth-button" type="submit">
          Recuperar contraseña
        </button>
      </form>

      {mensaje && <p className="auth-message">{mensaje}</p>}
      </section>
    </div>
  )
}

export default RecuperarPassword