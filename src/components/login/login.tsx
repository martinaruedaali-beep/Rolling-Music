import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerUsuarios } from '../../services/usuarioservice'
import { iniciarSesion } from '../../services/sesionservice'
import '../auth.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)

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
    navigate(usuarioEncontrado.rol === 'Admin' ? '/admin' : '/playlist')
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
      <h1 className="auth-title">Iniciar sesión</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      <div className="auth-password">
  <input
    className="auth-input"
    type={mostrarPassword ? 'text' : 'password'}
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    className="auth-password-toggle"
    type="button"
    onClick={() => setMostrarPassword(!mostrarPassword)}
  >
    {mostrarPassword ? 'Ocultar' : 'Mostrar'}
  </button>
</div>
    <div className="auth-options">
  <label className="auth-checkbox">
    <input type="checkbox" />
    <span>Recordarme</span>
  </label>

  <button
    className="auth-link"
    type="button"
    onClick={() => navigate('/recuperar-password')}
  >
    ¿Olvidaste tu contraseña?
  </button>
</div>

        <button className="auth-button" type="submit">
          Ingresar
        </button>
        <button
 className="auth-google"
  type="button"
  onClick={() => alert('Inicio de sesión con Google (simulación)')}
>
  Continuar con Google
</button>

<p className="auth-footer">
  ¿No tenés una cuenta?{' '}
  <button
    className="auth-link"
    type="button"
    onClick={() => navigate('/registro')}
  >
    Registrate
  </button>
</p>
      </form>
      </section>
    </div>
  )
}

export default Login