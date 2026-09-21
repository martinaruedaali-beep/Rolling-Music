import { Home, Library, Heart, Users, Music, Crown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/icon rolling rock.png";
import "./Sidebar.css";
import { useState } from "react";

function Sidebar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button
        className="boton-hamburguesa"
        onClick={() => setAbierto(!abierto)}
      >
        <Menu />
      </button>
      <aside className={abierto ? "sidebar abierto" : "sidebar"}>
        <a href="#" className="sidebar-header">
          <img className="logo-image" src={logo} alt="Rolling Music" />
        </a>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-item">
            <Home size={22} className="nav-icon" />
            <span>Inicio</span>
          </Link>
          {/* AQUÍ ESTÁ EL CAMBIO: Ahora apunta directo a tu ruta */}
          <Link to="/playlist" className="nav-item">
            <Library size={22} className="nav-icon" />
            <span>Mi Playlist</span>
          </Link>
          <Link to="/favoritos" className="nav-item">
            <Heart size={22} className="nav-icon" />
            <span>Favoritos</span>
          </Link>
          <Link to="/error404" className="nav-item">
            <Users size={22} className="nav-icon" />
            <span>Artistas</span>
          </Link>
          <Link to="/error404" className="nav-item">
            <Music size={22} className="nav-icon" />
            <span>Géneros</span>
          </Link>
          <Link to="/admin/musica" className="nav-item">
            <Music size={22} className="nav-icon" />
            <span>CRUD Música</span>
          </Link>
        </nav>
        <Link to="/error404" className="premium">
          <Crown size={22} className="iconPremium" />
          <p className="titlePremium">Contrata Premium</p>
        </Link>
      </aside>
    </>
  );
}

export default Sidebar;