# ========== ETAPA 1: BUILD ==========
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ========== ETAPA 2: PRODUCTION ==========
FROM nginx:alpine

# Copiar el build de React al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]