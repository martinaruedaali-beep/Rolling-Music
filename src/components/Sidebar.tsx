import { Home, Library, Heart, Users, Music } from 'lucide-react'
import logo from '../assets/icon rolling rock.png'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <a href='#' className="sidebar-header">
        <img className="logo-image" src={logo} alt="Rolling Music" />
      </a>
      <nav className="sidebar-nav">
        <a href="#inicio" className="nav-item">
          <Home size={22} className="nav-icon" />
          <span>Inicio</span>
        </a>
        <a href="#biblioteca" className="nav-item">
          <Library size={22} className="nav-icon" />
          <span>Tu biblioteca</span>
        </a>
        <a href="#favoritos" className="nav-item">
          <Heart size={22} className="nav-icon" />
          <span>Favoritos</span>
        </a>
        <a href="#artistas" className="nav-item">
          <Users size={22} className="nav-icon" />
          <span>Artistas</span>
        </a>
        <a href="#generos" className="nav-item">
          <Music size={22} className="nav-icon" />
          <span>Géneros</span>
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar