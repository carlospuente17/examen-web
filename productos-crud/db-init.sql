-- Script SQL para inicializar la base de datos de Proveedores

-- Crear tabla (si se usa PostgreSQL en producción)
CREATE TABLE IF NOT EXISTS proveedor (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO proveedor (nombre, telefono, ciudad, tipo) VALUES
('Distribuidora Central S.A.', '02-2345678', 'Quito', 'Mayorista'),
('Comercial Andina', '07-2834567', 'Cuenca', 'Mayorista'),
('Proveedor del Norte', '06-2945678', 'Ibarra', 'Distribuidor'),
('Suministros del Sur', '07-2756789', 'Loja', 'Minorista'),
('Importadora XYZ', '04-2567890', 'Guayaquil', 'Mayorista'),
('Comercial Pacífico', '04-2678901', 'Guayaquil', 'Distribuidor'),
('Proveedor Costa', '05-2789012', 'Manta', 'Minorista'),
('Distribuidora Sierra', '02-2890123', 'Quito', 'Distribuidor'),
('Suministros Azuay', '07-2901234', 'Cuenca', 'Mayorista'),
('Comercial Imbabura', '06-3012345', 'Ibarra', 'Minorista');

-- Consultas útiles

-- Ver todos los proveedores
SELECT * FROM proveedor;

-- Filtrar por tipo
SELECT * FROM proveedor WHERE tipo = 'Mayorista';

-- Contar proveedores por ciudad
SELECT ciudad, COUNT(*) as total 
FROM proveedor 
GROUP BY ciudad 
ORDER BY total DESC;

-- Contar proveedores por tipo
SELECT tipo, COUNT(*) as total 
FROM proveedor 
GROUP BY tipo 
ORDER BY total DESC;

-- Buscar proveedores por ciudad
SELECT * FROM proveedor WHERE ciudad = 'Cuenca';

-- Buscar proveedores por nombre (búsqueda parcial)
SELECT * FROM proveedor WHERE nombre LIKE '%Comercial%';
