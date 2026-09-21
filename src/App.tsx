import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/inicio";
import Error404 from "./pages/error404/error404";
import "./App.css";
import Admin from "./pages/admin/admin";
import Registro from "./components/Registro/Registro";
import Login from "./components/login/login";
import RecuperarPassword from "./components/RecuperarPassword/RecuperarPassword";
import Header from "./components/Header/Header";
import PlaylistsDestacadas from "./components/PlaylistsDestacadas/PlaylistsDestacadas";
import Sidebar from "./components/Sidebar/Sidebar";
import { AlbunDetalle } from "./components/AlbunDetalle";
import Reproductor from "./components/Reproductor/Reproductor";
import DetallePlaylist from "./components/DetallePlaylist/DetallePlaylist";
import NuevosLanzamientos from './components/NuevosLanzamientos/NuevosLanzamientos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/recuperar-password" element={<RecuperarPassword />} />
      
      <Route
        path="/favoritos"
        element={
          <>
            <Header />
            <Sidebar />
            <PlaylistsDestacadas />
            <Reproductor />
          </>
        }
      />
      
      {/* AQUÍ ESTÁ EL CAMBIO: Al hacer clic en "Mi Playlist" se cargará tu componente */}
      <Route
        path="/playlist"
        element={
          <>
            <Header />
            <Sidebar />
            <AlbunDetalle />
            <Reproductor />
          </>
        }
      />

      <Route
        path="/playlist/:id"
        element={
          <>
            <Header />
            <Sidebar />
            <DetallePlaylist />
            <Reproductor />
          </>
        }
      />
      <Route
  path="/lanzamientos"
  element={
    <>
      <Header />
      <Sidebar />
      <NuevosLanzamientos />
      <Reproductor />
    </>
  }
/>
    </Routes>
  );
}

export default App;