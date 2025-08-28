# Dockerfile para aplicação NestJS com PrismaORM

# Estágio de build
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Gerar Prisma Client
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS production

# Instalar dumb-init e netcat para gerenciamento de processos e verificação de conectividade
RUN apk add --no-cache dumb-init netcat-openbsd

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências do estágio de build
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma

# Copiar arquivos necessários
COPY --chown=nestjs:nodejs package*.json ./
COPY --chown=nestjs:nodejs scripts/entrypoint.sh ./scripts/

# Tornar o script executável
RUN chmod +x ./scripts/entrypoint.sh

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 4000

# Definir variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=4000

# Comando de entrada
ENTRYPOINT ["dumb-init", "--"]
CMD ["./scripts/entrypoint.sh"]
