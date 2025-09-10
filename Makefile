# Makefile para facilitar comandos Docker do ReservaLab

# Cores para output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

.PHONY: help build up down logs shell db-shell dev dev-down prod prod-down clean reset

# Comando padrão
help: ## Mostra esta ajuda
	@echo "$(GREEN)ReservaLab - Comandos Docker$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

# Comandos de Desenvolvimento
dev: ## Subir ambiente de desenvolvimento
	@echo "$(GREEN)Subindo ambiente de desenvolvimento...$(NC)"
	docker-compose -f docker-compose.dev.yml up -d
	@echo "$(GREEN)Ambiente disponível em: http://localhost:4000$(NC)"
	@echo "$(GREEN)PgAdmin disponível em: http://localhost:8080$(NC)"

dev-build: ## Construir e subir ambiente de desenvolvimento
	@echo "$(GREEN)Construindo e subindo ambiente de desenvolvimento...$(NC)"
	docker-compose -f docker-compose.dev.yml up -d --build

dev-down: ## Parar ambiente de desenvolvimento
	@echo "$(YELLOW)Parando ambiente de desenvolvimento...$(NC)"
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## Ver logs do ambiente de desenvolvimento
	docker-compose -f docker-compose.dev.yml logs -f

# Comandos de Produção
prod: ## Subir ambiente de produção
	@echo "$(GREEN)Subindo ambiente de produção...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Ambiente disponível em: http://localhost:4000$(NC)"

prod-build: ## Construir e subir ambiente de produção
	@echo "$(GREEN)Construindo e subindo ambiente de produção...$(NC)"
	docker-compose up -d --build

prod-down: ## Parar ambiente de produção
	@echo "$(YELLOW)Parando ambiente de produção...$(NC)"
	docker-compose down

prod-logs: ## Ver logs do ambiente de produção
	docker-compose logs -f

# Comandos Gerais
build: ## Construir imagens Docker
	@echo "$(GREEN)Construindo imagens...$(NC)"
	docker-compose build --no-cache

up: ## Subir containers (produção por padrão)
	docker-compose up -d

down: ## Parar containers
	docker-compose down

logs: ## Ver logs
	docker-compose logs -f

# Comandos de Banco de Dados
migrate: ## Executar migrações do Prisma
	@echo "$(GREEN)Executando migrações...$(NC)"
	docker-compose exec app npx prisma migrate deploy

migrate-dev: ## Executar migrações do Prisma (desenvolvimento)
	@echo "$(GREEN)Executando migrações (dev)...$(NC)"
	docker-compose -f docker-compose.dev.yml exec app npx prisma migrate deploy

seed: ## Executar seed do banco
	@echo "$(GREEN)Executando seed...$(NC)"
	docker-compose exec app npx prisma db seed

seed-dev: ## Executar seed do banco (desenvolvimento)
	@echo "$(GREEN)Executando seed (dev)...$(NC)"
	docker-compose -f docker-compose.dev.yml exec app npx prisma db seed

generate: ## Gerar cliente Prisma
	@echo "$(GREEN)Gerando cliente Prisma...$(NC)"
	docker-compose exec app npx prisma generate

studio: ## Abrir Prisma Studio
	@echo "$(GREEN)Abrindo Prisma Studio...$(NC)"
	docker-compose exec app npx prisma studio

# Comandos de Shell
shell: ## Acessar shell do container da aplicação
	docker-compose exec app sh

shell-dev: ## Acessar shell do container de desenvolvimento
	docker-compose -f docker-compose.dev.yml exec app sh

db-shell: ## Acessar shell do PostgreSQL
	docker-compose exec postgres psql -U postgres -d reservalab

db-shell-dev: ## Acessar shell do PostgreSQL (desenvolvimento)
	docker-compose -f docker-compose.dev.yml exec postgres psql -U postgres -d reservalab_dev

# Comandos de Limpeza
clean: ## Limpar containers, redes e imagens não utilizadas
	@echo "$(YELLOW)Limpando containers, redes e imagens não utilizadas...$(NC)"
	docker system prune -f

clean-all: ## Limpar tudo (CUIDADO: remove volumes)
	@echo "$(RED)Limpando tudo (volumes inclusos)...$(NC)"
	@read -p "Tem certeza? Isso irá remover todos os dados do banco! (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		docker-compose down -v; \
		docker-compose -f docker-compose.dev.yml down -v; \
		docker system prune -af --volumes; \
	else \
		echo "Operação cancelada."; \
	fi

reset: ## Reset completo do ambiente
	@echo "$(YELLOW)Resetando ambiente...$(NC)"
	docker-compose down
	docker-compose -f docker-compose.dev.yml down
	docker-compose build --no-cache
	docker-compose -f docker-compose.dev.yml build --no-cache

# Comandos de Status
status: ## Ver status dos containers
	@echo "$(GREEN)Status dos containers:$(NC)"
	docker-compose ps
	@echo ""
	@echo "$(GREEN)Status dos containers de desenvolvimento:$(NC)"
	docker-compose -f docker-compose.dev.yml ps

# Comandos de Teste
test: ## Executar testes
	docker-compose exec app npm test

test-e2e: ## Executar testes E2E
	docker-compose exec app npm run test:e2e

test-cov: ## Executar testes com coverage
	docker-compose exec app npm run test:cov
