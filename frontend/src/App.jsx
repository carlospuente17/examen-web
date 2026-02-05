import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api/productos';

function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '' });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get(API_URL);
    setProductos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editando) {
      await axios.put(`${API_URL}/${editando}`, form);
      setEditando(null);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
    cargarProductos();
  };

  const editar = (producto) => {
    setForm(producto);
    setEditando(producto.id);
  };

  const eliminar = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    cargarProductos();
  };

  return (
    <div className="container">
      <h1>CRUD de Productos</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({...form, nombre: e.target.value})}
          required
        />
        <input
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({...form, descripcion: e.target.value})}
        />
        <input
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({...form, precio: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({...form, stock: e.target.value})}
          required
        />
        <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
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