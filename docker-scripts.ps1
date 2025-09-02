# Scripts PowerShell para Docker - ReservaLab NestJS
# Use: .\docker-scripts.ps1 <comando>

param(
    [Parameter(Mandatory=$true)]
    [string]$Command
)

function Write-ColoredText {
    param(
        [string]$Text,
        [string]$Color = "White"
    )
    Write-Host $Text -ForegroundColor $Color
}

function Show-Help {
    Write-ColoredText "ReservaLab - Comandos Docker" "Green"
    Write-Host ""
    Write-ColoredText "Comandos de Desenvolvimento:" "Yellow"
    Write-Host "  dev              - Subir ambiente de desenvolvimento"
    Write-Host "  dev-build        - Construir e subir ambiente de desenvolvimento"
    Write-Host "  dev-down         - Parar ambiente de desenvolvimento"
    Write-Host "  dev-logs         - Ver logs do ambiente de desenvolvimento"
    Write-Host ""
    Write-ColoredText "Comandos de Produção:" "Yellow"
    Write-Host "  prod             - Subir ambiente de produção"
    Write-Host "  prod-build       - Construir e subir ambiente de produção"
    Write-Host "  prod-down        - Parar ambiente de produção"
    Write-Host "  prod-logs        - Ver logs do ambiente de produção"
    Write-Host ""
    Write-ColoredText "Comandos de Banco de Dados:" "Yellow"
    Write-Host "  migrate          - Executar migrações do Prisma"
    Write-Host "  migrate-dev      - Executar migrações do Prisma (desenvolvimento)"
    Write-Host "  seed             - Executar seed do banco"
    Write-Host "  seed-dev         - Executar seed do banco (desenvolvimento)"
    Write-Host "  generate         - Gerar cliente Prisma"
    Write-Host "  studio           - Abrir Prisma Studio"
    Write-Host ""
    Write-ColoredText "Comandos de Shell:" "Yellow"
    Write-Host "  shell            - Acessar shell do container da aplicação"
    Write-Host "  shell-dev        - Acessar shell do container de desenvolvimento"
    Write-Host "  db-shell         - Acessar shell do PostgreSQL"
    Write-Host "  db-shell-dev     - Acessar shell do PostgreSQL (desenvolvimento)"
    Write-Host ""
    Write-ColoredText "Comandos Gerais:" "Yellow"
    Write-Host "  build            - Construir imagens Docker"
    Write-Host "  up               - Subir containers (produção)"
    Write-Host "  down             - Parar containers"
    Write-Host "  logs             - Ver logs"
    Write-Host "  status           - Ver status dos containers"
    Write-Host "  clean            - Limpar containers, redes e imagens não utilizadas"
    Write-Host "  reset            - Reset completo do ambiente"
    Write-Host ""
    Write-ColoredText "Exemplos de uso:" "Cyan"
    Write-Host "  .\docker-scripts.ps1 dev"
    Write-Host "  .\docker-scripts.ps1 prod-build"
    Write-Host "  .\docker-scripts.ps1 migrate"
}

switch ($Command.ToLower()) {
    "help" { Show-Help }
    "h" { Show-Help }
    
    # Comandos de Desenvolvimento
    "dev" {
        Write-ColoredText "Subindo ambiente de desenvolvimento..." "Green"
        docker-compose -f docker-compose.dev.yml up -d
        Write-ColoredText "Ambiente disponível em: http://localhost:4000" "Green"
        Write-ColoredText "PgAdmin disponível em: http://localhost:8080" "Green"
    }
    
    "dev-build" {
        Write-ColoredText "Construindo e subindo ambiente de desenvolvimento..." "Green"
        docker-compose -f docker-compose.dev.yml up -d --build
    }
    
    "dev-down" {
        Write-ColoredText "Parando ambiente de desenvolvimento..." "Yellow"
        docker-compose -f docker-compose.dev.yml down
    }
    
    "dev-logs" {
        docker-compose -f docker-compose.dev.yml logs -f
    }
    
    # Comandos de Produção
    "prod" {
        Write-ColoredText "Subindo ambiente de produção..." "Green"
        docker-compose up -d
        Write-ColoredText "Ambiente disponível em: http://localhost:4000" "Green"
    }
    
    "prod-build" {
        Write-ColoredText "Construindo e subindo ambiente de produção..." "Green"
        docker-compose up -d --build
    }
    
    "prod-down" {
        Write-ColoredText "Parando ambiente de produção..." "Yellow"
        docker-compose down
    }
    
    "prod-logs" {
        docker-compose logs -f
    }
    
    # Comandos Gerais
    "build" {
        Write-ColoredText "Construindo imagens..." "Green"
        docker-compose build --no-cache
    }
    
    "up" {
        docker-compose up -d
    }
    
    "down" {
        docker-compose down
    }
    
    "logs" {
        docker-compose logs -f
    }
    
    # Comandos de Banco de Dados
    "migrate" {
        Write-ColoredText "Executando migrações..." "Green"
        docker-compose exec app npx prisma migrate deploy
    }
    
    "migrate-dev" {
        Write-ColoredText "Executando migrações (dev)..." "Green"
        docker-compose -f docker-compose.dev.yml exec app npx prisma migrate deploy
    }
    
    "seed" {
        Write-ColoredText "Executando seed..." "Green"
        docker-compose exec app npx prisma db seed
    }
    
    "seed-dev" {
        Write-ColoredText "Executando seed (dev)..." "Green"
        docker-compose -f docker-compose.dev.yml exec app npx prisma db seed
    }
    
    "generate" {
        Write-ColoredText "Gerando cliente Prisma..." "Green"
        docker-compose exec app npx prisma generate
    }
    
    "studio" {
        Write-ColoredText "Abrindo Prisma Studio..." "Green"
        docker-compose exec app npx prisma studio
    }
    
    # Comandos de Shell
    "shell" {
        docker-compose exec app sh
    }
    
    "shell-dev" {
        docker-compose -f docker-compose.dev.yml exec app sh
    }
    
    "db-shell" {
        docker-compose exec postgres psql -U postgres -d reservalab
    }
    
    "db-shell-dev" {
        docker-compose -f docker-compose.dev.yml exec postgres psql -U postgres -d reservalab_dev
    }
    
    # Comandos de Status
    "status" {
        Write-ColoredText "Status dos containers:" "Green"
        docker-compose ps
        Write-Host ""
        Write-ColoredText "Status dos containers de desenvolvimento:" "Green"
        docker-compose -f docker-compose.dev.yml ps
    }
    
    # Comandos de Limpeza
    "clean" {
        Write-ColoredText "Limpando containers, redes e imagens não utilizadas..." "Yellow"
        docker system prune -f
    }
    
    "reset" {
        Write-ColoredText "Resetando ambiente..." "Yellow"
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
        docker-compose build --no-cache
        docker-compose -f docker-compose.dev.yml build --no-cache
    }
    
    # Comandos de Teste
    "test" {
        docker-compose exec app npm test
    }
    
    "test-e2e" {
        docker-compose exec app npm run test:e2e
    }
    
    "test-cov" {
        docker-compose exec app npm run test:cov
    }
    
    default {
        Write-ColoredText "Comando não reconhecido: $Command" "Red"
        Write-Host ""
        Show-Help
    }
}
