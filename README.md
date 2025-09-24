# PokeAgent 🐱‍👤

PokeAgent es una aplicación que permite gestionar y visualizar datos de Pokémon, desarrollada con **Angular** en el frontend y **NestJS** en el backend.

## 🚀 Características
- Autenticación de usuarios
- Búsqueda y filtrado de Pokémon
- Conexión con API externa
- Cache inteligente para mejores tiempos de respuesta
- Base de datos PostgreSQL para mejor rendimiento y escalabilidad

## 📦 Tecnologías
- **Frontend:** Angular 19, Angular Material
- **Backend:** NestJS 11, TypeORM, PostgreSQL 16
- **Cache:** Cache Manager con memoria
- **Despliegue:** Vercel (Frontend), Render (Backend)
- **Containerización:** Docker & Docker Compose

---

## 📥 Instalación y Configuración

### 🔹 **Requisitos Previos**
Asegúrate de tener instalado en tu sistema:
- [Node.js](https://nodejs.org/) (versión recomendada: `20.x` LTS o superior)
- [Angular CLI](https://angular.io/) (`npm install -g @angular/cli`)
- [PostgreSQL 16](https://www.postgresql.org/) o Docker para contenedores
- Un gestor de paquetes como `npm` o `yarn`

### 🖥️ **Instalación del Backend (NestJS)**

# Clonar el repositorio
git clone https://github.com/Mrpsycko87/pokeagent-backend.git
cd pokeagent-backend

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env

# Configurar credenciales de la base de datos en el .env
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=your_password
# DB_NAME=pokeagent

# Opción 1: Usar Docker Compose (Recomendado)
docker-compose up -d

# Opción 2: Configuración manual
# Asegúrate de tener PostgreSQL 16 ejecutándose
# Crea la base de datos 'pokeagent'

# Construir la aplicación
npm run build

# Iniciar servidor en modo desarrollo
npm run start:dev

# Para producción
npm run start:prod

### 🎨 Instalación del Frontend (Angular)
# Clonar el repositorio
git clone https://github.com/Mrpsycko87/pokeagent-frontend.git
cd pokeagent-frontend

# Instalar dependencias
npm install

# Ejecutar la aplicación en local
ng serve
El frontend estará disponible en http://localhost:4200.
El backend estará disponible en http://localhost:3000.

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Ejecutar tests con cobertura
npm run test:cov

# Ejecutar tests e2e
npm run test:e2e
```

## 📋 Scripts Disponibles

```bash
npm run build          # Construir la aplicación
npm run start          # Iniciar en modo producción
npm run start:dev      # Iniciar en modo desarrollo con hot-reload
npm run start:debug    # Iniciar en modo debug
npm run test           # Ejecutar tests unitarios
npm run test:watch     # Ejecutar tests en modo watch
npm run lint           # Ejecutar linter
npm run format         # Formatear código con Prettier
```

## 🐳 Despliegue con Docker

```bash
# Construir y ejecutar con Docker Compose
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar servicios
docker-compose down
```

## 🔄 Migración

Si vienes de una versión anterior que usaba MongoDB, consulta la [Guía de Migración](./MIGRATION-GUIDE.md) para obtener instrucciones detalladas sobre cómo migrar tus datos a PostgreSQL.

## 🌍 Variables de Entorno

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_NAME=pokeagent

# Aplicación
PORT=3000
NODE_ENV=development

# JWT (si se implementa autenticación)
JWT_SECRET=tu_jwt_secret
JWT_EXPIRATION=3600
```

## 📁 Estructura del Proyecto

```
src/
├── entities/          # Entidades TypeORM
├── config/           # Configuraciones
├── pokemon/          # Módulo Pokemon
├── user/             # Módulo Usuario
├── schemas/          # Schemas legacy (para referencia)
├── app.module.ts     # Módulo principal
└── main.ts          # Punto de entrada
```

---

✨ **Autor**
Pablo Carvajal – Desarrollador Full Stack (Marzo 2025)

## 📝 Changelog

### v2.0.0 - Database Migration & Modernization
- ✅ Migración de MongoDB a PostgreSQL 16
- ✅ Actualización a Node.js 20 LTS
- ✅ Implementación de TypeORM
- ✅ Corrección de vulnerabilidades de seguridad
- ✅ Mejora de tests y cobertura
- ✅ Optimización del Dockerfile
- ✅ Documentación actualizada