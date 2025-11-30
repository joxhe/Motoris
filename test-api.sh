#!/bin/bash

echo "🧪 PROBANDO MOTORIS API - CECAR 2025"
echo "===================================="
echo ""

API_URL="http://localhost:3000"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para probar endpoints
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "${YELLOW}🔍 Probando: $description${NC}"
    echo "   $method $endpoint"
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "   ${GREEN}✅ OK ($http_code)${NC}"
        echo "   Respuesta: $body"
    else
        echo -e "   ${RED}❌ ERROR ($http_code)${NC}"
        echo "   Respuesta: $body"
    fi
    echo ""
}

# Esperar a que los servicios estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 5

# 1. Health Check del Gateway
test_endpoint "GET" "/health" "" "Health Check del API Gateway"

# 2. Raíz del Gateway
test_endpoint "GET" "/" "" "Información del Gateway"

# 3. Registrar usuario
echo "========================================="
echo "AUTH SERVICE"
echo "========================================="
test_endpoint "POST" "/auth/register" '{
  "email": "admin@motoris.com",
  "password": "123456",
  "name": "Admin MOTORIS",
  "role": "admin"
}' "Registrar nuevo usuario"

# 4. Login
test_endpoint "POST" "/auth/login" '{
  "email": "admin@motoris.com",
  "password": "123456"
}' "Login de usuario"

# Guardar el token (opcional, para pruebas futuras)
TOKEN=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@motoris.com","password":"123456"}' \
    | grep -o '"token":"[^"]*' | sed 's/"token":"//')

if [ ! -z "$TOKEN" ]; then
    echo -e "${GREEN}🔑 Token guardado: ${TOKEN:0:20}...${NC}"
    echo ""
fi

# 5. Customer Service
echo "========================================="
echo "CUSTOMER SERVICE"
echo "========================================="
test_endpoint "POST" "/customers" '{
  "name": "Juan Pérez",
  "phone": "3001234567",
  "email": "juan@email.com",
  "address": "Calle 123 #45-67"
}' "Crear cliente"

test_endpoint "GET" "/customers" "" "Listar todos los clientes"

# 6. Vehicle Service
echo "========================================="
echo "VEHICLE SERVICE"
echo "========================================="
test_endpoint "POST" "/vehicles" '{
  "plate": "ABC123",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "customerId": "temp-customer-id"
}' "Crear vehículo"

test_endpoint "GET" "/vehicles" "" "Listar todos los vehículos"

# 7. Appointment Service
echo "========================================="
echo "APPOINTMENT SERVICE"
echo "========================================="
test_endpoint "POST" "/appointments" '{
  "vehicleId": "temp-vehicle-id",
  "customerId": "temp-customer-id",
  "date": "2025-12-01T10:00:00Z",
  "description": "Mantenimiento preventivo"
}' "Crear cita"

test_endpoint "GET" "/appointments" "" "Listar todas las citas"

# 8. Inventory Service
echo "========================================="
echo "INVENTORY SERVICE"
echo "========================================="
test_endpoint "POST" "/inventory" '{
  "name": "Filtro de aceite",
  "code": "FO-001",
  "stock": 50,
  "price": 25000,
  "supplier": "Repuestos XYZ"
}' "Agregar repuesto"

test_endpoint "GET" "/inventory" "" "Listar inventario"

# 9. Billing Service
echo "========================================="
echo "BILLING SERVICE"
echo "========================================="
test_endpoint "POST" "/billing" '{
  "appointmentId": "temp-appointment-id",
  "total": 150000,
  "status": "pending"
}' "Crear factura"

test_endpoint "GET" "/billing" "" "Listar facturas"

echo "========================================="
echo -e "${GREEN}✅ PRUEBAS COMPLETADAS${NC}"
echo "========================================="