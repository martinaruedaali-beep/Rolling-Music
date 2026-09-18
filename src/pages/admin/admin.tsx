import React from 'react';
import GestionUsuarios from '../../components/GestionUsuarios/GestionUsuarios';

const Admin: React.FC = () => {
  return (
    <>
    <main className="contenedorAdmin">
      <h1>Panel de Administración</h1>
      <GestionUsuarios />
    </main>
    </>
  );
};

export default Admin;