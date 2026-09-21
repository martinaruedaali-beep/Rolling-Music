import React from 'react';
import "./admin.css"
import GestionUsuarios from '../../components/GestionUsuarios/GestionUsuarios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Reproductor from '../../components/Reproductor/Reproductor';
import Header from '../../components/Header/Header';
import { AlbumDetalle } from '../../components/AlbumDetalle/AlbumDetalle';

const Admin: React.FC = () => {
  return (
    <>
    <Header />
    <main className="contenedorAdmin">
      <h1 className="tituloAdmin">Panel de Administración</h1>
      <Sidebar/>
      <Reproductor/>
      <GestionUsuarios />
      <AlbumDetalle />
    </main>
    </>
  );
};

export default Admin;