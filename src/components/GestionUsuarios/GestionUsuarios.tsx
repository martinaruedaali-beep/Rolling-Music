import type React from "react";
import { type Usuario } from "../../types/usuario";
import { useState } from "react";

const GestionUsuarios: React.FC = () => {
  const [usuario, setUsuarios] = useState<Usuario[]>([]);

  return (
    <>
      <section className="ComponenteGestionDeUsuarios">
        <h2 className="TituloUsuarios">Usuarios Registrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </section>
    </>
  );
};
export default GestionUsuarios;
