import React from "react";
import { type Usuario } from "../../types/usuario";
import { useState } from "react";
import { DeleteOutlined} from "@ant-design/icons";
import{ Modal } from "antd";
import "../GestionUsuarios/GestionUsuarios.css"

const datosIniciales: Usuario[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan@mail.com",
    password: "contraseña123",
    rol: "Usuario",
  },
  {
    id: 2,
    nombre: "María",
    apellido: "Gómez",
    email: "maria@mail.com",
    password: "contraseña456",
    rol: "Usuario",
  },
  {
    id: 3,
    nombre: "Admin",
    apellido: "Rock",
    email: "admin@rock.com",
    password: "admincontraseña",
    rol: "Admin",
  },
];

const GestionUsuarios: React.FC = () => {

  const [usuario, setUsuario] = useState<Usuario[]>(datosIniciales);
  const eliminarUsuario = (id:number): void => {
    Modal.confirm({
    title: '¿Seguro que deseas eliminar este usuario?',
    content: 'Esta acción no se podrá deshacer.',
    okText: 'Sí, eliminar',
    okType: 'danger',
    cancelText: 'Cancelar',
    onOk() {
      setUsuario((prev) => prev.filter((user) => user.id !== id));
    },
  });

  }

  return (
    <>
      <section className="ComponenteGestionDeUsuarios">
        <h2 className="TituloUsuarios">Usuarios Registrados</h2>
        <table className="TabladeUsuarios">
          <thead>
            <tr className="EncabezadosTabla">
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map((usuario)=> (
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol ?? 'Usuario'}</td>
                    <td>
                        <button 
                        type="button"
                        className="eliminarUsuario"
                        onClick={() => eliminarUsuario(usuario.id)}>
                        <DeleteOutlined />
                        </button>
                    </td>
                </tr>
            ))}


          </tbody>
        </table>
      </section>
    </>
  );
};
export default GestionUsuarios;
