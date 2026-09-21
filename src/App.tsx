import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlbunDetalle as DetalleAlbum } from './components/AlbunDetalle';
import Admin from './pages/admin/admin'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<DetalleAlbum />} />
        
        
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;