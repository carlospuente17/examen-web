package com.ejemplo.productos_crud.repository;

import com.ejemplo.productos_crud.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    // Filtro por tipo
    List<Proveedor> findByTipo(String tipo);
    
    // Conteo de proveedores por ciudad
    @Query("SELECT p.ciudad, COUNT(p) FROM Proveedor p GROUP BY p.ciudad")
    List<Object[]> countByCiudad();
}