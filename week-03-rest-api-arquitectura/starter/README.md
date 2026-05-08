# 🧬 Proyecto Semana 03 — API REST Clínica de Fertilidad

Esta es la implementación del proyecto de la Semana 03 para el bootcamp de Express.js.  
La API fue construida utilizando una arquitectura en 4 capas:

- Routes
- Controllers
- Services
- Repositories

El proyecto implementa una API REST CRUD completa utilizando TypeScript y Express.js siguiendo buenas prácticas de arquitectura backend.

---

# 📋 Dominio: Clínica de Fertilidad

El dominio asignado para este proyecto fue una Clínica de Fertilidad.

Para cumplir con los requerimientos del bootcamp, el recurso principal implementado fue:

- `patients`

Los pacientes representan personas registradas en la clínica que reciben tratamientos de fertilidad.

---

# 🏥 Modelo Patient

El recurso cuenta con la siguiente estructura de datos tipada en TypeScript:

```ts
interface Patient {
  id: number;
  fullName: string;
  age: number;
  diagnosis: string;
  activeTreatment: boolean;
  createdAt: string;
}
```

---

# ✅ Endpoints Implementados

La API expone 5 endpoints para realizar operaciones CRUD completas.

| Método | Ruta | Status | Descripción |
|---|---|---|---|
| GET | `/api/v1/patients` | 200 | Listar pacientes con paginación |
| GET | `/api/v1/patients/:id` | 200 | Obtener paciente por ID |
| POST | `/api/v1/patients` | 201 | Crear nuevo paciente |
| PUT | `/api/v1/patients/:id` | 200 | Actualizar paciente existente |
| DELETE | `/api/v1/patients/:id` | 204 | Eliminar paciente |

---

# 📦 Ejemplos de Respuesta

## 🔹 Listar pacientes

### GET `/api/v1/patients?page=1&limit=2`

```json
{
  "data": [
    {
      "id": 1,
      "fullName": "Laura Gomez",
      "age": 34,
      "diagnosis": "Infertility",
      "activeTreatment": true,
      "createdAt": "2026-05-08T10:00:00.000Z"
    },
    {
      "id": 2,
      "fullName": "Maria Lopez",
      "age": 31,
      "diagnosis": "IVF Treatment",
      "activeTreatment": true,
      "createdAt": "2026-05-08T10:00:00.000Z"
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 2
}
```

---

## 🔹 Obtener paciente por ID

### GET `/api/v1/patients/1`

```json
{
  "data": {
    "id": 1,
    "fullName": "Laura Gomez",
    "age": 34,
    "diagnosis": "Infertility",
    "activeTreatment": true,
    "createdAt": "2026-05-08T10:00:00.000Z"
  }
}
```

---

## 🔹 Crear paciente

### POST `/api/v1/patients`

### Request Body

```json
{
  "fullName": "Ana Torres",
  "age": 29,
  "diagnosis": "Hormonal Treatment",
  "activeTreatment": true
}
```

### Response

```json
{
  "data": {
    "id": 3,
    "fullName": "Ana Torres",
    "age": 29,
    "diagnosis": "Hormonal Treatment",
    "activeTreatment": true,
    "createdAt": "2026-05-08T10:00:00.000Z"
  }
}
```

---

## 🔹 Error 404

### GET `/api/v1/patients/999`

```json
{
  "error": "Not Found",
  "message": "Patient 999 not found"
}
```

---

# 🏗️ Arquitectura Implementada

El proyecto fue desarrollado respetando la arquitectura en capas solicitada en el bootcamp:

## Repository

- Única capa con acceso a datos
- Manejo del store en memoria
- Métodos async con Promise<T>
- Copias defensivas

## Service

- Lógica de negocio
- Paginación
- Sin dependencias de Express

## Controller

- Extrae params, query y body
- Llama al service
- Retorna respuestas HTTP

## Routes

- Mapeo de endpoints
- Asociación URL → Controller

---

# 📁 Estructura del Proyecto

```txt
src/
├── app.ts
├── server.ts
├── types.ts
│
├── routes/
│   └── patients.routes.ts
│
├── controllers/
│   └── patients.controller.ts
│
├── services/
│   └── patients.service.ts
│
└── repositories/
    └── patients.repository.ts
```

---

# 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- TypeScript
- pnpm
- tsx

---

# 🚀 Cómo Ejecutar el Proyecto

## 1️⃣ Instalar dependencias

```bash
pnpm install
```

---

## 2️⃣ Ejecutar en desarrollo

```bash
pnpm dev
```

---

## 3️⃣ Ejecutar build TypeScript

```bash
pnpm build
```

---

# 🌐 URL Base

```txt
http://localhost:3000
```

---

# 🔗 Endpoints Disponibles

```txt
GET     /api/v1/patients
GET     /api/v1/patients/:id
POST    /api/v1/patients
PUT     /api/v1/patients/:id
DELETE  /api/v1/patients/:id
```

---

# ✅ Características Implementadas

- Arquitectura en capas
- CRUD completo
- DTOs tipados
- TypeScript
- Paginación
- Contratos REST consistentes
- Manejo de errores 404
- Datos en memoria
- Express 5

---

# 👨‍💻 Autor

**Erik Samuel Crespo Duarte**  
Ficha: **3171599**  
Bootcamp Express.js