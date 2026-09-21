import React from 'react';
import "./admin.css"
import GestionUsuarios from '../../components/GestionUsuarios/GestionUsuarios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Reproductor from '../../components/Reproductor/Reproductor';

const Admin: React.FC = () => {
  return (
    <>
    <main className="contenedorAdmin">
      <h1 className="tituloAdmin">Panel de Administración</h1>
      <Sidebar/>
      <Reproductor/>
      <GestionUsuarios />
    </main>
    </>
  );
};

export default Admin;