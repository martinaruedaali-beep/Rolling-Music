import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerSesion } from '../../services/sesionservice'
import { obtenerUsuarios } from '../../services/usuarioservice'
import '../auth.css'

function RutaAdmin({ children }: { children: ReactNode }) {
  const navigate = useNavigate() 
  const [desbloqueado, setDesbloqueado] = useState(false) 
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('') 
  const sesion = obtenerSesion()

  if (!sesion || sesion.rol !== 'Admin') {
    return (
      <div className="auth-page">
        <section className="auth-card">
          <h1 className="auth-title">Acceso restringido</h1>
          <p>No tenés permisos para ver esta sección.</p>
          <button className="auth-button" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </section>
      </div>
    )
  }

  if (desbloqueado) return <>{children}</>
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    const admin = obtenerUsuarios().find((u) => u.email === sesion.email)

    if (admin && admin.password === password) {
      setDesbloqueado(true) 
    } else {
      setError('Contraseña incorrecta') 
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">Panel de administración</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="password"
            placeholder="Contraseña de administrador"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p>{error}</p>} 
          <button className="auth-button" type="submit">Entrar</button>
        </form>
      </section>
    </div>
  )
}

export default RutaAdmin