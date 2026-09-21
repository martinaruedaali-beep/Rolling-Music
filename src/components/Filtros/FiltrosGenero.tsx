import React from 'react';
import { Boton } from '../Boton/Boton'; 

interface FiltrosGeneroProps {
  generos: string[];
  generoActivo: string;
  alSeleccionar: (genero: string) => void;
}

export const FiltrosGenero: React.FC<FiltrosGeneroProps> = ({ generos, generoActivo, alSeleccionar }) => {
  return (
    <div className="filtros-container">
      {generos.map((genero) => (
        <Boton
          key={genero}
          variante={generoActivo === genero ? 'primario' : 'contorno'}
          onClick={() => alSeleccionar(genero)}
        >
          {genero}
        </Boton>
      ))}
    </div>
  );
};