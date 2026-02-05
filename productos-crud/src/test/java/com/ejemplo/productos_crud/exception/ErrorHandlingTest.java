package com.ejemplo.productos_crud.exception;

import com.ejemplo.productos_crud.controller.ProveedorController;
import com.ejemplo.productos_crud.model.Proveedor;
import com.ejemplo.productos_crud.repository.ProveedorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ErrorHandlingTest {

    @Autowired
    private ProveedorController controller;

    @Autowired
    private ProveedorRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testObtenerProveedorNoExistente_DeberiaLanzar404() {
        // Test para error 404 - Not Found
        assertThrows(ResourceNotFoundException.class, () -> {
            controller.obtener(999L);
        });
    }

    @Test
    public void testCrearProveedorSinNombre_DeberiaLanzar400() {
        // Test para error 400 - Bad Request
        Proveedor proveedor = new Proveedor();
        proveedor.setTelefono("123456789");
        proveedor.setCiudad("Cuenca");
        proveedor.setTipo("Mayorista");
        // Nombre está vacío

        assertThrows(IllegalArgumentException.class, () -> {
            controller.crear(proveedor);
        });
    }

    @Test
    public void testCrearProveedorSinTelefono_DeberiaLanzar400() {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Test Proveedor");
        proveedor.setCiudad("Cuenca");
        proveedor.setTipo("Mayorista");
        // Teléfono está vacío

        assertThrows(IllegalArgumentException.class, () -> {
            controller.crear(proveedor);
        });
    }

    @Test
    public void testActualizarProveedorNoExistente_DeberiaLanzar404() {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Test Proveedor");
        proveedor.setTelefono("123456789");
        proveedor.setCiudad("Cuenca");
        proveedor.setTipo("Mayorista");

        assertThrows(ResourceNotFoundException.class, () -> {
            controller.actualizar(999L, proveedor);
        });
    }

    @Test
    public void testEliminarProveedorNoExistente_DeberiaLanzar404() {
        assertThrows(ResourceNotFoundException.class, () -> {
            controller.eliminar(999L);
        });
    }

    @Test
    public void testCrearYObtenerProveedorExitosamente() {
        // Test de caso exitoso
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Test Proveedor");
        proveedor.setTelefono("123456789");
        proveedor.setCiudad("Cuenca");
        proveedor.setTipo("Mayorista");

        Proveedor creado = controller.crear(proveedor);
        assertNotNull(creado.getId());

        Proveedor obtenido = controller.obtener(creado.getId());
        assertEquals("Test Proveedor", obtenido.getNombre());
    }
}
