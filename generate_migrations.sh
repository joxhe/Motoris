#!/bin/bash

echo "🔄 Generando migraciones de Prisma para cada servicio..."

# Auth Service
echo "📦 Auth Service..."
cd auth-service
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
cd ..

# Customer Service
echo "📦 Customer Service..."
cd customer-service
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
cd ..

# Vehicle Service
echo "📦 Vehicle Service..."
cd vehicle-service
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
cd ..

# Appointment Service
echo "📦 Appointment Service..."
cd appointment-service
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
cd ..

# Inventory Service
echo "📦 Inventory Service..."
cd inventory-service
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
cd ..

# Billing Service
echo "📦 Billing Service..."
cd billing-service
npx prisma migrate dev --name init --schema=./prisma/schema.prisma
cd ..

echo "✅ Migraciones generadas correctamente"