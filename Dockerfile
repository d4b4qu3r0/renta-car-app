FROM node:18-alpine

WORKDIR /app

# Instalar dependencias necesarias 
RUN apk add --no-cache libc6-compat openssl

# Copiar package.json, package-lock.json Y el directorio prisma
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Instalar dependencias ignorando los errores de peer dependencies
RUN npm install --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Generar Prisma Client explícitamente
RUN npx prisma generate

# Crear archivo .env temporal para construcción
RUN echo "SKIP_TYPE_CHECK=true" > .env.production

# Construir la aplicación sin verificación de tipos
RUN npx next build --no-lint

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]