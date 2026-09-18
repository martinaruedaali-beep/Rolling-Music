import './error404.css'
 import fondoConcierto from '../../assets/fondo-404.jpg'

const EQ_BARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  delay: (i % 8) * 0.09,
  duration: 0.6 + (i % 5) * 0.12,
}))

export default function Error404() {
  return (
    <div className="error404-root">
      <div className="error404-bg" aria-hidden="true">
        <img src={fondoConcierto} alt="" className="error404-bg-img" />
        <div className="error404-vignette" />
        <div className="error404-grain" />
      </div>

      <div className="error404-content">
        <div className="error404-numbers">
          <span className="error404-number">4</span>
          <span className="error404-number error404-zero">0</span>
          <span className="error404-number">4</span>
        </div>

        <div className="error404-eq" role="presentation" aria-hidden="true">
          {EQ_BARS.map((bar) => (
            <span
              key={bar.id}
              className="error404-eq-bar"
              style={{
                animationDelay: `${bar.delay}s`,
                animationDuration: `${bar.duration}s`,
              }}
            />
          ))}
        </div>

        <h1 className="error404-subtitle">Se rompió una cuerda por acá.</h1>

        <div className="error404-description">
          <p>Parece que esta canción no existe...</p>
          <p className="muted">pero la música siempre encuentra el camino.</p>
        </div>

        <div className="error404-actions">
          <a className="error404-btn-primary" href="/">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver al inicio</span>
          </a>
          <a className="error404-link-secondary" href="/explorar">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
             <span className="underline-text">Date una vuelta por el repertorio</span>
          </a>
        </div>
      </div>

      <footer className="error404-footer">
        <p>© 2026 Rolling Rock. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
