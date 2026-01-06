# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --legacy-peer-deps

# COPY . .

# # Cambia dueño de la carpeta a usuario node
# RUN chown -R node:node /app

# # Usa usuario node para evitar problemas de permisos
# USER node

# EXPOSE 3000

# CMD ["npm", "run", "dev"]

# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./
# ENV NODE_OPTIONS="--max-old-space-size=1024"
# RUN npm install --legacy-peer-deps

# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "run", "start"]


# FROM node:20-alpine

# WORKDIR /app

# # Copia solo las dependencias primero (para cache)
# COPY package*.json ./

# # Instala dependencias con compatibilidad de peer deps
# RUN npm install --legacy-peer-deps

# # Copia el resto del código
# COPY . .

# # Expone el puerto del servidor de Next.js
# EXPOSE 3000

# # Usa el modo desarrollo
# CMD ["npm", "run", "dev"]

FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -rf .next
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]

