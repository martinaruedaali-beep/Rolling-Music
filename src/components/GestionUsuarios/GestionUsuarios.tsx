import React from "react";
import { type Usuario } from "../../types/usuario";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Input, Select, Form } from "antd";
import {
  obtenerUsuarios,
  guardarUsuarios,
  actualizarUsuarios,
} from "../../services/usuarioservice";
import "../GestionUsuarios/GestionUsuarios.css";

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>(obtenerUsuarios());

  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");

  const editarUsuario = (usuario: Usuario): void => {
    setUsuarioEditando(usuario);
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setEmail(usuario.email);
    setRol(usuario.rol ?? "");
  };

  const guardarCambios = (): void => {
    if (!usuarioEditando) return;

    const usuarioActualizado: Usuario = {
      ...usuarioEditando,
      nombre,
      apellido,
      email,
      rol: rol as "Admin" | "Usuario",
    };

    actualizarUsuarios(usuarioActualizado);
    const listaActualizada = usuarios.map((u) =>
      u.id === usuarioEditando.id ? usuarioActualizado : u,
    );

    setUsuarios(listaActualizada);
    guardarUsuarios(listaActualizada);
    setUsuarioEditando(null);
  };

  const eliminarUsuario = (id: number): void => {
    Modal.confirm({
      title: "¿Seguro que deseas eliminar este usuario?",
      content: "Esta acción no se podrá deshacer.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        const usuariosActualizados = usuarios.filter((user) => user.id !== id);

        setUsuarios(usuariosActualizados);
        guardarUsuarios(usuariosActualizados);
      },
    });
  };

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
            {usuarios.map((usuarios) => (
              <tr key={usuarios.id}>
                <td>{usuarios.id}</td>
                <td>{`${usuarios.nombre} ${usuarios.apellido}`}</td>
                <td>{usuarios.email}</td>
                <td>{usuarios.rol ?? "Usuario"}</td>
                <td>
                  <button
                    type="button"
                    className="editarUsuario"
                    onClick={() => editarUsuario(usuarios)}
                  >
                    <EditOutlined />
                  </button>

                  <button
                    type="button"
                    className="eliminarUsuario"
                    onClick={() => eliminarUsuario(usuarios.id)}
                  >
                    <DeleteOutlined />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          title="Editar Usuario"
          open={usuarioEditando !== null}
          onOk={guardarCambios}
          onCancel={() => setUsuarioEditando(null)}
          okText="Guardar cambios"
          cancelText="Cancelar"
        >
          <Form layout="vertical">
            <Form.Item label="Nombre">
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan"
              />
            </Form.Item>

            <Form.Item label="Apellido">
              <Input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ej. Pérez"
              />
            </Form.Item>

            <Form.Item label="Correo electrónico">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </Form.Item>

            <Form.Item label="Rol de usuario">
              <Select
                value={rol}
                onChange={(value) => setRol(value)}
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "Usuario", label: "Usuario" },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </>
  );
};
export default GestionUsuarios;
