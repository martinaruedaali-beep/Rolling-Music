import { useState } from 'react'
import Intro from '../../components/animacion-intro/intro'
import Sidebar from '../../components/Sidebar/Sidebar'
import Playlist from '../../components/Playlist'
import Reproductor from '../../components/Reproductor/Reproductor'
import Hero from '../../components/hero/hero'

function Inicio() {
  const [mostrarIntro, setMostrarIntro] = useState(true)

  if (mostrarIntro) {
    return <Intro onFinish={() => setMostrarIntro(false)} />
  }

return (
  <div className="inicio-layout">
    <Sidebar />
    <main className="inicio-content">
      <Hero />
      <Playlist />
    </main>
    <Reproductor />
  </div>
)
}

export default Inicio