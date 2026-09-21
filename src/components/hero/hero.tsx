import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-contenido">
        <p className="hero-etiqueta">ROLLING MUSIC</p>

        <h1>EL ROCK NUNCA MUERE</h1>

        <p className="hero-descripcion">
          Descubrí grandes canciones, artistas y álbumes del rock
          que marcaron generaciones.
        </p>

        <button className="hero-boton">
          Explorar ahora
        </button>
      </div>
    </section>
  )
}

export default Hero