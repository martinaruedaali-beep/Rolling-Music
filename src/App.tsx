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
import Playlist from "./components/Playlist";
import Reproductor from "./components/Reproductor/Reproductor";
import DetallePlaylist from "./components/DetallePlaylist/DetallePlaylist";
import NuevosLanzamientos from './components/NuevosLanzamientos/NuevosLanzamientos'
import RutaAdmin from "./components/RutaAdmin/RutaAdmin";
import { AlbumDetalle } from "./components/AlbumDetalle/AlbumDetalle";
import CrudMusic from "./components/CrudMusic/CrudMusic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route
        path="/home"
        element={
          <>
            <Header />
            <Sidebar />
            <Playlist />
            <Reproductor />
          </>
        }
      />
      <Route path="*" element={<Error404 />} />
      <Route path="/admin" element={<RutaAdmin><Admin /></RutaAdmin>} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/recuperar-password"
        element={<RecuperarPassword />}
      />
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
      <Route
        path="/playlist"
        element={
          <RutaAdmin>
            <Header />
            <Sidebar />
            <AlbumDetalle />
            <Reproductor />
          </RutaAdmin>
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
      <Route
        path="/admin/musica"
        element={
          <RutaAdmin>
            <>
              <Header />
              <Sidebar />
              <main className="contenedorAdmin">
                <h1 className="tituloAdmin">Gestión Musical</h1>
                <CrudMusic />
              </main>
              <Reproductor />
            </>
          </RutaAdmin>
        }
      />
      <Route
        path="/crud-music"
        element={
          <RutaAdmin>
            <>
              <Header />
              <Sidebar />
              <main className="contenedorAdmin">
                <h1 className="tituloAdmin">Gestión Musical</h1>
                <CrudMusic />
              </main>
              <Reproductor />
            </>
          </RutaAdmin>
        }
      />
    </Routes>
  );
}

export default App;