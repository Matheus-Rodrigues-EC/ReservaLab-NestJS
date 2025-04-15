# ⚠️ Este compose é para rodar o backend isoladamente em ambiente local.
# Para rodar toda a aplicação, use o docker-compose do repositório orquestrador.

# Etapa 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production && npm install --only=dev

COPY . .

# 🔧 Gera o Prisma Client antes de buildar o app
RUN npx prisma generate

# 🔨 Compila a aplicação
RUN npm run build

# Etapa 2: Final
FROM node:20-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production && npm install --only=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

# 🔧 Garante que Prisma Client esteja gerado
RUN npx prisma generate

CMD ["node", "dist/main"]
