import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Playlist from './components/Playlist'
import Reproductor from './components/Reproductor/Reproductor'
import Error404 from './pages/error404/error404'
import './App.css'
import Admin from './pages/admin/admin'

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
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  )
}

export default App;
