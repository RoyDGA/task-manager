# Task Management API

API REST para la gestión de tareas, desarrollada con Node.js, Express, TypeScript y PostgreSQL. Incluye autenticación mediante JWT, validación de datos y control de acceso por usuario.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución.
- **Express:** framework para construir la API REST.
- **TypeScript:** tipado estático.
- **PostgreSQL:** base de datos relacional.
- **pg:** conexión y consultas a PostgreSQL.
- **bcrypt:** hash seguro de contraseñas.
- **jsonwebtoken (JWT):** autenticación mediante tokens.
- **AJV:** validación de datos mediante esquemas JSON.
- **Swagger:** documentación interactiva de la API.
- **pnpm:** gestor de paquetes.

## Requisitos previos

Antes de ejecutar el proyecto, necesitas tener instalado:

- Node.js.
- pnpm.
- PostgreSQL.
- Git.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/RoyDGA/task-manager.git
cd task-manager
```

Los siguientes comandos deben ejecutarse desde la raíz del proyecto, es decir, desde la carpeta que contiene `package.json`. No es necesario entrar en `src`.

### 2. Instalar las dependencias

```bash
pnpm install
```

## Configuración de las variables de entorno

Crea un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Configura las variables con los datos de tu entorno:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_secreto_jwt
```

## Base de datos

La aplicación utiliza PostgreSQL y requiere una base de datos llamada `task_manager`.

### 1. Crear la base de datos

Conéctate a PostgreSQL desde pgAdmin 4, abre el Query Tool sobre la base de datos `postgres` y ejecuta:

```sql
CREATE DATABASE task_manager;
```

### 2. Crear las tablas

Conéctate a la base de datos `task_manager` y ejecuta el contenido del archivo `database/schema.sql`.

Este script crea las tablas `users` y `tasks`, junto con sus restricciones y la relación entre usuarios y tareas.

Asegúrate de que las credenciales configuradas en `.env` correspondan a tu entorno de PostgreSQL.

## Ejecución

### Modo desarrollo

```bash
pnpm dev
```

### Compilar el proyecto

```bash
pnpm build
```

### Ejecutar la versión compilada

```bash
pnpm start
```

El servidor utiliza el puerto `3000`.

## Pruebas

Las pruebas de integración usan Vitest y Supertest, y necesitan una instancia de PostgreSQL disponible. Configura un archivo `.env.test` en la raíz del proyecto con una base de datos exclusiva para pruebas:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager_test
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=un_secreto_de_prueba
```

Crea esa base de datos y ejecuta en ella el contenido de `database/schema.sql`. No reutilices la base de datos de desarrollo ni incluyas credenciales reales en el repositorio. Luego ejecuta:

```bash
pnpm test
```

La suite cubre registro e inicio de sesión, autenticación, y operaciones de creación, consulta, actualización y eliminación de tareas, incluyendo el aislamiento entre usuarios.

## Documentación de la API

Con el servidor en ejecución, abre Swagger UI:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Desde allí puedes consultar la documentación de los endpoints y realizar peticiones de prueba.

## Autenticación

Las rutas protegidas requieren un token JWT obtenido mediante el inicio de sesión.

### 1. Registrar un usuario

Envía una petición `POST` a `/auth/register` con un nombre, correo electrónico y contraseña.

### 2. Iniciar sesión

Envía una petición `POST` a `/auth/login` con el correo electrónico y la contraseña registrados.

Si las credenciales son correctas, la API devolverá un token JWT.

### 3. Acceder a las rutas protegidas

Incluye el token en la cabecera HTTP:

```http
Authorization: Bearer <token>
```

En Swagger puedes utilizar el botón **Authorize** para introducir el token.

Los usuarios de ejemplo incluidos en la documentación no se crean automáticamente. Debes registrar un usuario antes de iniciar sesión con sus credenciales.

## Endpoints principales

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar un usuario |
| POST | `/auth/login` | Iniciar sesión |

### Tareas

Todos los endpoints de tareas requieren autenticación mediante JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/tasks` | Crear una tarea |
| GET | `/tasks` | Listar las tareas del usuario autenticado |
| GET | `/tasks/:id` | Consultar una tarea por ID |
| PUT | `/tasks/:id` | Actualizar una tarea |
| DELETE | `/tasks/:id` | Eliminar una tarea |

## Estructura del proyecto

```text
task-manager/
├── database/
│   └── schema.sql
├── src/
│   ├── api/
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   └── routes/
│   │       ├── auth.routes.ts
│   │       ├── health.routes.ts
│   │       └── task.routes.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── swagger.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── task.controller.ts
│   ├── persistence/
│   │   ├── task.repository.ts
│   │   └── user.repository.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── task.service.ts
│   ├── utils/
│   │   └── app-error.ts
│   ├── validators/
│   │   └── task.schema.ts
│   └── index.ts
├── .env.example
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```

### Responsabilidad de las carpetas

- **`api/middlewares/`:** autenticación, validación de solicitudes y manejo centralizado de errores.
- **`api/routes/`:** definición de las rutas de autenticación, tareas y comprobación de estado.
- **`config/`:** configuración de la conexión a PostgreSQL y Swagger.
- **`controllers/`:** recepción de solicitudes HTTP y envío de respuestas.
- **`persistence/`:** consultas y acceso a la base de datos.
- **`services/`:** lógica de negocio para autenticación y gestión de tareas.
- **`utils/`:** utilidades compartidas, incluida la clase personalizada de errores.
- **`validators/`:** esquemas para validar los datos recibidos.
- **`database/`:** script SQL para crear las tablas.

## Funcionalidades

- Registro de usuarios con contraseñas protegidas mediante bcrypt.
- Inicio de sesión y autenticación mediante JWT.
- Protección de rutas privadas.
- Operaciones CRUD para las tareas.
- Validación de datos de entrada mediante AJV.
- Restricción de acceso a las tareas según su propietario.
- Manejo centralizado de errores.
- Documentación interactiva mediante Swagger.

## Estados de las tareas

Los estados permitidos son:

- `pendiente`
- `en curso`
- `completada`

## Registro del desarrollo

El archivo `DEVELOPMENT_LOG.md` documenta el uso de herramientas de inteligencia artificial durante el desarrollo, los prompts relevantes, las decisiones tomadas, los cambios aceptados o rechazados y las verificaciones realizadas.

## Licencia

Proyecto desarrollado con fines de evaluación técnica.
