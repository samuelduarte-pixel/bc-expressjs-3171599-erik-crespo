# Proyecto Semana 04 — Validación, Errores y Logging

## 👤 Aprendiz

**Nombre:** Erik Samuel Crespo Duarte
**Ficha:** 3171599

---

## 🏥 Dominio: Clínica de Fertilidad

API REST para gestionar pacientes de una clínica de fertilidad, permitiendo registrar su información personal, diagnóstico y estado de atención.

---

## 📦 Recurso: Patient (Paciente)

| Campo       | Tipo      | Validación Zod                                      | Descripción                          |
|-------------|-----------|-----------------------------------------------------|--------------------------------------|
| `id`        | `number`  | Auto-generado                                       | ID autoincremental                   |
| `fullName`  | `string`  | `min(3).trim()`                                     | Nombre completo del paciente         |
| `email`     | `string`  | `.email()`                                          | Correo electrónico único             |
| `phone`     | `string`  | `regex(/^\+?[\d\s\-]{7,15}$/)`                     | Número de teléfono                   |
| `birthDate` | `string`  | `regex(/^\d{4}-\d{2}-\d{2}$/)`                     | Fecha de nacimiento (YYYY-MM-DD)     |
| `diagnosis` | `string`  | `min(5).trim().default('Pendiente de evaluación')`  | Diagnóstico médico                   |
| `isActive`  | `boolean` | `default(true)`                                     | Si el paciente está en tratamiento   |
| `createdAt` | `Date`    | Auto-generado                                       | Fecha de registro                    |

---

## 📊 Endpoints

| Método   | Ruta                                   | Descripción                        | Status            |
|----------|----------------------------------------|------------------------------------|-------------------|
| `GET`    | `/api/v1/patients?page=1&limit=10`     | Listar pacientes con paginación    | 200               |
| `GET`    | `/api/v1/patients/:id`                 | Obtener paciente por ID            | 200 / 400 / 404   |
| `POST`   | `/api/v1/patients`                     | Crear paciente (validación Zod)    | 201 / 400         |
| `PUT`    | `/api/v1/patients/:id`                 | Actualizar (campos opcionales)     | 200 / 400 / 404   |
| `DELETE` | `/api/v1/patients/:id`                 | Eliminar paciente                  | 204 / 400 / 404   |

---

## 🚀 Cómo ejecutar

```bash
pnpm install       # instalar dependencias
pnpm dev           # desarrollo con hot-reload
pnpm build         # compilar TypeScript
pnpm start         # producción
```

---

## 🧪 Ejemplos de curl

```bash
# Listar pacientes con paginación
curl http://localhost:3000/api/v1/patients?page=1&limit=10

# Crear paciente válido → 201
curl -X POST http://localhost:3000/api/v1/patients \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Carmen Pérez Díaz","email":"carmen.perez@email.com","phone":"+57 320 111 2233","birthDate":"1995-08-10","diagnosis":"Endometriosis grado II"}'

# POST con body inválido → 400 con issues
curl -X POST http://localhost:3000/api/v1/patients \
  -H "Content-Type: application/json" \
  -d '{"fullName":"A","email":"no-es-un-email"}'

# GET con id no numérico → 400
curl http://localhost:3000/api/v1/patients/abc

# GET con id inexistente → 404
curl http://localhost:3000/api/v1/patients/9999

# Ruta inexistente → 404 JSON (no HTML)
curl http://localhost:3000/api/v1/ruta-falsa

# Actualizar paciente → 200
curl -X PUT http://localhost:3000/api/v1/patients/1 \
  -H "Content-Type: application/json" \
  -d '{"diagnosis":"Síndrome de ovario poliquístico confirmado","isActive":true}'

# Eliminar paciente → 204
curl -X DELETE http://localhost:3000/api/v1/patients/2
```

---

## 🏗️ Arquitectura

```
src/
├── config/
│   └── logger.ts             → Winston logger + Morgan middleware stream
├── errors/
│   └── AppError.ts           → Clase de errores operacionales con statusCode
├── middlewares/
│   ├── errorHandler.ts       → Handler global (4 params): ZodError→400, AppError→statusCode, genérico→500
│   └── notFound.ts           → 404 handler para rutas no encontradas
├── schemas/
│   └── item.schema.ts        → Schemas Zod: createItemSchema + updateItemSchema + tipos inferidos
├── repositories/
│   └── items.repository.ts   → Capa de acceso a datos en memoria con seed de 3 pacientes
├── services/
│   └── items.service.ts      → Lógica de negocio + AppError(404/409) según caso
├── controllers/
│   └── items.controller.ts   → Controller delgado: safeParse + next(err)
├── routes/
│   └── items.routes.ts       → 5 endpoints CRUD registrados
├── types.ts                  → Interface Patient + tipos de respuesta genéricos
├── app.ts                    → Setup Express: json → morgan → rutas → notFound → errorHandler
└── server.ts                 → Bootstrap con logger.info
```

---

## ✅ Checklist de la rúbrica

- [x] `AppError` extiende `Error` con `statusCode` e `isOperational`
- [x] Schemas Zod con `createItemSchema` + `updateItemSchema` (`.partial()`)
- [x] Tipos inferidos con `z.infer`
- [x] Validación con `.safeParse()` en `POST` y `PUT` (no `.parse()`)
- [x] Validación de `:id` con `z.coerce.number().int().positive()`
- [x] Error handler global con exactamente **4 parámetros**
- [x] Distingue `ZodError` (400), `AppError` (statusCode), genérico (500)
- [x] `notFound` registrado **antes** del `errorHandler`
- [x] Winston logger: nivel `http` en dev, `warn` en producción
- [x] Morgan integrado con stream de Winston
- [x] `logger.info` en `server.ts`, `logger.warn` en `errorHandler`
- [x] Sin `console.log` — todo usa `logger.*`
- [x] `pnpm build` sin errores TypeScript
- [x] Dominio adaptado coherentemente a Clínica de Fertilidad