# Proyecto Semana 07 — Autenticacion con JWT

## Dominio: Clinica de Fertilidad

**Estudiante:** Erik Samuel Crespo Duarte
**ID:** 3171599

---

## Descripcion

API REST con sistema de autenticacion completo usando bcrypt, JWT (access/refresh tokens) y cookies HttpOnly. El recurso principal (Pacientes) esta protegido por rutas autenticadas.

---

## Sistema de Autenticacion

### Endpoints de Auth

| Metodo | Ruta                     | Descripcion                          | Auth |
|--------|--------------------------|--------------------------------------|------|
| POST   | /api/v1/auth/register    | Registro de usuario                  | No   |
| POST   | /api/v1/auth/login       | Login (emite cookies HttpOnly)       | No   |
| GET    | /api/v1/auth/me          | Perfil del usuario autenticado       | Si   |
| POST   | /api/v1/auth/refresh     | Renueva access token con refresh     | No   |
| POST   | /api/v1/auth/logout      | Invalida refresh token y limpia cookies | Si |

### Seguridad Implementada

- Contrasenas hasheadas con bcrypt (salt rounds 10)
- Access token: 15 minutos de duracion
- Refresh token: 7 dias de duracion
- Secrets distintos para access y refresh
- Tokens en cookies HttpOnly, secure (production), sameSite lax
- Refresh token hasheado en DB (nunca el token en claro)
- Rotacion de refresh token en cada /refresh
- Mismo mensaje de error para email no encontrado y password incorrecta

---

## CRUD de Pacientes (Protegido)

| Metodo | Ruta                  | Descripcion            | Status        |
|--------|-----------------------|------------------------|---------------|
| GET    | /api/v1/patients      | Listar (paginado)      | 200           |
| GET    | /api/v1/patients/:id  | Obtener por ID         | 200 / 404     |
| POST   | /api/v1/patients      | Crear                  | 201 / 400 / 409 |
| PATCH  | /api/v1/patients/:id  | Actualizar             | 200 / 404     |
| DELETE | /api/v1/patients/:id  | Eliminar               | 204 / 404     |

Todas las rutas de pacientes requieren cookie `accessToken` valida.

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

## Flujo de Autenticacion

```
1. Register → POST /auth/register con { email, password, name }
2. Login    → POST /auth/login con { email, password }
             → Recibe cookies: accessToken (15min) + refreshToken (7d)
3. Request  → Cualquier request a /api/v1/patients incluye cookie accessToken
4. Refresh  → POST /auth/refresh con cookie refreshToken
             → Recibe nuevas cookies con tokens rotados
5. Logout   → POST /auth/logout
             → Limpia cookies y invalida refresh token en DB
```

---

## Usuarios de Prueba (Seed)

| Email              | Password   | Rol   |
|--------------------|------------|-------|
| admin@clinica.com  | Password1  | admin |
| doctor@clinica.com | Password1  | user  |

---

## Iniciar el Proyecto

```bash
# 1. Levantar MongoDB
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Generar secrets JWT (editar .env)
# Windows PowerShell:
# -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# 5. Ejecutar seed
pnpm seed

# 6. Iniciar servidor
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
    ├── lib/mongoose.ts              <- connectDB / disconnectDB
    ├── types/express.d.ts           <- req.user tipado
    ├── utils/jwt.ts                 <- sign/verify access + refresh tokens
    ├── errors/AppError.ts
    ├── middlewares/
    │   ├── auth.middleware.ts        <- verifica JWT de cookie
    │   ├── errorHandler.ts
    │   └── notFound.ts
    ├── models/
    │   ├── user.model.ts            <- email, password (select:false), role, refreshToken
    │   └── patient.model.ts         <- recurso principal con addedBy (ref User)
    ├── schemas/
    │   ├── auth.schema.ts           <- register/login Zod
    │   └── patient.schema.ts        <- create/update Patient Zod
    ├── repositories/
    │   ├── users.repository.ts      <- operaciones de usuario
    │   └── patients.repository.ts   <- CRUD con populate
    ├── services/
    │   ├── auth.service.ts          <- register/login/refresh/logout/getMe
    │   └── patients.service.ts
    ├── controllers/
    │   ├── auth.controller.ts       <- handlers de auth con cookies
    │   └── patients.controller.ts
    ├── routes/
    │   ├── auth.routes.ts           <- rutas publicas y protegidas
    │   └── patients.routes.ts       <- rutas CRUD (todas con authMiddleware)
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
- **bcrypt** 5.1.1
- **jsonwebtoken** 9.0.2
- **cookie-parser** 1.4.7
- **Zod** 4.3.6
- **TypeScript** 5.8.3
