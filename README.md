# PokeAgent 🐱‍👤

PokeAgent es una aplicación que permite gestionar y visualizar datos de Pokémon, desarrollada con **Angular** en el frontend y **NestJS** en el backend.

## 🚀 Características
- Autenticación de usuarios
- Búsqueda y filtrado de Pokémon
- Conexión con API externa

## 📦 Tecnologías
- **Frontend:** Angular 19, Angular Material
- **Backend:** NestJS, TypeORM, PostgreSQL
- **Despliegue:** Vercel (Frontend), Render (Backend)

---

## 📥 Instalación y Configuración

### 🔹 **Requisitos Previos**
Asegúrate de tener instalado en tu sistema:
- [Node.js](https://nodejs.org/) (versión recomendada: `18.x` o superior)
- [Angular CLI](https://angular.io/) (`npm install -g @angular/cli`)
- [MongoDB](https://www.mongodb.com/)
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

# Ejecutar migraciones (si aplica)
npm run migration:run

# Iniciar servidor en modo desarrollo
npm run start:dev

### 🎨 Instalación del Frontend (Angular)
# Clonar el repositorio
git clone https://github.com/Mrpsycko87/pokeagent-frontend.git
cd pokeagent-frontend

# Instalar dependencias
npm install

# Ejecutar la aplicación en local
ng serve
El frontend estará disponible en http://localhost:4200.

✨ Autor
Pablo Carvajal – Desarrollador Full Stack (Marzo 2025)

```bash