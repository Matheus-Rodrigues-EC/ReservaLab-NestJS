#!/bin/bash

# Script para facilitar o uso do Docker Compose

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir ajuda
show_help() {
    echo -e "${BLUE}ReservaLab Docker Helper${NC}"
    echo ""
    echo "Uso: ./docker-helper.sh [COMANDO]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  dev        - Inicia a aplicação em modo desenvolvimento"
    echo "  prod       - Inicia a aplicação em modo produção"
    echo "  stop       - Para todos os containers"
    echo "  restart    - Reinicia todos os containers"
    echo "  logs       - Mostra os logs da aplicação"
    echo "  db         - Inicia apenas o banco de dados"
    echo "  pgadmin    - Inicia o PgAdmin junto com o banco"
    echo "  clean      - Remove todos os containers e volumes"
    echo "  build      - Reconstroi as imagens Docker"
    echo "  migrate    - Executa as migrações do Prisma"
    echo "  seed       - Executa o seed do banco de dados"
    echo "  shell      - Abre um shell no container da aplicação"
    echo "  help       - Mostra esta ajuda"
    echo ""
}

# Função para verificar se o Docker está rodando
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}Erro: Docker não está rodando${NC}"
        exit 1
    fi
}

# Verificar se o Docker está rodando
check_docker

# Processar comandos
case "$1" in
    "dev")
        echo -e "${GREEN}Iniciando aplicação em modo desenvolvimento...${NC}"
        docker-compose up -d postgres
        echo -e "${YELLOW}Aguardando banco de dados inicializar...${NC}"
        sleep 10
        docker-compose up app-dev
        ;;
    "prod")
        echo -e "${GREEN}Iniciando aplicação em modo produção...${NC}"
        docker-compose --profile production up -d
        ;;
    "stop")
        echo -e "${YELLOW}Parando todos os containers...${NC}"
        docker-compose down
        ;;
    "restart")
        echo -e "${YELLOW}Reiniciando containers...${NC}"
        docker-compose restart
        ;;
    "logs")
        echo -e "${BLUE}Mostrando logs da aplicação...${NC}"
        docker-compose logs -f app-dev
        ;;
    "db")
        echo -e "${GREEN}Iniciando apenas o banco de dados...${NC}"
        docker-compose up -d postgres
        ;;
    "pgadmin")
        echo -e "${GREEN}Iniciando banco de dados e PgAdmin...${NC}"
        docker-compose --profile tools up -d postgres pgadmin
        echo -e "${BLUE}PgAdmin disponível em: http://localhost:5050${NC}"
        echo -e "${BLUE}Email: admin@reservalab.com${NC}"
        echo -e "${BLUE}Senha: admin123${NC}"
        ;;
    "clean")
        echo -e "${RED}Removendo todos os containers e volumes...${NC}"
        docker-compose down -v
        docker system prune -f
        ;;
    "build")
        echo -e "${GREEN}Reconstruindo imagens Docker...${NC}"
        docker-compose build --no-cache
        ;;
    "migrate")
        echo -e "${GREEN}Executando migrações do Prisma...${NC}"
        docker-compose exec app-dev npx prisma migrate deploy
        ;;
    "seed")
        echo -e "${GREEN}Executando seed do banco de dados...${NC}"
        docker-compose exec app-dev npx prisma db seed
        ;;
    "shell")
        echo -e "${BLUE}Abrindo shell no container da aplicação...${NC}"
        docker-compose exec app-dev /bin/sh
        ;;
    "help" | "")
        show_help
        ;;
    *)
        echo -e "${RED}Comando não reconhecido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac
