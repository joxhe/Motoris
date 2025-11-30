FROM node:18-alpine

RUN apk add --no-cache openssl wget

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 3000

CMD sh -c "echo 'Esperando base de datos...' && sleep 10 && echo 'Aplicando schema...' && npx prisma db push --schema=./prisma/schema.prisma --accept-data-loss && echo 'Iniciando servidor...' && npm start"