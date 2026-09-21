import { Routes, Route } from 'react-router-dom';
import { AlbunDetalle as DetalleAlbum } from './components/AlbunDetalle';
import Admin from './pages/admin/admin';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DetalleAlbum />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;