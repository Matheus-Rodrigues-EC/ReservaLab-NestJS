# Development
## 🚧 Para ambiente de desenvolvimento (dev)

### 📦 1. Baixar e Gerar (buildar) as imagens:
- docker pull mattrodriguesec/reservalab-backend-dev:latest
- docker-compose -f docker-compose.dev.yml build

### 🚀 2. Subir os containers:
- docker-compose -f docker-compose.dev.yml up

#### Isso vai:
1. Subir o Postgres
2. Rodar prisma generate + prisma migrate dev
3. Iniciar o NestJS com npm run start:dev
4. Aplicar o volume local para live reload

### 🧼 3. Derrubar os containers:
- docker-compose -f docker-compose.dev.yml down

(opcional: --volumes se quiser remover os dados do banco)