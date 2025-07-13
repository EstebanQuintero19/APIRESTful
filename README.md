# Sistema de Catálogo Digital

Un sistema completo de gestión de catálogo digital con separación clara entre frontend y backend, construido con Node.js, Express, MongoDB y EJS.

##  Arquitectura

El proyecto está dividido en dos partes principales:

### Backend (API REST)
- **Puerto**: 9090
- **Tecnologías**: Node.js, Express, MongoDB, Mongoose
- **Funcionalidad**: API RESTful para gestión de productos, usuarios y clientes

### Frontend (Interfaz Web)
- **Puerto**: 9091
- **Tecnologías**: Node.js, Express, EJS, Bootstrap 5
- **Funcionalidad**: Interfaz de usuario para visualizar y gestionar el catálogo

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- MongoDB instalado y ejecutándose
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd APIRESTful
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:
```env
PORT=9090
MONGODB_URI=mongodb://localhost:27017/api_restful
SESSION_SECRET=mi_secreto_super_seguro_2024
NODE_ENV=development
FRONTEND_URL=http://localhost:9091
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/`:
```env
PORT=9091
API_URL=http://localhost:9090
SESSION_SECRET=frontend_secreto_2024
NODE_ENV=development
```

## 🏃‍♂️ Ejecutar el Proyecto

### Opción 1: Ejecutar por separado

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Opción 2: Ejecutar ambos simultáneamente
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener información del usuario actual

### Productos
- `GET /api/v1/product` - Obtener todos los productos
- `GET /api/v1/product/:ref` - Obtener producto por referencia
- `POST /api/v1/product` - Crear nuevo producto
- `PUT /api/v1/product/:ref` - Actualizar producto
- `DELETE /api/v1/product/:ref` - Eliminar producto

### Usuarios
- `GET /api/v1/user` - Obtener todos los usuarios
- `POST /api/v1/user` - Crear nuevo usuario
- `PUT /api/v1/user/:email` - Actualizar usuario
- `DELETE /api/v1/user/:email` - Eliminar usuario

### Clientes
- `GET /api/v1/client` - Obtener todos los clientes
- `GET /api/v1/client/status/:estado` - Obtener clientes por estado
- `GET /api/v1/client/:documento` - Obtener cliente por documento
- `POST /api/v1/client` - Crear nuevo cliente
- `PUT /api/v1/client/:documento` - Actualizar cliente
- `DELETE /api/v1/client/:documento` - Eliminar cliente

##  Acceso a la Aplicación

- **Frontend**: http://localhost:9091
- **Backend API**: http://localhost:9090/api/v1
- **Health Check**: http://localhost:9090/api/health

##  Autenticación

El sistema incluye:
- Registro de usuarios con roles (vendedor, administrador)
- Login con correo y contraseña
- Sesiones seguras con cookies httpOnly
- Encriptación de contraseñas con bcrypt

##  Características del Frontend

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Interfaz Moderna**: Utilizando Bootstrap 5 y Font Awesome
- **Navegación Intuitiva**: Menú de navegación con información del usuario
- **Gestión de Sesiones**: Control de acceso a rutas protegidas
- **Manejo de Errores**: Páginas de error personalizadas

##  Tecnologías Utilizadas

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **bcryptjs**: Encriptación de contraseñas
- **express-session**: Gestión de sesiones
- **cors**: Middleware para CORS
- **morgan**: Logger de requests

### Frontend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Servidor web
- **EJS**: Motor de plantillas
- **Bootstrap 5**: Framework CSS
- **Font Awesome**: Iconos
- **Axios**: Cliente HTTP
- **express-session**: Gestión de sesiones

##  Estructura del Proyecto

```
APIRESTful/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── client.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── client.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── index.js
│   ├── routes.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── views/
│   │   ├── pages/
│   │   │   ├── index.ejs
│   │   │   ├── login.ejs
│   │   │   ├── register.ejs
│   │   │   └── about.ejs
│   │   ├── partials/
│   │   │   ├── head.ejs
│   │   │   ├── header.ejs
│   │   │   └── footer.ejs
│   │   └── 404.ejs
│   ├── index.js
│   └── package.json
└── README.md
```

##  Scripts Disponibles

### Backend
- `npm start`: Ejecutar en modo producción
- `npm run dev`: Ejecutar con nodemon (desarrollo)

### Frontend
- `npm start`: Ejecutar en modo producción
- `npm run dev`: Ejecutar con nodemon (desarrollo)

##  Solución de Problemas

### Error de conexión a MongoDB
Asegúrate de que MongoDB esté ejecutándose:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Error de puertos ocupados
Si los puertos 9090 o 9091 están ocupados, modifica los archivos `.env`:
```env
PORT=9092  # Cambiar a otro puerto disponible
```

### Error de dependencias
Si hay problemas con las dependencias:
```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

##  Notas de Desarrollo

- El backend está configurado como una API REST pura
- El frontend se comunica con el backend mediante HTTP requests
- Las sesiones se manejan de forma independiente en ambos servicios
- CORS está configurado para permitir comunicación entre frontend y backend
- Todas las contraseñas se encriptan antes de almacenarse

