# Renta Cars App

## Descripción
Renta Cars App es una plataforma web moderna desarrollada con Next.js para el alquiler de vehículos. La aplicación permite a los usuarios explorar un catálogo de coches, filtrar por características específicas y realizar reservas en línea de manera fácil y segura.

## Tecnologías Utilizadas

### Frontend
- **Next.js 15.0.3** - Framework React con App Router
- **React 19.0.0-rc** - Biblioteca para interfaces de usuario
- **Tailwind CSS** - Framework CSS utilitario
- **shadcn/ui** - Componentes UI basados en Radix
- **Embla Carousel** - Carruseles interactivos
- **Framer Motion** - Animaciones fluidas
- **Clerk** - Autenticación y gestión de usuarios
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### Backend
- **Next.js API Routes** - Endpoints de API
- **Prisma ORM** - ORM para base de datos
- **PostgreSQL** - Base de datos relacional
- **Uploadthing** - Gestión de archivos

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

## Estructura del Proyecto

```
renta-cars-app/
├── app/ (Next.js App Router)
│   ├── (auth)/ (Autenticación)
│   ├── (routes)/
│   │   ├── (home)/ (Rutas públicas)
│   │   └── (dashboard)/ (Rutas protegidas)
│   └── api/ (Endpoints de API)
├── components/
│   ├── Shared/ (Componentes compartidos)
│   └── ui/ (Componentes de interfaz)
├── hooks/ (React hooks personalizados)
├── lib/ (Utilidades y configuraciones)
├── prisma/ (ORM y schema de base de datos)
└── public/ (Archivos estáticos)
```

## Requisitos previos
- Node.js 18.x o superior
- Docker y Docker Compose (para entorno containerizado)
- PostgreSQL (si se ejecuta localmente)

## Instalación y ejecución

### Desarrollo local

1. Clonar el repositorio:
   ```sh
   git clone <repo-url>
   cd renta-cars-app
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Configurar variables de entorno:
   - Editar el archivo `.env` con tus credenciales de base de datos, Clerk, etc.
4. Ejecutar las migraciones de Prisma:
   ```sh
   npx prisma migrate dev
   ```
5. Iniciar el servidor de desarrollo:
   ```sh
   npm run dev
   ```
6. Acceder a la aplicación en [http://localhost:3000](http://localhost:3000)

### Ejecución con Docker

1. Asegúrate de tener Docker y Docker Compose instalados
2. Configurar variables de entorno:
   - Editar el archivo `.env.docker` con la configuración para Docker
3. Construir y ejecutar los contenedores:
   ```sh
   docker-compose up -d --build
   ```
4. Ejecutar las migraciones de Prisma:
   ```sh
   docker-compose exec app npx prisma migrate deploy
   ```
5. Acceder a la aplicación en [http://localhost:3000](http://localhost:3000)

## Configuración Docker
El proyecto incluye los siguientes archivos para Docker:

📄 [Dockerfile](./Dockerfile) - Configuración para construir la imagen de la aplicación  
📄 [docker-compose.yml](./docker-compose.yml) - Orquestación de servicios (app y base de datos)  
📄 [.dockerignore](./.dockerignore) - Archivos a excluir de la imagen  


## Modelos de datos

### Car
```prisma
model Car {
  id           String   @id @default(uuid())
  userId       String
  name         String   @db.Text
  cv           String   @db.Text
  transmission String   @db.Text
  people       String   @db.Text
  photo        String   @db.Text
  priceDay     String   @db.Text
  engine       String   @db.Text
  type         String   @db.Text
  isPublish    Boolean?
  orders       Order[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Order
```prisma
model Order {
  id           String   @id @default(uuid())
  carId        String   @db.Text
  carName      String   @db.Text
  userId       String   @db.Text
  orderDate    DateTime @default(now())
  orderEndDate DateTime @default(now())
  status       String   @db.Text
  totalAmount  String   @db.Text
  car          Car      @relation(fields: [carId], references: [id], onDelete: Cascade)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  @@index([carId])
  @@index([userId])
}
```

## Funcionalidades principales
- **Catálogo de coches**: Visualización y filtrado de vehículos disponibles
- **Sistema de reservas**: Proceso de reserva con selección de fechas
- **Panel de usuario**: Gestión de reservas y favoritos
- **Panel de administración**: Gestión de vehículos y análisis de datos
- **Autenticación**: Registro e inicio de sesión con Clerk
- **Diseño responsivo**: Experiencia óptima en dispositivos móviles y desktop

## Scripts disponibles
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter
- `npm run postinstall` - Genera el cliente de Prisma (automático después de instalar)

## Comandos útiles de Docker
- `docker-compose up -d` - Inicia los contenedores en segundo plano
- `docker-compose down` - Detiene los contenedores
- `docker-compose logs -f app` - Muestra los logs de la aplicación
- `docker-compose exec app /bin/sh` - Accede al shell del contenedor

## Contribución
1. Haz un fork del repositorio
2. Crea una rama para tu característica:
   ```sh
   git checkout -b feature/amazing-feature
   ```
3. Realiza tus cambios y haz commits:
   ```sh
   git commit -m 'Add some amazing feature'
   ```
4. Sube tus cambios:
   ```sh
   git push origin feature/amazing-feature
   ```
5. Abre un Pull Request

## Licencia
MIT

---
Desarrollado como proyecto para el curso de FullStack - Universidad Jorge Tadeo Lozano.
