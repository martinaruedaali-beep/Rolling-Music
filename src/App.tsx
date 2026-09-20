import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Playlist from './components/Playlist'
import Reproductor from './components/Reproductor/Reproductor'
import Error404 from './pages/error404/error404'
import './App.css'
import Admin from './pages/admin/admin'
import Registro from './components/Registro/Registro'
import Login from './components/login/login'
import Header from './components/Header/Header'

function App() {
  return (
    <Routes>
      <Route
        path="/"
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
    </Routes>
  )
}

export default App;
