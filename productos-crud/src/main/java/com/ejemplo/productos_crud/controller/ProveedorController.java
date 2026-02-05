package com.ejemplo.productos_crud.controller;

import com.ejemplo.productos_crud.exception.ResourceNotFoundException;
import com.ejemplo.productos_crud.model.Proveedor;
import com.ejemplo.productos_crud.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "http://localhost:5173")
public class ProveedorController {
    @Autowired
    private ProveedorRepository repository;

    @GetMapping
    public List<Proveedor> listar(@RequestParam(required = false) String tipo) {
        if (tipo != null && !tipo.isEmpty()) {
            return repository.findByTipo(tipo);
        }
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Proveedor obtener(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con ID: " + id));
    }

    @PostMapping
    public Proveedor crear(@RequestBody Proveedor proveedor) {
        if (proveedor.getNombre() == null || proveedor.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del proveedor es obligatorio");
        }
        if (proveedor.getTelefono() == null || proveedor.getTelefono().trim().isEmpty()) {
            throw new IllegalArgumentException("El teléfono del proveedor es obligatorio");
        }
        if (proveedor.getCiudad() == null || proveedor.getCiudad().trim().isEmpty()) {
            throw new IllegalArgumentException("La ciudad del proveedor es obligatoria");
        }
        if (proveedor.getTipo() == null || proveedor.getTipo().trim().isEmpty()) {
            throw new IllegalArgumentException("El tipo del proveedor es obligatorio");
        }
        return repository.save(proveedor);
    }

    @PutMapping("/{id}")
    public Proveedor actualizar(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Proveedor no encontrado con ID: " + id);
        }
        if (proveedor.getNombre() == null || proveedor.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del proveedor es obligatorio");
        }
        proveedor.setId(id);
        return repository.save(proveedor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Proveedor no encontrado con ID: " + id);
        }
        repository.deleteById(id);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Proveedor eliminado exitosamente");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/total-ciudades")
    public Map<String, Long> contarPorCiudad() {
        List<Object[]> resultados = repository.countByCiudad();
        Map<String, Long> ciudadConteo = new HashMap<>();
        for (Object[] resultado : resultados) {
            String ciudad = (String) resultado[0];
            Long conteo = (Long) resultado[1];
            ciudadConteo.put(ciudad, conteo);
        }
        return ciudadConteo;
    }
}
