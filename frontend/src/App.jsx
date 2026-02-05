import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api/proveedores';

function App() {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({ nombre: '', telefono: '', ciudad: '', tipo: '' });
  const [editando, setEditando] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [totalCiudades, setTotalCiudades] = useState({});

  useEffect(() => {
    cargarProveedores();
    cargarTotalCiudades();
  }, [filtroTipo]);

  const cargarProveedores = async () => {
    const url = filtroTipo ? `${API_URL}?tipo=${filtroTipo}` : API_URL;
    const res = await axios.get(url);
    setProveedores(res.data);
  };

  const cargarTotalCiudades = async () => {
    const res = await axios.get(`${API_URL}/total-ciudades`);
    setTotalCiudades(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`${API_URL}/${editando}`, form);
        setEditando(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ nombre: '', telefono: '', ciudad: '', tipo: '' });
      cargarProveedores();
      cargarTotalCiudades();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Error al procesar la solicitud');
      }
    }
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    // Solo permite números y guiones
    if (value === '' || /^[0-9-]+$/.test(value)) {
      setForm({...form, telefono: value});
    }
  };

  const handleCiudadChange = (e) => {
    const value = e.target.value;
    // Solo permite letras y espacios
    if (value === '' || /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      setForm({...form, ciudad: value});
    }
  };

  const editar = (proveedor) => {
    setForm(proveedor);
    setEditando(proveedor.id);
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este proveedor?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        cargarProveedores();
        cargarTotalCiudades();
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('Error al eliminar el proveedor');
        }
      }
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Gestión de Proveedores</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({...form, nombre: e.target.value})}
          required
        />
        <input
          placeholder="Teléfono (solo números)"
          value={form.telefono}
          onChange={handleTelefonoChange}
          required
          title="Solo se permiten números y guiones"
        />
        <input
          placeholder="Ciudad (solo letras)"
          value={form.ciudad}
          onChange={handleCiudadChange}
          required
          title="Solo se permiten letras y espacios"
        />
        <select
          value={form.tipo}
          onChange={(e) => setForm({...form, tipo: e.target.value})}
          required
        >
          <option value="">Seleccione tipo</option>
          <option value="Mayorista">Mayorista</option>
          <option value="Minorista">Minorista</option>
          <option value="Distribuidor">Distribuidor</option>
        </select>
        <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
      </form>

      <div className="filtros">
        <label>Filtrar por tipo: </label>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos</option>
          <option value="Mayorista">Mayorista</option>
          <option value="Minorista">Minorista</option>
          <option value="Distribuidor">Distribuidor</option>
        </select>
      </div>

      <div className="estadisticas">
        <h3>Proveedores por Ciudad:</h3>
        {Object.entries(totalCiudades).map(([ciudad, conteo]) => (
          <div key={ciudad}>
            <strong>{ciudad}:</strong> {conteo} proveedores
          </div>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.telefono}</td>
              <td>{p.ciudad}</td>
              <td>{p.tipo}</td>
              <td>
                <button onClick={() => editar(p)}>Editar</button>
                <button onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;