import { useRef, useState } from "react";
import "./Reproductor.css"
import {
  StepBackwardOutlined,
  CaretRightFilled,
  StepForwardOutlined,
  SoundOutlined,
} from "@ant-design/icons";

function Reproductor() {

  const canciones = [
    {
      nombre: "Musica Para Pastillas",
      artista: "Patricio Rey y Sus redonditos de Ricota",
      audio:"/aseets/mp3/Patricio Rey y Sus Redonditos de Ricota - Música para Pastillas.mp3" ,
    },
    {
      nombre: "In Bloom",
      artista: "Nirvana",
      audio: "/aseets/mp3/Nirvana-In Bloom.mp3",
    },

  ];

  const [cancionActual, setCancionActual]= useState(0)

  const[reproduciendo, setReproduciendo]= useState(false)

  const audio = useRef<HTMLAudioElement>(null);

  
  return (
    <div className="reproductor">

      <div className="info-cancion">
        <div className="portada"></div>

        <div>
          <h4>Mariposa Tecknicolor</h4>
          <p>Fito Páez</p>
        </div>
      </div>

      <div className="controles">

        <div className="botones">
          <button><StepBackwardOutlined /></button>
          <button className="play"><CaretRightFilled /></button>
          <button><StepForwardOutlined /></button>
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
  );
}

export default Reproductor;