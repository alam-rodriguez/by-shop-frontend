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

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
