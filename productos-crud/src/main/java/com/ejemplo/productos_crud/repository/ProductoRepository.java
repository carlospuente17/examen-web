package com.ejemplo.productos_crud.repository;

import com.ejemplo.productos_crud.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}