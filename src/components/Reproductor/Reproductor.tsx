import { useRef, useState } from "react";
import "./Reproductor.css";
import {
  StepBackwardOutlined,
  CaretRightFilled,
  StepForwardOutlined,
  SoundOutlined,
  PauseOutlined,
} from "@ant-design/icons";

function Reproductor() {
  const canciones = [
    {
      nombre: "Musica Para Pastillas",
      artista: "Patricio Rey y Sus redonditos de Ricota",
      audio:
        "/mp3/Patricio Rey y Sus Redonditos de Ricota - Música para Pastillas.mp3",
      portada:"/Portadas/Patricio Rey y Sus Redonditos de Ricota - Música para Pastillas.jpg",
    },
    {
      nombre: "In Bloom",
      artista: "Nirvana",
      audio: "/mp3/Nirvana-In Bloom.mp3",
      portada:"/Portadas/In Bloom - Nirvana.jpg",
    },
  ];

  const [cancionActual, setCancionActual] = useState(0);

  const [reproduciendo, setReproduciendo] = useState(false);

  const audio = useRef<HTMLAudioElement>(null);

  const reproducirPausar = () => {
    if (audio.current) {
      if (reproduciendo) {
        audio.current.pause();
        setReproduciendo(false);
      } else {
        audio.current.play();
        setReproduciendo(true);
      }
    }
  };

  const siguiente = () => {
    if ( cancionActual < canciones.length -1 ){
      setCancionActual(cancionActual + 1 );
      setReproduciendo (false);
    }
  }
  
  const retroceder = () => {
    if (cancionActual > 0 ) {
      setCancionActual(cancionActual - 1);
      setReproduciendo(false);
    }
  }
  return (
    <>
      <div className="reproductor">
        <audio ref={audio} src={canciones[cancionActual].audio} />
        <div className="info-cancion">
          <img
          src={canciones[cancionActual].portada}
          alt={`Portada de ${canciones[cancionActual].nombre}`}
          className="portada"
        />
          <div>
           <h4>{canciones[cancionActual].nombre}</h4>
           <p>{canciones[cancionActual].artista}</p>
          </div>
        </div>

        <div className="controles">
          <div className="botones">
            <button onClick={retroceder}>
              <StepBackwardOutlined />
            </button>
            <button className="play" onClick={reproducirPausar}>
              {reproduciendo ? <PauseOutlined /> : <CaretRightFilled />}
            </button>
            <button onClick={siguiente}>
              <StepForwardOutlined />
            </button>
          </div>

          <div className="barra-progreso">
            <span>0:00</span>
            <div className="progreso">
              <div className="progreso-actual"></div>
            </div>
            <span>4:15</span>
          </div>
        </div>

        <div className="volumen">
          <SoundOutlined />
          <div className="barra-volumen"></div>
        </div>
      </div>
    </>
  );
}

export default Reproductor;
