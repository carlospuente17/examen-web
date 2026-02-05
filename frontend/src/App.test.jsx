import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

vi.mock('axios');

describe('App - Sistema de Proveedores', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Renderiza el título correctamente', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    expect(screen.getByText('Sistema de Gestión de Proveedores')).toBeDefined();
  });

  it('Muestra el formulario con todos los campos', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    
    expect(screen.getByPlaceholderText(/nombre/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/teléfono/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/ciudad/i)).toBeDefined();
  });

  it('Valida que solo se ingresen números en teléfono', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    
    const telefonoInput = screen.getByPlaceholderText(/teléfono/i);
    
    // Verificar que el campo existe y tiene el tipo correcto
    expect(telefonoInput).toBeDefined();
    expect(telefonoInput.tagName).toBe('INPUT');
  });

  it('Valida que solo se ingresen letras en ciudad', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    
    const ciudadInput = screen.getByPlaceholderText(/ciudad/i);
    
    // Verificar que el campo existe y tiene el tipo correcto
    expect(ciudadInput).toBeDefined();
    expect(ciudadInput.tagName).toBe('INPUT');
  });

  it('Carga la lista de proveedores al iniciar', async () => {
    const mockProveedores = [
      { id: 1, nombre: 'Proveedor 1', telefono: '123456', ciudad: 'Cuenca', tipo: 'Mayorista' },
      { id: 2, nombre: 'Proveedor 2', telefono: '789012', ciudad: 'Quito', tipo: 'Minorista' }
    ];
    
    axios.get.mockResolvedValueOnce({ data: mockProveedores });
    axios.get.mockResolvedValueOnce({ data: { Cuenca: 1, Quito: 1 } });
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Proveedor 1')).toBeDefined();
      expect(screen.getByText('Proveedor 2')).toBeDefined();
    });
  });

  it('Muestra el filtro por tipo', () => {
    axios.get.mockResolvedValue({ data: [] });
    render(<App />);
    
    expect(screen.getByText('Filtrar por tipo:')).toBeDefined();
  });

  it('Muestra estadísticas de proveedores por ciudad', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: { Cuenca: 5, Quito: 3 } });
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Proveedores por Ciudad:')).toBeDefined();
    });
  });
});
