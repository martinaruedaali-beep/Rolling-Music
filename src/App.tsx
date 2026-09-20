<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Playlist from './components/Playlist'
import Reproductor from './components/Reproductor/Reproductor'
import Error404 from './pages/error404/error404'
import './App.css'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Sidebar />
            <Playlist />
            <Reproductor />
          </>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
=======
import { AlbunDetalle as DetalleAlbum } from './components/AlbunDetalle';
import './App.css';

function App() {
  return (
    <>
      <DetalleAlbum />
    </>
  );
>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
}

export default App;