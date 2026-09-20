import React from 'react';

interface BotonProps {
  variante?: 'primario' | 'contorno';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Boton: React.FC<BotonProps> = ({ variante = 'primario', children, onClick }) => {
<<<<<<< HEAD
  // Evaluamos la clase según la variante
=======

>>>>>>> e4c973d (carpetas ordenadas, con archivos y css en index)
  const claseVariante = variante === 'primario' ? 'btn-primario' : 'btn-contorno';

  return (
    <button className={`btn-base ${claseVariante}`} onClick={onClick}>
      {children}
    </button>
  );
};