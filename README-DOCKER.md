# ReservaLab - Docker Setup

Este guia explica como executar a aplicação ReservaLab usando Docker.

## Pré-requisitos

- Docker instalado
- Docker Compose instalado

## Estrutura dos Arquivos Docker

- `Dockerfile` - Imagem multi-stage para desenvolvimento e produção
- `docker-compose.yml` - Orquestração dos serviços
- `.env.docker` - Variáveis de ambiente de exemplo
- `docker-helper.sh` - Script helper para facilitar o uso

## Serviços Incluídos

### PostgreSQL
- **Porta**: 5432
- **Banco**: reservalab
- **Usuário**: reservalab
- **Senha**: reservalab123

### NestJS App (Desenvolvimento)
- **Porta**: 4000
- **Hot Reload**: Habilitado
- **Volume**: Código fonte mapeado

### NestJS App (Produção)
- **Porta**: 4001
- **Otimizada**: Build de produção

### PgAdmin (Opcional)
- **Porta**: 5050
- **Email**: admin@reservalab.com
- **Senha**: admin123

## Como Usar

### Método 1: Script Helper (Recomendado)

```bash
# Dar permissão de execução ao script
chmod +x docker-helper.sh

# Desenvolvimento
./docker-helper.sh dev

# Produção
./docker-helper.sh prod

# Apenas banco de dados
./docker-helper.sh db

# PgAdmin + Banco
./docker-helper.sh pgadmin

# Ver logs
./docker-helper.sh logs

# Parar tudo
./docker-helper.sh stop

# Limpar tudo
./docker-helper.sh clean
```

### Método 2: Docker Compose Direto

```bash
# Desenvolvimento
docker-compose up -d postgres
docker-compose up app-dev

# Produção
docker-compose --profile production up -d

# Apenas banco
docker-compose up -d postgres

# Com PgAdmin
docker-compose --profile tools up -d postgres pgadmin

# Parar
docker-compose down

# Limpar volumes
docker-compose down -v
```

## Migrações e Seeds

```bash
# Executar migrações
docker-compose exec app-dev npx prisma migrate deploy

# Executar seed
docker-compose exec app-dev npx prisma db seed

# Ou usando o helper
./docker-helper.sh migrate
./docker-helper.sh seed
```

## Variáveis de Ambiente

Copie `.env.docker` para `.env` e ajuste conforme necessário:

```bash
cp .env.docker .env
```

## Acessos

- **Aplicação (Dev)**: http://localhost:4000
- **Aplicação (Prod)**: http://localhost:4001
- **Banco PostgreSQL**: localhost:5432
- **PgAdmin**: http://localhost:5050

## Debugging

```bash
# Ver logs
docker-compose logs -f app-dev

# Entrar no container
docker-compose exec app-dev /bin/sh

# Verificar status
docker-compose ps
```

## Perfis de Execução

- **Padrão**: Apenas desenvolvimento e banco
- **production**: Inclui versão de produção
- **tools**: Inclui PgAdmin e outras ferramentas

## Troubleshooting

### Problema: Banco não conecta
```bash
# Verificar se o banco está rodando
docker-compose ps postgres

# Ver logs do banco
docker-compose logs postgres
```

### Problema: Prisma não encontra o banco
```bash
# Aguardar o banco inicializar completamente
./docker-helper.sh db
sleep 10
./docker-helper.sh dev
```

### Problema: Dependências desatualizadas
```bash
# Rebuild das imagens
./docker-helper.sh build
```
