package com.ejemplo.productos_crud.controller;

import com.ejemplo.productos_crud.model.Proveedor;
import com.ejemplo.productos_crud.repository.ProveedorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ProveedorControllerTest {

    @Autowired
    private ProveedorController controller;

    @Autowired
    private ProveedorRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testListarTodos() {
        // Crear proveedores de prueba
        Proveedor p1 = new Proveedor();
        p1.setNombre("Proveedor A");
        p1.setTelefono("123456789");
        p1.setCiudad("Cuenca");
        p1.setTipo("Mayorista");
        repository.save(p1);

        Proveedor p2 = new Proveedor();
        p2.setNombre("Proveedor B");
        p2.setTelefono("987654321");
        p2.setCiudad("Quito");
        p2.setTipo("Minorista");
        repository.save(p2);

        List<Proveedor> proveedores = controller.listar(null);

        assertNotNull(proveedores);
        assertEquals(2, proveedores.size());
    }

    @Test
    public void testListarPorTipo() {
        Proveedor p1 = new Proveedor();
        p1.setNombre("Proveedor A");
        p1.setTelefono("123456789");
        p1.setCiudad("Cuenca");
        p1.setTipo("Mayorista");
        repository.save(p1);

        Proveedor p2 = new Proveedor();
        p2.setNombre("Proveedor B");
        p2.setTelefono("987654321");
        p2.setCiudad("Quito");
        p2.setTipo("Minorista");
        repository.save(p2);

        List<Proveedor> proveedores = controller.listar("Mayorista");

        assertNotNull(proveedores);
        assertEquals(1, proveedores.size());
        assertEquals("Mayorista", proveedores.get(0).getTipo());
        assertEquals("Proveedor A", proveedores.get(0).getNombre());
    }

    @Test
    public void testObtenerPorId() {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Proveedor Test");
        proveedor.setTelefono("123456789");
        proveedor.setCiudad("Cuenca");
        proveedor.setTipo("Mayorista");
        proveedor = repository.save(proveedor);

        Proveedor resultado = controller.obtener(proveedor.getId());

        assertNotNull(resultado);
        assertEquals("Proveedor Test", resultado.getNombre());
        assertEquals("Cuenca", resultado.getCiudad());
    }

    @Test
    public void testCrear() {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Proveedor Nuevo");
        proveedor.setTelefono("555-1234");
        proveedor.setCiudad("Guayaquil");
        proveedor.setTipo("Distribuidor");

        Proveedor resultado = controller.crear(proveedor);

        assertNotNull(resultado);
        assertNotNull(resultado.getId());
        assertEquals("Proveedor Nuevo", resultado.getNombre());
        assertEquals("Guayaquil", resultado.getCiudad());
        assertEquals("Distribuidor", resultado.getTipo());
    }

    @Test
    public void testActualizar() {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Proveedor Original");
        proveedor.setTelefono("111-1111");
        proveedor.setCiudad("Loja");
        proveedor.setTipo("Minorista");
        proveedor = repository.save(proveedor);

        Long id = proveedor.getId();
        proveedor.setNombre("Proveedor Actualizado");
        proveedor.setTelefono("222-2222");

        Proveedor resultado = controller.actualizar(id, proveedor);

        assertNotNull(resultado);
        assertEquals(id, resultado.getId());
        assertEquals("Proveedor Actualizado", resultado.getNombre());
        assertEquals("222-2222", resultado.getTelefono());

        // Verificar que se actualizó en la base de datos
        Optional<Proveedor> verificacion = repository.findById(id);
        assertTrue(verificacion.isPresent());
        assertEquals("Proveedor Actualizado", verificacion.get().getNombre());
    }

    @Test
    public void testEliminar() {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre("Proveedor Para Eliminar");
        proveedor.setTelefono("999-9999");
        proveedor.setCiudad("Ibarra");
        proveedor.setTipo("Mayorista");
        proveedor = repository.save(proveedor);

        Long id = proveedor.getId();
        controller.eliminar(id);

        // Verificar que se eliminó
        assertFalse(repository.findById(id).isPresent());
    }

    @Test
    public void testContarPorCiudad() {
        // Crear proveedores en diferentes ciudades
        Proveedor p1 = new Proveedor();
        p1.setNombre("Proveedor 1");
        p1.setTelefono("111-1111");
        p1.setCiudad("Cuenca");
        p1.setTipo("Mayorista");
        repository.save(p1);

        Proveedor p2 = new Proveedor();
        p2.setNombre("Proveedor 2");
        p2.setTelefono("222-2222");
        p2.setCiudad("Cuenca");
        p2.setTipo("Minorista");
        repository.save(p2);

        Proveedor p3 = new Proveedor();
        p3.setNombre("Proveedor 3");
        p3.setTelefono("333-3333");
        p3.setCiudad("Quito");
        p3.setTipo("Distribuidor");
        repository.save(p3);

        Map<String, Long> resultado = controller.contarPorCiudad();

        assertNotNull(resultado);
        assertEquals(2L, resultado.get("Cuenca"));
        assertEquals(1L, resultado.get("Quito"));
    }

    @Test
    public void testContextLoads() {
        assertNotNull(controller);
        assertNotNull(repository);
    }
}
