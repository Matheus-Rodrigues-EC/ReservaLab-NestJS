#!/bin/bash

# Aguardar o banco de dados
echo "Aguardando banco de dados..."
wait-for-it reservalab-backend-postgres:5432 --timeout=30 --strict -- echo "Banco de dados pronto"

# Rodar as migrações do Prisma
npx prisma migrate deploy

# Iniciar a aplicação
npm run start:dev
