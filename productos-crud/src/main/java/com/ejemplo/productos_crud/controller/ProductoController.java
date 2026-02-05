package com.ejemplo.productos_crud.controller;

import com.ejemplo.productos_crud.model.Producto;
import com.ejemplo.productos_crud.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {
      @Autowired
    private ProductoRepository repository;

    @GetMapping
    public List<Producto> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Producto obtener(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return repository.save(producto);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @RequestBody Producto producto) {
        producto.setId(id);
        return repository.save(producto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
