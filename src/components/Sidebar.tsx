import { Home, Library, Heart, Users, Music, Crown } from 'lucide-react'
import logo from '../assets/icon rolling rock.png'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <a href='#' className="sidebar-header">
        <img className="logo-image" src={logo} alt="Rolling Music" />
      </a>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item">
          <Home size={22} className="nav-icon" />
          <span>Inicio</span>
        </a>
        <a href="#" className="nav-item">
          <Library size={22} className="nav-icon" />
          <span>Mi Playlist</span>
        </a>
        <a href="#" className="nav-item">
          <Heart size={22} className="nav-icon" />
          <span>Favoritos</span>
        </a>
        <a href="#" className="nav-item">
          <Users size={22} className="nav-icon" />
          <span>Artistas</span>
        </a>
        <a href="#" className="nav-item">
          <Music size={22} className="nav-icon" />
          <span>Géneros</span>
        </a>

        <a href='#' className='premium'>
        <Crown size={22} className='iconPremium'/>
        <p className='titlePremium'>Contrata Premium</p> 
        </a>
      
      </nav>
    </aside>
  )
}

export default Sidebar