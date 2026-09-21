import React, { useState, useEffect, useMemo } from "react";
import { Modal, Input, Select, Form, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { FaMusic, FaTrash, FaUndo, FaSearch } from "react-icons/fa";
import type { Cancion } from "../../tipos/cancion";
import {
  obtenerCanciones,
  guardarCanciones,
  eliminarCancion as eliminarCancionService,
  CLAVE,
} from "../../services/musicaService";
import "./CrudMusic.css";

const generosDisponibles = ["Rock", "Hard Rock", "Metal", "Punk", "Pop", "Indie", "Otro"];

const CrudMusic: React.FC = () => {
  const [canciones, setCanciones] = useState<Cancion[]>(() => obtenerCanciones());
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroGenero, setFiltroGenero] = useState<string>("Todos");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cancionEditando, setCancionEditando] = useState<Cancion | null>(null);

  // Form fields
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [album, setAlbum] = useState("");
  const [duracion, setDuracion] = useState("");
  const [genero, setGenero] = useState<string>("Rock");
  const [file, setFile] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  // Recarga automática: si LS se vacía externamente (otra pestaña) o queda en []
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CLAVE && (!e.newValue || e.newValue === "[]")) {
        const recargadas = obtenerCanciones();
        setCanciones(recargadas);
        messageApi.info("Catálogo recargado automáticamente");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [messageApi]);

  // También vigilar foco: si usuario borró LS manualmente en la misma pestaña y vuelve
  useEffect(() => {
    const handleFocus = () => {
      const raw = localStorage.getItem(CLAVE);
      if (!raw || raw === "[]") {
        // solo recargar si actualmente no tenemos canciones visibles
        // obtenerCanciones ya hace seed si está vacío
        const recargadas = obtenerCanciones();
        // evitar loop si ya están recargadas
        setCanciones((prev) => (prev.length === 0 || !raw ? recargadas : prev));
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Si por alguna razón el estado queda vacío pero LS fue vaciado, auto-reparar
  useEffect(() => {
    if (canciones.length === 0) {
      const raw = localStorage.getItem(CLAVE);
      if (!raw || raw === "[]") {
        const recargadas = obtenerCanciones();
        if (recargadas.length > 0) {
          setCanciones(recargadas);
          messageApi.success(`Catálogo restaurado con ${recargadas.length} canciones`);
        }
      }
    }
  }, [canciones.length, messageApi]);

  const resetForm = () => {
    setTitulo("");
    setArtista("");
    setAlbum("");
    setDuracion("");
    setGenero("Rock");
    setFile("");
    setCancionEditando(null);
  };

  const abrirCrear = () => {
    resetForm();
    setModalAbierto(true);
  };

  const abrirEditar = (cancion: Cancion) => {
    setCancionEditando(cancion);
    setTitulo(cancion.titulo);
    setArtista(cancion.artista);
    setAlbum(cancion.album);
    setDuracion(cancion.duracion);
    setGenero(cancion.genero || "Rock");
    setFile(cancion.file || "");
    setModalAbierto(true);
  };

  const validarDuracion = (val: string) => /^\d{1,2}:\d{2}$/.test(val.trim());

  const guardar = () => {
    if (!titulo.trim() || !artista.trim() || !album.trim() || !duracion.trim()) {
      messageApi.warning("Completa título, artista, álbum y duración");
      return;
    }
    if (!validarDuracion(duracion)) {
      messageApi.warning("Duración debe ser formato m:ss (ej: 3:45)");
      return;
    }

    if (cancionEditando) {
      const actualizada: Cancion = {
        ...cancionEditando,
        titulo: titulo.trim(),
        artista: artista.trim(),
        album: album.trim(),
        duracion: duracion.trim(),
        genero,
        file: file.trim() || undefined,
      };
      const nuevas = canciones.map((c) =>
        String(c.id) === String(cancionEditando.id) ? actualizada : c
      );
      setCanciones(nuevas);
      guardarCanciones(nuevas);
      messageApi.success("Canción actualizada");
    } else {
      const nueva: Cancion = {
        id: `song-${Date.now()}`,
        titulo: titulo.trim(),
        artista: artista.trim(),
        album: album.trim(),
        duracion: duracion.trim(),
        genero,
        file: file.trim() || undefined,
      };
      const nuevas = [...canciones, nueva];
      setCanciones(nuevas);
      guardarCanciones(nuevas);
      messageApi.success("Canción agregada");
    }
    setModalAbierto(false);
    resetForm();
  };

  const handleEliminar = (id: string | number) => {
    Modal.confirm({
      title: "¿Eliminar esta canción?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        const resultado = eliminarCancionService(id);
        setCanciones(resultado);
        // Si se recargó automáticamente, resultado será el seed completo
        const rawAfter = localStorage.getItem(CLAVE);
        // Si el servicio hizo seed, resultado.length === seed length (> filtradas)
        // Detectamos recarga si resultado.length > canciones.length -1 y filtradas era 0
        // Más simple: si habíamos borrado la última y ahora hay canciones, avisar
        if (resultado.length > 0 && canciones.length === 1) {
          messageApi.success(`¡Catálogo recargado automáticamente! ${resultado.length} canciones restauradas`);
        } else {
          messageApi.success("Canción eliminada");
        }
        // Necesitamos evitar warning de rawAfter no usado
        void rawAfter;
      },
    });
  };

  const handleVaciarTodo = () => {
    if (canciones.length === 0) return;
    Modal.confirm({
      title: `¿Vaciar catálogo? Se eliminarán ${canciones.length} canciones`,
      content: "Al quedar vacío, el catálogo se recargará automáticamente desde el seed.",
      okText: "Sí, vaciar todo",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        localStorage.removeItem(CLAVE);
        const recargadas = obtenerCanciones();
        setCanciones(recargadas);
        messageApi.success(`Catálogo vaciado y recargado con ${recargadas.length} canciones`);
      },
    });
  };

  const handleRestaurar = () => {
    localStorage.removeItem(CLAVE);
    const recargadas = obtenerCanciones();
    setCanciones(recargadas);
    messageApi.success(`Catálogo restaurado (${recargadas.length} canciones)`);
  };

  const cancionesFiltradas = useMemo(() => {
    return canciones.filter((c) => {
      const matchTexto =
        !filtroTexto.trim() ||
        c.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        c.artista.toLowerCase().includes(filtroTexto.toLowerCase()) ||
        c.album.toLowerCase().includes(filtroTexto.toLowerCase());
      const matchGenero = filtroGenero === "Todos" || c.genero === filtroGenero;
      return matchTexto && matchGenero;
    });
  }, [canciones, filtroTexto, filtroGenero]);

  return (
    <>
      {contextHolder}
      <section className="crud-music-container">
        <div className="crud-music-header">
          <h2 className="crud-music-title">
            <FaMusic className="crud-music-title-icon" /> Gestión Musical
          </h2>
          <span className="crud-music-count">{canciones.length} canciones</span>
        </div>

        <div className="crud-music-toolbar">
          <div className="crud-music-filtros">
            <Input
              placeholder="Buscar por título, artista o álbum..."
              prefix={<FaSearch style={{ color: "#666" }} />}
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
              allowClear
              className="crud-music-search"
            />
            <Select
              value={filtroGenero}
              onChange={setFiltroGenero}
              className="crud-music-select-genero"
              options={[
                { value: "Todos", label: "Todos los géneros" },
                ...generosDisponibles.map((g) => ({ value: g, label: g })),
              ]}
            />
          </div>

          <div className="crud-music-acciones-top">
            <button type="button" className="crud-music-btn crud-music-btn-primary" onClick={abrirCrear}>
              <PlusOutlined /> Agregar canción
            </button>
            <button type="button" className="crud-music-btn crud-music-btn-ghost" onClick={handleRestaurar} title="Recargar desde seed">
              <FaUndo /> Restaurar
            </button>
            <button
              type="button"
              className="crud-music-btn crud-music-btn-danger"
              onClick={handleVaciarTodo}
              disabled={canciones.length === 0}
              title="Vaciar todo (se recarga automáticamente)"
            >
              <FaTrash /> Vaciar
            </button>
          </div>
        </div>

        <div className="crud-music-info">
          Mostrando {cancionesFiltradas.length} de {canciones.length} canciones
          {filtroTexto || filtroGenero !== "Todos" ? " (filtradas)" : ""}
        </div>

        <div className="TablaContenedor crud-music-tabla-contenedor">
          <table className="TabladeUsuarios crud-music-tabla">
            <thead>
              <tr className="EncabezadosTabla">
                <th>Título</th>
                <th>Artista</th>
                <th>Álbum</th>
                <th>Duración</th>
                <th>Género</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cancionesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)" }}>
                    No hay canciones para mostrar.
                  </td>
                </tr>
              ) : (
                cancionesFiltradas.map((c) => (
                  <tr key={String(c.id)}>
                    <td data-label="Título">{c.titulo}</td>
                    <td data-label="Artista">{c.artista}</td>
                    <td data-label="Álbum">{c.album}</td>
                    <td data-label="Duración">{c.duracion}</td>
                    <td data-label="Género">{c.genero || "—"}</td>
                    <td data-label="Acciones">
                      <button
                        type="button"
                        className="editarUsuario"
                        onClick={() => abrirEditar(c)}
                        title="Editar"
                      >
                        <EditOutlined />
                      </button>
                      <button
                        type="button"
                        className="eliminarUsuario"
                        onClick={() => handleEliminar(c.id)}
                        title="Eliminar"
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Modal
          title={cancionEditando ? "Editar canción" : "Agregar canción"}
          open={modalAbierto}
          onOk={guardar}
          onCancel={() => {
            setModalAbierto(false);
            resetForm();
          }}
          okText={cancionEditando ? "Guardar cambios" : "Agregar"}
          cancelText="Cancelar"
          destroyOnClose
          className="crud-music-modal"
          rootClassName="crud-music-modal-root"
          okButtonProps={{ className: "crud-music-modal-ok" }}
          cancelButtonProps={{ className: "crud-music-modal-cancel" }}
        >
          <Form layout="vertical">
            <Form.Item label="Título" required>
              <Input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej. De Música Ligera"
                maxLength={80}
              />
            </Form.Item>
            <Form.Item label="Artista" required>
              <Input
                value={artista}
                onChange={(e) => setArtista(e.target.value)}
                placeholder="Ej. Soda Stereo"
                maxLength={80}
              />
            </Form.Item>
            <Form.Item label="Álbum" required>
              <Input
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Ej. Canción Animal"
                maxLength={80}
              />
            </Form.Item>
            <Form.Item label="Duración" required extra="Formato m:ss (ej: 3:45)">
              <Input
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                placeholder="3:45"
                maxLength={5}
              />
            </Form.Item>
            <Form.Item label="Género">
              <Select
                value={genero}
                onChange={(v) => setGenero(v)}
                options={generosDisponibles.map((g) => ({ value: g, label: g }))}
              />
            </Form.Item>
            <Form.Item label="URL Archivo (opcional)" extra="Ej: https://.../song.mp3">
              <Input
                value={file}
                onChange={(e) => setFile(e.target.value)}
                placeholder="https://..."
              />
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </>
  );
};

export default CrudMusic;
