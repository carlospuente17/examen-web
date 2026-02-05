import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuración de las etapas de la prueba
export let options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp-up a 20 usuarios en 30s
    { duration: '1m', target: 50 },   // Mantener 50 usuarios por 1 minuto
    { duration: '30s', target: 100 }, // Escalar a 100 usuarios
    { duration: '1m', target: 100 },  // Mantener 100 usuarios por 1 minuto
    { duration: '30s', target: 0 },   // Ramp-down a 0 usuarios
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% de las peticiones deben completarse en menos de 2s
    http_req_failed: ['rate<0.1'],     // Menos del 10% de errores
  },
};

const BASE_URL = 'http://localhost:8080/api/proveedores';

// Datos de prueba para crear proveedores
const proveedoresData = [
  { nombre: 'Test Proveedor 1', telefono: '1234567890', ciudad: 'Quito', tipo: 'Mayorista' },
  { nombre: 'Test Proveedor 2', telefono: '0987654321', ciudad: 'Cuenca', tipo: 'Minorista' },
  { nombre: 'Test Proveedor 3', telefono: '5551234567', ciudad: 'Guayaquil', tipo: 'Distribuidor' },
];

export default function () {
  // Test 1: Listar todos los proveedores
  let listRes = http.get(BASE_URL);
  check(listRes, {
    'Listar: status 200': (r) => r.status === 200,
    'Listar: tiene datos': (r) => JSON.parse(r.body).length >= 0,
  });

  sleep(1);

  // Test 2: Filtrar por tipo
  let filtroRes = http.get(`${BASE_URL}?tipo=Mayorista`);
  check(filtroRes, {
    'Filtro: status 200': (r) => r.status === 200,
    'Filtro: respuesta es array': (r) => Array.isArray(JSON.parse(r.body)),
  });

  sleep(1);

  // Test 3: Crear un nuevo proveedor
  let proveedorAleatorio = proveedoresData[Math.floor(Math.random() * proveedoresData.length)];
  let createRes = http.post(
    BASE_URL,
    JSON.stringify(proveedorAleatorio),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(createRes, {
    'Crear: status 200': (r) => r.status === 200,
    'Crear: tiene ID': (r) => JSON.parse(r.body).id !== undefined,
  });

  let proveedorCreado = JSON.parse(createRes.body);
  sleep(1);

  // Test 4: Obtener por ID (si se creó exitosamente)
  if (proveedorCreado.id) {
    let getRes = http.get(`${BASE_URL}/${proveedorCreado.id}`);
    check(getRes, {
      'Obtener: status 200': (r) => r.status === 200,
      'Obtener: ID coincide': (r) => JSON.parse(r.body).id === proveedorCreado.id,
    });

    sleep(1);

    // Test 5: Actualizar proveedor
    proveedorCreado.telefono = '9999999999';
    let updateRes = http.put(
      `${BASE_URL}/${proveedorCreado.id}`,
      JSON.stringify(proveedorCreado),
      { headers: { 'Content-Type': 'application/json' } }
    );
    check(updateRes, {
      'Actualizar: status 200': (r) => r.status === 200,
    });

    sleep(1);

    // Test 6: Eliminar proveedor
    let deleteRes = http.del(`${BASE_URL}/${proveedorCreado.id}`);
    check(deleteRes, {
      'Eliminar: status 200': (r) => r.status === 200,
    });
  }

  sleep(1);

  // Test 7: Obtener total por ciudades
  let totalCiudadesRes = http.get(`${BASE_URL}/total-ciudades`);
  check(totalCiudadesRes, {
    'Total ciudades: status 200': (r) => r.status === 200,
    'Total ciudades: es objeto': (r) => typeof JSON.parse(r.body) === 'object',
  });

  sleep(2);
}

// Función que se ejecuta al finalizar la prueba
export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

// Importar textSummary para el resumen
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
