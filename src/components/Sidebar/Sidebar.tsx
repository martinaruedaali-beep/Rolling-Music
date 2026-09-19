import { Home, Library, Heart, Users, Music, Crown, Menu } from 'lucide-react'
import logo from "../../assets/icon rolling rock.png"
import './Sidebar.css'
import { useState } from 'react'


function Sidebar() {

const[ abierto, setAbierto]= useState (false)
  
return (
   <>
    <button
        className="boton-hamburguesa"
        onClick={() => setAbierto(!abierto)}
      >
     <Menu />
    </button>
    <aside className={abierto ? "sidebar abierto" : "sidebar"}>
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
      </nav>
      <a href='#' className='premium'>
        <Crown size={22} className='iconPremium'/>
        <p className='titlePremium'>Contrata Premium</p> 
        </a>
      
    </aside>
    </> 
  )
}

export default Sidebar