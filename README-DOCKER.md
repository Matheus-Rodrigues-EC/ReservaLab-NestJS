# Configuração Docker - ReservaLab NestJS

Este projeto inclui configuração Docker completa para desenvolvimento e produção.

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🚀 Executando em Produção

### 1. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/reservalab?schema=public"
JWT_SECRET="seu-super-secreto-jwt-key-mude-em-producao"
NODE_ENV="production"
PORT=4000
```

### 2. Execute os containers

```bash
# Subir todos os serviços
docker-compose up -d

# Ou apenas a aplicação e banco
docker-compose up -d app postgres
```

### 3. Verifique os logs

```bash
# Logs da aplicação
docker-compose logs -f app

# Logs do banco
docker-compose logs -f postgres
```

## 🛠️ Executando em Desenvolvimento

### 1. Configure o ambiente de desenvolvimento

```bash
cp .env.example .env.dev
```

Edite `.env.dev` se necessário.

### 2. Execute em modo desenvolvimento

```bash
# Subir com hot reload
docker-compose -f docker-compose.dev.yml up -d

# Ou apenas o banco para desenvolvimento local
docker-compose -f docker-compose.dev.yml up -d postgres
```

### 3. Executar aplicação localmente (opcional)

Se preferir executar a aplicação localmente e apenas o banco no Docker:

```bash
# Subir apenas o PostgreSQL
docker-compose -f docker-compose.dev.yml up -d postgres

# Configurar DATABASE_URL para localhost
export DATABASE_URL="postgresql://postgres:postgres@localhost:5433/reservalab_dev?schema=public"

# Executar migrações
npx prisma migrate deploy

# Executar seed (opcional)
npx prisma db seed

# Iniciar aplicação
npm run start:dev
```

## 📊 Acessando os Serviços

### Aplicação

- **URL**: http://localhost:4000
- **Ambiente**: Produção/Desenvolvimento

### PgAdmin (Administração do Banco)

- **URL**: http://localhost:8080
- **Email**: admin@reservalab.com
- **Senha**: admin

#### Configurando conexão no PgAdmin:

1. Acesse http://localhost:8080
2. Login com as credenciais acima
3. Adicionar novo servidor:
   - **Name**: ReservaLab
   - **Host**: postgres (nome do container)
   - **Port**: 5432
   - **Username**: postgres
   - **Password**: postgres
   - **Database**: reservalab (produção) ou reservalab_dev (desenvolvimento)

## 🗃️ Comandos Úteis

### Gerenciamento de Containers

```bash
# Parar todos os containers
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados do banco)
docker-compose down -v

# Reconstruir as imagens
docker-compose build --no-cache

# Ver logs em tempo real
docker-compose logs -f
```

### Prisma Commands

```bash
# Executar migrações manualmente
docker-compose exec app npx prisma migrate deploy

# Executar seed
docker-compose exec app npx prisma db seed

# Gerar cliente Prisma
docker-compose exec app npx prisma generate

# Abrir Prisma Studio
docker-compose exec app npx prisma studio
```

### Acesso ao Container

```bash
# Acessar shell do container da aplicação
docker-compose exec app sh

# Acessar PostgreSQL diretamente
docker-compose exec postgres psql -U postgres -d reservalab
```

## 🔄 Atualizando a Aplicação

```bash
# Parar containers
docker-compose down

# Atualizar código (git pull, etc.)

# Reconstruir e subir
docker-compose up -d --build
```

## 🐛 Solução de Problemas

### Problema: Container não consegue conectar ao banco

**Solução**: Verifique se o PostgreSQL está saudável:

```bash
docker-compose logs postgres
docker-compose exec postgres pg_isready -U postgres
```

### Problema: Erro de migração do Prisma

**Solução**: Execute as migrações manualmente:

```bash
docker-compose exec app npx prisma migrate deploy
```

### Problema: Porta já em uso

**Solução**: Altere as portas no `docker-compose.yml` ou pare o serviço que está usando a porta:

```bash
# Verificar o que está usando a porta
netstat -ano | findstr :4000

# No Windows, matar processo
taskkill /PID <PID> /F
```

### Problema: Permissões no Linux/macOS

**Solução**: Ajuste as permissões do script:

```bash
chmod +x scripts/entrypoint.sh
```

## 📝 Estrutura dos Arquivos Docker

```
├── Dockerfile              # Imagem de produção
├── Dockerfile.dev          # Imagem de desenvolvimento
├── docker-compose.yml      # Orquestração para produção
├── docker-compose.dev.yml  # Orquestração para desenvolvimento
├── .dockerignore           # Arquivos ignorados no build
├── .env.example            # Exemplo de variáveis de ambiente
└── scripts/
    └── entrypoint.sh       # Script de inicialização
```

## 🔒 Segurança

### Para Produção:

1. **Altere senhas padrão**:

   - Senha do PostgreSQL
   - JWT_SECRET
   - Credenciais do PgAdmin

2. **Use HTTPS** em produção

3. **Configure firewall** adequadamente

4. **Use volumes nomeados** para persistência de dados

5. **Considere usar secrets** do Docker Swarm ou Kubernetes para senhas
