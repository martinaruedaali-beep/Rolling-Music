import { Routes, Route } from 'react-router-dom'
import Error404 from './pages/error404/error404'

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Inicio</div>} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}

export default App