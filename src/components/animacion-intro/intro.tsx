import { useEffect, useState } from 'react'
import logoRollingRock from '../../assets/icon rolling rock.png'
import './intro.css'

function Intro({ onFinish }: { onFinish: () => void }) {
  const [progreso, setProgreso] = useState(0)
  const [saliendo, setSaliendo] = useState(false)

  const terminarAnimacion = () => {
    setSaliendo(true)
    setTimeout(() => {
      onFinish()
    }, 300)
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso((prev) => {
        if (prev >= 100) {
          clearInterval(intervalo)
          terminarAnimacion()
          return 100
        }
        return prev + 2
      })
    }, 70)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className={saliendo ? 'intro-root intro-saliendo' : 'intro-root'}>
      <button className="intro-skip" onClick={terminarAnimacion}>
        Saltar animación »
      </button>

      <div className="intro-glow"></div>

      <div className="intro-content">
        <img src={logoRollingRock} alt="Rolling Rock" className="intro-logo" />

        <p className="intro-tagline">Donde el rock vive • Siente la distorsión</p>

        <div className="intro-eq">
          <span className="intro-eq-bar"></span>
          <span className="intro-eq-bar"></span>
          <span className="intro-eq-bar"></span>
          <span className="intro-eq-bar"></span>
          <span className="intro-eq-bar"></span>
        </div>

        <div className="intro-progress-track">
          <div className="intro-progress-fill" style={{ width: progreso + '%' }}></div>
        </div>

        <p className="intro-status">Iniciando plataforma de rock...</p>
      </div>
    </div>
  )
}

export default Intro