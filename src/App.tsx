import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/inicio";
import Error404 from "./pages/error404/error404";
import "./App.css";
import Admin from "./pages/admin/admin";
import Registro from "./components/Registro/Registro";
import Login from "./components/login/login";
import Header from "./components/Header/Header";
import PlaylistsDestacadas from "./components/PlaylistsDestacadas/PlaylistsDestacadas";
import Sidebar from "./components/Sidebar/Sidebar";
import Playlist from "./components/Playlist";
import Reproductor from "./components/Reproductor/Reproductor";

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
      <Route path="/admin" element={<Admin />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
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
    </Routes>
  );
}

export default App;
