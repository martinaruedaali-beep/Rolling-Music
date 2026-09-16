import "./Reproductor.css"
import {
  StepBackwardOutlined,
  CaretRightFilled,
  StepForwardOutlined,
  SoundOutlined,
} from "@ant-design/icons"

function Reproductor() {
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