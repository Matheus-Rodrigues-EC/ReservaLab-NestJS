# Production

## 🚀 Para ambiente de produção (prod)


### 📁 Arquivos envolvidos:
Dockerfile ✅ (com stages e Prisma deploy)
- docker-compose.prod.yml ✅

### 📦 1. Baixar e Gerar a imagem de produção:
- docker pull mattrodrigues/reservalab-backend:latest
- docker-compose -f docker-compose.prod.yml build

### 🚀 2. Subir os containers:
- docker-compose -f docker-compose.prod.yml up -d

#### Isso vai:
1. Compilar a aplicação (nest build)
2. Gerar e aplicar migrations via prisma migrate deploy
3. Rodar o app com node dist/main

deixar tudo rodando em background (-d)

### 🔍 3. Ver logs:
- docker logs -f ReservaLab-backend-prod

### 🧼 4. Derrubar os containers:
- docker-compose -f docker-compose.prod.yml down

#### Rebuild forçado (ex: após código novo):
- docker-compose -f docker-compose.prod.yml up --build
