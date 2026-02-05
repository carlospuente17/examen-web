# Sistema de Proveedores

CRUD de proveedores con Spring Boot y React.

## Tecnologías

**Backend:** Spring Boot 4.0.2, Java 25, H2/PostgreSQL, JPA  
**Frontend:** React 19, Vite 7, Axios  
**Tests:** JUnit 5, Mockito, Vitest

## Instalación

```bash
# Backend
cd productos-crud
mvn clean install
mvn spring-boot:run

# Frontend
cd frontend
npm install
npm run dev
```

Backend: http://localhost:8080  
Frontend: http://localhost:5173

## Endpoints

```
GET    /api/proveedores              - Listar todos
GET    /api/proveedores/{id}         - Ver uno
GET    /api/proveedores?tipo=X       - Filtrar por tipo
POST   /api/proveedores              - Crear
PUT    /api/proveedores/{id}         - Actualizar
DELETE /api/proveedores/{id}         - Eliminar
GET    /api/proveedores/total-ciudades - Conteo por ciudad

GET    /actuator/health              - Health check
GET    /actuator/metrics             - Métricas
```

## Modelo

```json
{
  "id": 1,
  "nombre": "Proveedor Demo",
  "telefono": "099-123-4567",
  "ciudad": "Cuenca",
  "tipo": "Mayorista"
}
```

## Tests

```bash
# Backend (15 pruebas)
cd productos-crud
mvn test

# Frontend (7 pruebas)
cd frontend
npm test -- --run

# Estrés (k6)
k6 run k6-stress-test.js
```

## Errores

El sistema maneja errores 400 (Bad Request), 404 (Not Found) y 500 (Server Error) con respuestas JSON estructuradas.

## Producción

Configurado con `render.yaml` para deploy en Render.com con PostgreSQL.

---

**Estudiante:** Carlos Javier Puente Ortuño  
**Materia:** Ingeniería Web  
**Fecha:** 05/02/2026
