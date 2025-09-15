# Decent Uptime - Database Makefile
# This Makefile provides convenient commands for database management

# Variables
DB_NAME = uptime-db
DB_USER = postgres
DB_PASSWORD = postgres
DB_PORT = 12325
DB_HOST = localhost
DATABASE_URL = postgresql://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)

# Docker container name
POSTGRES_CONTAINER = uptime-postgres

# Colors for output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

.PHONY: help db-init db-start db-stop db-clean db-migrate db-reset db-studio db-generate

# Default target
help:
	@echo "$(GREEN)Decent Uptime - Database Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Commands:$(NC)"
	@echo "  db-init      - Complete database setup (create container + migrate)"
	@echo "  db-start     - Start existing PostgreSQL container"
	@echo "  db-stop      - Stop PostgreSQL container"
	@echo "  db-clean     - Stop and remove PostgreSQL container"
	@echo "  db-migrate   - Run database migrations"
	@echo "  db-reset     - Reset database (careful!)"
	@echo "  db-generate  - Generate Prisma client"
	@echo "  db-studio    - Open Prisma Studio"

# All-in-one database initialization
db-init: check-docker
	@echo "$(GREEN)🚀 Initializing database...$(NC)"
	@echo "$(YELLOW)Step 1: Setting up PostgreSQL container...$(NC)"
	@docker run -d \
		--name $(POSTGRES_CONTAINER) \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
		-e POSTGRES_DB=$(DB_NAME) \
		-p $(DB_PORT):5432 \
		postgres:15-alpine || \
		(docker start $(POSTGRES_CONTAINER) && echo "$(YELLOW)Using existing container$(NC)")
	@echo "$(YELLOW)Step 2: Waiting for database to be ready...$(NC)"
	@sleep 8
	@echo "$(YELLOW)Step 3: Generating Prisma client...$(NC)"
	@cd packages/db && DATABASE_URL=$(DATABASE_URL) pnpm prisma generate
	@echo "$(YELLOW)Step 4: Running migrations...$(NC)"
	@cd packages/db && DATABASE_URL=$(DATABASE_URL) pnpm prisma migrate dev --name init
	@echo "$(GREEN)✅ Database initialization complete!$(NC)"
	@echo ""
	@echo "$(YELLOW)Database Info:$(NC)"
	@echo "  URL: $(DATABASE_URL)"
	@echo "  Container: $(POSTGRES_CONTAINER)"
	@echo "  Studio: Run 'make db-studio' to open Prisma Studio"

db-start:
	@echo "$(GREEN)Starting PostgreSQL container...$(NC)"
	@docker start $(POSTGRES_CONTAINER) || (echo "$(RED)Container doesn't exist. Run 'make db-setup' first.$(NC)" && exit 1)
	@echo "$(GREEN)PostgreSQL started!$(NC)"

db-stop:
	@echo "$(YELLOW)Stopping PostgreSQL container...$(NC)"
	@docker stop $(POSTGRES_CONTAINER) || echo "$(YELLOW)Container not running$(NC)"

db-clean:
	@echo "$(RED)Stopping and removing PostgreSQL container...$(NC)"
	@docker stop $(POSTGRES_CONTAINER) 2>/dev/null || true
	@docker rm $(POSTGRES_CONTAINER) 2>/dev/null || true
	@echo "$(GREEN)Database container cleaned!$(NC)"

db-migrate:
	@echo "$(GREEN)Running database migrations...$(NC)"
	@cd packages/db && DATABASE_URL=$(DATABASE_URL) pnpm prisma migrate dev
	@echo "$(GREEN)Migrations complete!$(NC)"

db-reset:
	@echo "$(RED)⚠️  This will reset your database and delete all data!$(NC)"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	@echo "$(YELLOW)Resetting database...$(NC)"
	@cd packages/db && DATABASE_URL=$(DATABASE_URL) pnpm prisma migrate reset --force
	@echo "$(GREEN)Database reset complete!$(NC)"

db-generate:
	@echo "$(GREEN)Generating Prisma client...$(NC)"
	@cd packages/db && DATABASE_URL=$(DATABASE_URL) pnpm prisma generate
	@echo "$(GREEN)Prisma client generated!$(NC)"

db-studio:
	@echo "$(GREEN)Opening Prisma Studio...$(NC)"
	@echo "$(YELLOW)Prisma Studio will open at http://localhost:5555$(NC)"
	@cd packages/db && DATABASE_URL=$(DATABASE_URL) pnpm prisma studio

# Check if Docker is running
check-docker:
	@docker info >/dev/null 2>&1 || (echo "$(RED)Docker is not running. Please start Docker first.$(NC)" && exit 1)
