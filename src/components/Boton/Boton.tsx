import React from 'react';

interface BotonProps {
  variante?: 'primario' | 'contorno';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Boton: React.FC<BotonProps> = ({ variante = 'primario', children, onClick }) => {
  const claseVariante = variante === 'primario' ? 'btn-primario' : 'btn-contorno';

  return (
    <button className={`btn-base ${claseVariante}`} onClick={onClick}>
      {children}
    </button>
  );
};