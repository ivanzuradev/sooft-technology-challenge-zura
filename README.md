# API Challenge Sooft Technology

Challenge Sooft Technology Backend. API de banco.

## Estructura del Proyecto

```
├── prisma/                  # Configuración de Prisma ORM
│   ├── migrations/          # Migraciones de base de datos
│   ├── schema.prisma        # Esquema de la base de datos
│   └── seed.ts              # Datos iniciales de prueba
├── src/                     # Código fuente de la aplicación
│   ├── auth/                # Módulo de autenticación
│   │   ├── decorators/      # Decoradores personalizados
│   │   │   └── public.decorator.ts  # Decorador para rutas públicas
│   │   ├── dto/             # Objetos de transferencia de datos
│   │   │   └── login.dto.ts # DTO para login
│   │   ├── guards/          # Guardias de autenticación
│   │   │   ├── jwt-auth.guard.ts    # Guard para JWT
│   │   │   └── local-auth.guard.ts  # Guard para auth local
│   │   ├── strategies/      # Estrategias de Passport
│   │   │   ├── jwt.strategy.ts      # Estrategia JWT
│   │   │   └── local.strategy.ts    # Estrategia local
│   │   ├── auth.controller.ts       # Controlador de autenticación
│   │   ├── auth.module.ts           # Módulo de autenticación
│   │   └── auth.service.ts          # Servicio de autenticación
│   ├── bank-transfers/      # Módulo de transferencias bancarias
│   │   ├── controllers/     # Controladores de transferencias
│   │   │   └── bank-transfers.controller.ts
│   │   │   └── bank-transfers.controller.spec.ts
│   │   ├── services/        # Servicios de transferencias
│   │   └── bank-transfers.module.ts # Módulo de transferencias
│   ├── companies/           # Módulo de empresas
│   │   ├── controllers/     # Controladores de empresas
│   │   │   └── companies.controller.ts
│   │   │   └── companies.controller.spec.ts
│   │   ├── dto/             # DTOs para empresas
│   │   ├── services/        # Servicios para empresas
│   │   │   └── companies.service.ts
│   │   │   └── companies.service.spec.ts
│   │   └── companies.module.ts      # Módulo de empresas
│   ├── db-layer/            # Capa de acceso a datos
│   │   ├── services/        # Servicios de base de datos
│   │   │   ├── principal-db.service.ts
│   │   │   └── principal-db.service.spec.ts
│   │   └── db-layer.module.ts       # Módulo de capa de datos
│   ├── users/               # Módulo de usuarios
│   │   ├── dto/             # DTOs para usuarios
│   │   │   └── create-user.dto.ts
│   │   ├── services/        # Servicios de usuarios
│   │   │   └── users.service.ts
│   │   └── users.module.ts          # Módulo de usuarios
│   ├── app.controller.ts    # Controlador principal
│   ├── app.controller.spec.ts       # Tests del controlador
│   ├── app.module.ts        # Módulo principal
│   ├── app.service.ts       # Servicio principal
│   └── main.ts              # Punto de entrada de la aplicación
```
## Requisitos

### Para poder ejecutar este proyecto vas a necesitar:

- `Node.Js`: Version 22 LTS. ([Descargar](https://nodejs.org/en))
- `Docker`: Tener docker instalado y en lo posible en una versión actual. ([Descargar](https://www.docker.com/))
- `pnpm`: Gestor de paquetes PNPM. ([Descargar](https://pnpm.io/es/installation))

## Instalación

### Ejecutar el siguiente comando:
```
  docker-compose up -d
```

Esto crea y despliega la base de datos, la app en nest.js, ejecuta el testing y un proceso para crear datos mock en la base.
La app se levanta en el `puerto 3000`

las VARIABLES de entorno se encuentran en el `docker-compose.yml`

#### Para detener todos los servicios se utiliza el comando:

```
docker-compose down
```

## Módulos

### Prisma

Prisma es el ORM utilizado para interactuar con la base de datos PostgreSQL de forma segura y cumpliendo las buenas prácticas. El esquema define los modelos:
- `User`: Para almacenar información de usuarios y autenticación
- `Empresa`: Para almacenar datos de empresas
- `Transferencia`: Para registrar transferencias bancarias

### Auth

El módulo de autenticación maneja:
- Login de usuarios con username/password
- Generación de JWT tokens
- Protección de rutas con guards
- Estrategias de autenticación (local y JWT)

### Bank Transfers

Gestiona las transferencias bancarias:
- Consulta de transferencias
- Listado de empresas con transferencias en el último mes

### Companies

Administra la información de empresas:
- Creación de empresas
- Consulta de empresas adheridas en el último mes

### DB Layer

Capa de abstracción para acceso a datos:
- Servicios específicos para operaciones de base de datos
- Abstracción de la lógica de acceso a datos

### Users

Gestión de usuarios del sistema:
- Creación de usuarios
- Consulta de usuarios por identificadores

## Autenticación

El sistema implementa autenticación basada en JWT:

1. Los usuarios se autentican con username/password vía `POST /auth/login`
2. Reciben un token JWT que deben incluir en subsecuentes peticiones
3. El token se valida automáticamente para todas las rutas excepto las marcadas como `@Public()`

## Entidades Principales

### Usuario
- `id`: Identificador único
- `username`: Nombre de usuario único
- `email`: Correo electrónico único
- `password`: Contraseña encriptada
- `role`: Rol del usuario (USER o ADMIN)
- `isActive`: Estado del usuario

### Empresa
- `id`: Identificador único
- `cuit`: CUIT único de la empresa
- `razonSocial`: Razón social
- `fechaAdhesion`: Fecha de adhesión al servicio
- Relación con transferencias

### Transferencia
- `id`: Identificador único
- `importe`: Monto de la transferencia
- `empresaId`: Relación con empresa
- `cuentaDebito`: Cuenta de origen
- `cuentaCredito`: Cuenta de destino
- `fechaTransferencia`: Fecha de la transacción

## Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión (público) (Se obtiene el jwt)

### Empresas
- `GET /companies/adhered-last-month` - Empresas adheridas el último mes
- `POST /companies` - Crear nueva empresa

### Transferencias
- `GET /bank-transfers/transfers/report/last-month` - Empresas con transferencias el último mes

## Pruebas

Ademas de los testing que tiene la app se puede probar de la siguiente manera. Deben estar levantados todos los servicios del docker-compose

### Token JWT
Para pegarle a las apis se necesita loguearse y obtener un token. Para eso podemos ejecutar el siguiente endpoint:

```
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data '{"username": "admin", "password": "admin123"}'
```
Y esto nos devolverá una respuesta así:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvb2Z0LnRlY2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDIxNjgyOTYsImV4cCI6MTc0MjI1NDY5Nn0.p0tNj6ZRdW7DPK3JD-Z6OJ_qbkOt7QWpvSqb0IkcTJI",
    "user": {
        "id": 3,
        "username": "admin",
        "email": "admin@sooft.tech",
        "role": "ADMIN"
    }
}
```
Ese access_token debemos mandarlo en el header como Authorization Bearer token

### API de Empresas

#### POST - Crear empresa 
Ejemplo de como enviar el request para crear una empresa a la API:

```
curl --location 'http://localhost:3000/companies/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvb2Z0LnRlY2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDIxNjgyOTYsImV4cCI6MTc0MjI1NDY5Nn0.p0tNj6ZRdW7DPK3JD-Z6OJ_qbkOt7QWpvSqb0IkcTJI' \
--data '{
    "cuit": "23-39148492-9",
    "razonSocial": "Ivan Alejandro Zura",
    "fechaAdhesion": "2025-02-01"
}'
```

Y esto nos devolverá una respuesta así:

```
{
    "id": 12,
    "cuit": "23-39148492-9",
    "razonSocial": "Ivan Alejandro Zura",
    "fechaAdhesion": "2025-02-01T00:00:00.000Z",
    "createdAt": "2025-03-16T23:41:38.526Z",
    "updatedAt": "2025-03-16T23:41:38.526Z"
}
```

#### GET - Empresas registradas el último mes 
Ejemplo de como enviar el request para obtener las empresas registradas el último mes a la API:

```
curl --location 'http://localhost:3000/companies/adhered-last-month' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvb2Z0LnRlY2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDIxNjgyOTYsImV4cCI6MTc0MjI1NDY5Nn0.p0tNj6ZRdW7DPK3JD-Z6OJ_qbkOt7QWpvSqb0IkcTJI'
```

Y esto nos devolverá una respuesta así:

```
[
  {
    "id": 1,
    "cuit": "30-71237574-8",
    "razonSocial": "Santander",
    "fechaAdhesion": "2025-02-10T00:00:00.000Z",
    "createdAt": "2025-03-16T23:31:47.132Z",
    "updatedAt": "2025-03-16T23:37:57.580Z"
  },
  {
    "id": 12,
    "cuit": "23-39148492-9",
    "razonSocial": "Ivan Alejandro Zura",
    "fechaAdhesion": "2025-02-01T00:00:00.000Z",
    "createdAt": "2025-03-16T23:41:38.526Z",
    "updatedAt": "2025-03-16T23:41:38.526Z"
  }
]
```

### API de Transferencias

#### GET - Empresas que hicieron transferencias el último mes 
Ejemplo de como enviar el request obtener las empresas que realizaron transferencias el último mes a la API:

```
curl --location 'http://localhost:3000/bank-transfers/transfers/report/last-month' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQHNvb2Z0LnRlY2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDIxNjgyOTYsImV4cCI6MTc0MjI1NDY5Nn0.p0tNj6ZRdW7DPK3JD-Z6OJ_qbkOt7QWpvSqb0IkcTJI'
```

Y esto nos devolverá una respuesta así:

```
[
    {
        "id": 6,
        "cuit": "23-39148492-7",
        "razonSocial": "Ivan Alejandro Zura",
        "fechaAdhesion": "2025-02-01T00:00:00.000Z",
        "createdAt": "2025-03-16T23:32:50.561Z",
        "updatedAt": "2025-03-16T23:32:50.561Z",
        "transferencias": [
            {
                "id": 10,
                "importe": 12300.75,
                "empresaId": 6,
                "cuentaDebito": "00012345678",
                "cuentaCredito": "00087654321",
                "fechaTransferencia": "2025-02-20T00:00:00.000Z",
                "createdAt": "2025-03-16T23:37:57.584Z",
                "updatedAt": "2025-03-16T23:37:57.584Z"
            }
        ]
    },
    {
        "id": 2,
        "cuit": "30-71234664-9",
        "razonSocial": "Gire S.A",
        "fechaAdhesion": "2025-03-05T00:00:00.000Z",
        "createdAt": "2025-03-16T23:31:47.133Z",
        "updatedAt": "2025-03-16T23:37:57.580Z",
        "transferencias": [
            {
                "id": 11,
                "importe": 5400.3,
                "empresaId": 2,
                "cuentaDebito": "00034567890",
                "cuentaCredito": "00009876543",
                "fechaTransferencia": "2025-02-15T00:00:00.000Z",
                "createdAt": "2025-03-16T23:37:57.585Z",
                "updatedAt": "2025-03-16T23:37:57.585Z"
            }
        ]
    },
    {
        "id": 3,
        "cuit": "30-71234569-0",
        "razonSocial": "Mercado Libre SRL",
        "fechaAdhesion": "2025-01-15T00:00:00.000Z",
        "createdAt": "2025-03-16T23:31:47.134Z",
        "updatedAt": "2025-03-16T23:37:57.581Z",
        "transferencias": [
            {
                "id": 12,
                "importe": 7800.6,
                "empresaId": 3,
                "cuentaDebito": "00045678901",
                "cuentaCredito": "00001234567",
                "fechaTransferencia": "2025-02-10T00:00:00.000Z",
                "createdAt": "2025-03-16T23:37:57.585Z",
                "updatedAt": "2025-03-16T23:37:57.585Z"
            }
        ]
    }
]
```