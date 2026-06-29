# Proyecto Semana 06 — API REST con MongoDB + Mongoose

## Dominio: Clinica de Fertilidad

**Estudiante:** Erik Samuel Crespo Duarte  
**ID:** 3171599

---

## Descripcion

API REST completa para una clinica de fertilidad construida con Express 5, TypeScript, Mongoose y MongoDB. La API gestiona doctores especializados y sus pacientes asignados.

---

## Entidades

### Doctor (Entidad Secundaria)

| Campo          | Tipo    | Descripcion                           |
|----------------|---------|---------------------------------------|
| name           | String  | Nombre completo del doctor            |
| specialty      | String  | Especialidad medica                   |
| licenseNumber  | String  | Numero de licencia (unico)            |
| email          | String  | Email del doctor (unico)              |
| phone          | String  | Telefono de contacto                  |
| available      | Boolean | Disibilidad para atender pacientes    |

### Patient (Entidad Principal)

| Campo          | Tipo       | Descripcion                           |
|----------------|------------|---------------------------------------|
| firstName      | String     | Nombre del paciente                   |
| lastName       | String     | Apellido del paciente                 |
| email          | String     | Email del paciente (unico)            |
| phone          | String     | Telefono de contacto                  |
| dateOfBirth    | Date       | Fecha de nacimiento                   |
| diagnosis      | String     | Diagnostico medico                    |
| active         | Boolean    | Estado del paciente                   |
| assignedDoctor | ObjectId   | Referencia al Doctor asignado         |

---

## Diagrama de Relacion

```
doctors                              patients
+--------------------------+         +---------------------------------------+
| _id: ObjectId            |<--------| assignedDoctor: Schema.Types.ObjectId |
| name: String             |         | firstName: String                     |
| specialty: String        |         | lastName: String                      |
| licenseNumber: String    |         | email: String (unique)                |
| email: String (unique)   |         | phone: String                         |
| phone: String            |         | dateOfBirth: Date                     |
| available: Boolean       |         | diagnosis: String                     |
| createdAt: Date          |         | active: Boolean                       |
| updatedAt: Date          |         | createdAt: Date                       |
+--------------------------+         | updatedAt: Date                       |
                                     +---------------------------------------+
```

---

## Endpoints

### Doctors

| Metodo | Ruta                 | Descripcion              | Status       |
|--------|----------------------|--------------------------|--------------|
| GET    | /api/v1/doctors      | Listar doctores (paginado) | 200        |
| GET    | /api/v1/doctors/:id  | Obtener doctor por ID    | 200 / 404   |
| POST   | /api/v1/doctors      | Crear doctor             | 201 / 400 / 409 |
| PUT    | /api/v1/doctors/:id  | Actualizar doctor        | 200 / 404   |
| DELETE | /api/v1/doctors/:id  | Eliminar doctor          | 204 / 404   |

### Patients

| Metodo | Ruta                 | Descripcion              | Status       |
|--------|----------------------|--------------------------|--------------|
| GET    | /api/v1/patients     | Listar pacientes (paginado + populate) | 200 |
| GET    | /api/v1/patients/:id | Obtener paciente (populate) | 200 / 404 |
| POST   | /api/v1/patients     | Crear paciente           | 201 / 400 / 409 |
| PUT    | /api/v1/patients/:id | Actualizar paciente      | 200 / 404   |
| DELETE | /api/v1/patients/:id | Eliminar paciente        | 204 / 404   |

---

## Paginacion

```
GET /api/v1/patients?page=1&limit=10
```

Respuesta:
```json
{
  "data": [...],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

---

## Errores Manejados

| Error MongoDB       | Codigo HTTP | Mensaje                          |
|---------------------|-------------|----------------------------------|
| 11000 (duplicate)   | 409         | Ya existe un registro con ese valor |
| CastError (ID)      | 400         | ID invalido                      |
| Documento no existe | 404         | No encontrado                    |

---

## Iniciar el Proyecto

```bash
# 1. Levantar MongoDB con Docker
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Ejecutar seed (inserta datos de prueba)
pnpm seed

# 5. Iniciar servidor en modo desarrollo
pnpm dev
```

---

## Estructura del Proyecto

```
starter/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── config/logger.ts
    ├── lib/mongoose.ts          <- connectDB / disconnectDB
    ├── models/
    │   ├── doctor.model.ts      <- Schema y Model de Doctor
    │   └── patient.model.ts     <- Schema y Model de Patient (con ref)
    ├── errors/AppError.ts
    ├── middlewares/
    │   ├── errorHandler.ts
    │   └── notFound.ts
    ├── schemas/
    │   ├── doctor.schema.ts     <- Validacion Zod Doctor
    │   └── patient.schema.ts    <- Validacion Zod Patient (ObjectId)
    ├── repositories/
    │   ├── doctors.repository.ts    <- CRUD + error handling MongoDB
    │   └── patients.repository.ts   <- CRUD + populate + error handling
    ├── services/
    │   ├── doctors.service.ts
    │   └── patients.service.ts
    ├── controllers/
    │   ├── doctors.controller.ts
    │   └── patients.controller.ts
    ├── routes/
    │   ├── doctors.routes.ts
    │   └── patients.routes.ts
    ├── app.ts
    ├── server.ts
    └── seed.ts
```

---

## Dependencias

- **Node.js** 22+
- **Express** 5.1.0
- **Mongoose** 9.4.1
- **MongoDB** 7 (Docker)
- **Zod** 4.3.6
- **Winston** 3.17.0
- **TypeScript** 5.8.3
