import { useState } from "react";
import Intro from "../../components/animacion-intro/intro";
import Sidebar from "../../components/Sidebar/Sidebar";
import Playlist from "../../components/Playlist";
import Reproductor from "../../components/Reproductor/Reproductor";
import Hero from "../../components/hero/hero";
import NuevosLanzamientos from "../../components/NuevosLanzamientos/NuevosLanzamientos";
import Header from '../../components/Header/Header'

const CLAVE_INTRO_VISTA = 'introVista';

function Inicio() {
  const [mostrarIntro, setMostrarIntro] = useState(() => {
    try {
      return !localStorage.getItem(CLAVE_INTRO_VISTA);
    } catch {
      return true;
    }
  });

  const handleIntroFinish = () => {
    try {
      localStorage.setItem(CLAVE_INTRO_VISTA, 'true');
    } catch {
      // ignorar error de storage
    }
    setMostrarIntro(false);
  };

  if (mostrarIntro) {
    return <Intro onFinish={handleIntroFinish} />;
  }

return (
  <div className="inicio-layout">
    <Sidebar />
    <Header />
    <main className="inicio-content">
      <Hero />
      <NuevosLanzamientos />
      <Playlist />
    </main>
    <Reproductor />
  </div>
);
}

export default Inicio;
