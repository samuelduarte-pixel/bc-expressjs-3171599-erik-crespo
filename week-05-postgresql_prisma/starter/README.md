# 🏥 Proyecto Semana 05 — API Clínica de Fertilidad

**Estudiante:** Erik Samuel Crespo Duarte  
**ID:** 3171599  
**Bootcamp:** bc-expressjs  

---

## 📋 Descripción del Dominio

API REST para la gestión de pacientes de una **Clínica de Fertilidad**. Permite registrar pacientes con sus diagnósticos y asignarlos a doctores especialistas. El sistema maneja el ciclo completo de información clínica con validaciones, paginación y manejo de errores de base de datos.

---

## 🗂️ Diagrama de Entidades

```
┌─────────────────────────────┐         ┌──────────────────────────────┐
│           Doctor            │         │           Patient             │
├─────────────────────────────┤         ├──────────────────────────────┤
│ id          Int  @id        │         │ id          Int  @id         │
│ name        String          │ 1     N │ firstName   String           │
│ specialty   String          │◄────────│ lastName    String           │
│ licenseNo   String @unique  │         │ email       String @unique   │
│ email       String @unique  │         │ phone       String           │
│ phone       String          │         │ dateOfBirth DateTime         │
│ active      Boolean         │         │ diagnosis   String           │
│ createdAt   DateTime        │         │ active      Boolean          │
│ updatedAt   DateTime        │         │ doctorId    Int?             │
└─────────────────────────────┘         │ createdAt   DateTime         │
                                        │ updatedAt   DateTime         │
                                        └──────────────────────────────┘

Relación: Un Doctor puede atender muchos Patients (1:N)
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión |
|------------|---------|
| Node.js | v24.15.0 |
| TypeScript | 5.8.3 |
| Express | 5.1.0 |
| Prisma ORM | 6.8.0 |
| PostgreSQL | 16 (Docker) |
| Zod | 4.3.6 |
| Winston | 3.17.0 |

---

## 🚀 Iniciar el Proyecto

```bash
# 1. Levantar PostgreSQL con Docker
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Ejecutar migración
pnpm prisma migrate dev --name init

# 5. Ejecutar seed
pnpm prisma db seed

# 6. Iniciar servidor
pnpm dev
```

---

## 📡 Endpoints

Base URL: `http://localhost:3000/api/v1`

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/patients` | Listado paginado de pacientes | 200 |
| GET | `/patients/:id` | Detalle de un paciente con su doctor | 200 / 404 |
| POST | `/patients` | Crear nuevo paciente | 201 / 400 / 409 |
| PUT | `/patients/:id` | Actualizar paciente | 200 / 404 |
| DELETE | `/patients/:id` | Eliminar paciente | 204 / 404 |

---

## 📖 Ejemplos de Request / Response

### GET `/api/v1/patients?page=1&limit=10`

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Laura",
      "lastName": "Gómez",
      "email": "laura.gomez@email.com",
      "phone": "3101112233",
      "dateOfBirth": "1990-05-14T00:00:00.000Z",
      "diagnosis": "Síndrome de ovario poliquístico",
      "active": true,
      "doctorId": 1,
      "createdAt": "2026-06-01T16:39:44.365Z",
      "updatedAt": "2026-06-01T16:39:44.365Z",
      "doctor": {
        "id": 1,
        "name": "Dra. Valentina Ríos",
        "specialty": "Reproducción Asistida",
        "licenseNo": "MED-001",
        "email": "v.rios@clinica.com",
        "phone": "3001234567",
        "active": true
      }
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10
}
```

---

### GET `/api/v1/patients/1`

**Response 200:**
```json
{
  "id": 1,
  "firstName": "Laura",
  "lastName": "Gómez",
  "email": "laura.gomez@email.com",
  "phone": "3101112233",
  "dateOfBirth": "1990-05-14T00:00:00.000Z",
  "diagnosis": "Síndrome de ovario poliquístico",
  "active": true,
  "doctorId": 1,
  "doctor": {
    "id": 1,
    "name": "Dra. Valentina Ríos",
    "specialty": "Reproducción Asistida"
  }
}
```

**Response 404:**
```json
{
  "status": "error",
  "message": "Paciente no encontrado"
}
```

---

### POST `/api/v1/patients`

**Request Body:**
```json
{
  "firstName": "Ana",
  "lastName": "Martínez",
  "email": "ana.martinez@email.com",
  "phone": "3156667788",
  "dateOfBirth": "1992-08-15",
  "diagnosis": "Infertilidad secundaria",
  "doctorId": 1
}
```

**Response 201:**
```json
{
  "id": 6,
  "firstName": "Ana",
  "lastName": "Martínez",
  "email": "ana.martinez@email.com",
  "phone": "3156667788",
  "dateOfBirth": "1992-08-15T00:00:00.000Z",
  "diagnosis": "Infertilidad secundaria",
  "active": true,
  "doctorId": 1,
  "doctor": {
    "id": 1,
    "name": "Dra. Valentina Ríos",
    "specialty": "Reproducción Asistida"
  }
}
```

**Response 400 (validación):**
```json
{
  "status": "error",
  "message": "Email inválido"
}
```

**Response 409 (email duplicado):**
```json
{
  "status": "error",
  "message": "Ya existe un paciente con ese email"
}
```

---

### PUT `/api/v1/patients/1`

**Request Body:**
```json
{
  "diagnosis": "Síndrome de ovario poliquístico severo"
}
```

**Response 200:**
```json
{
  "id": 1,
  "firstName": "Laura",
  "lastName": "Gómez",
  "diagnosis": "Síndrome de ovario poliquístico severo",
  "active": true,
  "doctorId": 1,
  "doctor": {
    "id": 1,
    "name": "Dra. Valentina Ríos"
  }
}
```

---

### DELETE `/api/v1/patients/6`

**Response 204:** *(sin body)*

**Response 404:**
```json
{
  "status": "error",
  "message": "Paciente no encontrado"
}
```

---

## 🌱 Logs del Seed

```
🌱 Iniciando seed...
✅ 2 doctores creados
✅ 5 pacientes creados
The seed command has been executed.
```

---

## 🏗️ Arquitectura en Capas

```
src/
├── config/
│   └── logger.ts          → Configuración Winston
├── errors/
│   └── AppError.ts        → Clase de errores operacionales
├── middlewares/
│   ├── errorHandler.ts    → Manejo global de errores
│   └── notFound.ts        → Rutas no encontradas
├── schemas/
│   └── items.schema.ts    → Validación Zod (CreatePatientDto, UpdatePatientDto)
├── repositories/
│   └── items.repository.ts → Acceso a datos con Prisma (P2002, P2025)
├── services/
│   └── items.service.ts   → Lógica de negocio
├── controllers/
│   └── items.controller.ts → Capa HTTP
├── routes/
│   └── items.routes.ts    → Definición de rutas
├── lib/
│   └── prisma.ts          → Singleton PrismaClient
├── app.ts                 → Configuración Express
└── server.ts              → Entry point
```

---

## ⚠️ Manejo de Errores Prisma

| Código Prisma | HTTP | Mensaje |
|---------------|------|---------|
| `P2002` | 409 Conflict | Ya existe un paciente con ese email |
| `P2025` | 404 Not Found | Paciente no encontrado |
| Validación Zod | 400 Bad Request | Mensaje del campo inválido |
| Error genérico | 500 Internal Server Error | Internal server error |