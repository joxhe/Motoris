FROM node:18-alpine

# Instalar wget para health checks
RUN apk add --no-cache wget

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["npm", "start"]