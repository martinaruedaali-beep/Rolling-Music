import { useState } from 'react'
import Intro from '../../components/animacion-intro/intro'
import Sidebar from '../../components/Sidebar/Sidebar'
import Playlist from '../../components/Playlist'
import Reproductor from '../../components/Reproductor/Reproductor'

function Inicio() {
  const [mostrarIntro, setMostrarIntro] = useState(true)

  if (mostrarIntro) {
    return <Intro onFinish={() => setMostrarIntro(false)} />
  }

  return (
    <>
      <Sidebar />
      <Playlist />
      <Reproductor />
    </>
  )
}

export default Inicio