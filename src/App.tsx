import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/inicio/inicio'
import Error404 from './pages/error404/error404'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default App