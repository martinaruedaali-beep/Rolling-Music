import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/inicio/inicio'
import Error404 from './pages/error404/error404'
import './App.css'
import Admin from './pages/admin/admin'
import Registro from './components/Registro/Registro'
import Login from './components/login/login'
import RecuperarPassword from './components/RecuperarPassword/RecuperarPassword'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route path="*" element={<Error404 />} />

      <Route path="/admin" element={<Admin />} />

      <Route path="/registro" element={<Registro />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/recuperar-password"
        element={<RecuperarPassword />}
      />
    </Routes>
  )
}

export default App