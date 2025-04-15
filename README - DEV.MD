# 🧠 ReservaLab - Backend (NestJS + Prisma)

Este é o backend da aplicação ReservaLab, feito com NestJS, Prisma e PostgreSQL.

---

## ▶️ Rodar localmente com Docker

Para rodar o backend e o banco de dados usando Docker, execute:

```bash
docker-compose -f docker-compose.local.yml up --build -d
```

A aplicação estará acessível em http://localhost:3000.

## 🐘 Banco de dados

A configuração padrão cria um banco de dados PostgreSQL local:

---

- Host: localhost
- Porta: 5432
- Usuário: postgres
- Senha: ReservaLabPostgreSQL
- Banco: ReservaLab

## ⚙️ Comandos úteis

```bash
# Executar as migrations manualmente
npx prisma migrate dev

# Gerar o Prisma Client
npx prisma generate
```

## 🔗 Orquestração completa
Se você quiser rodar o sistema completo (backend + frontend + banco), use o repositório:

👉 [ReservaLab-FullStack](https://github.com/Matheus-Rodrigues-EC/ReservaLab-FullStack)

```bash
docker-compose up --build -d
```