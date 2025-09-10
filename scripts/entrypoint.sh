#!/bin/sh

# Função para aguardar o banco de dados
wait_for_database() {
    echo "Aguardando banco de dados PostgreSQL..."
    
    until nc -z postgres 5432; do
        echo "PostgreSQL não está pronto - aguardando..."
        sleep 2
    done
    
    echo "PostgreSQL está pronto!"
}

# Aguardar o banco de dados
wait_for_database

# Gerar Prisma Client (caso necessário)
echo "Gerando Prisma Client..."
npx prisma generate

# Executar migrações do Prisma
echo "Executando migrações do Prisma..."
npx prisma migrate deploy

# Executar seed (opcional)
if [ "$PRISMA_SEED" = "true" ]; then
    echo "Executando seed do banco de dados..."
    npx prisma db seed
fi

# Iniciar a aplicação
echo "Iniciando aplicação NestJS..."
exec node dist/main
