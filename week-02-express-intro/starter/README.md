# 🧬 BC-EXPRESSJS — Clínica de Fertilidad API

**Aprendiz:** Erik Samuel Crespo Duarte
**Ficha:** 3171599
**Dominio:** Clínica de fertilidad

---

## 📋 Descripción

API REST desarrollada con Node.js y Express para la gestión de una **clínica de fertilidad**.
Permite administrar información clave como:

* 👩‍⚕️ Pacientes
* 🧪 Tratamientos
* 🩺 Doctores
* 🔄 Ciclos

El proyecto hace parte del bootcamp de backend y aplica buenas prácticas de organización, arquitectura y desarrollo de APIs.

---

## 🎯 Objetivo

Construir una API funcional que permita realizar operaciones CRUD sobre los recursos del dominio asignado, simulando el comportamiento de un sistema real de gestión clínica.

---

## 🧱 Estructura del Proyecto

```
week-02-express-intro/
├── starter/
│   ├── src/
│   │   ├── routes/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── store.ts
│   │   └── types.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
```

---

## ⚙️ Tecnologías Utilizadas

* Node.js
* Express.js
* TypeScript
* pnpm

---

## 🚀 Instalación y Ejecución

1. Clonar el repositorio:

```
git clone https://github.com/samuelduarte-pixel/bc-expressjs-3171599-erik-crespo.git
```

2. Entrar a la carpeta del proyecto:

```
cd bc-expressjs-3171599-erik-crespo/week-02-express-intro/starter
```

3. Instalar dependencias:

```
pnpm install
```

4. Ejecutar el servidor:

```
pnpm dev
```

---

## 🌐 Endpoints principales

### 📌 Pacientes

* GET `/patients` → Listar pacientes
* GET `/patients/:id` → Obtener paciente por ID
* POST `/patients` → Crear paciente
* PUT `/patients/:id` → Actualizar paciente
* DELETE `/patients/:id` → Eliminar paciente

---

### 📌 Tratamientos

* GET `/treatments`
* POST `/treatments`

---

### 📌 Doctores

* GET `/doctors`
* POST `/doctors`

---

### 📌 Ciclos

* GET `/cycles`
* POST `/cycles`

---

## 🧪 Ejemplo de Request

POST `/patients`

```json
{
  "name": "Ana Torres",
  "age": 34,
  "diagnosis": "Infertilidad primaria"
}
```

---

## 📊 Estado del Proyecto

✅ CRUD básico funcional
✅ Organización por capas
✅ Uso de rutas en Express
🔄 En progreso: validaciones y persistencia

---

## 📌 Notas

* Este proyecto utiliza almacenamiento en memoria (no base de datos aún)
* Hace parte del proceso de aprendizaje del bootcamp

---

## 👨‍💻 Autor

**Erik Samuel Crespo Duarte**
Ficha: 3171599
SENA — Análisis de Datos

---
