# Decent Uptime

A decentralized uptime monitoring system built with modern web technologies and microservices architecture.

## 🏗️ Architecture

This project is a monorepo built with [Turborepo](https://turborepo.org/) that consists of multiple microservices and packages working together to provide a comprehensive uptime monitoring solution.

### Apps

- **`api`** - Main API service for uptime monitoring (Port: 12000)
- **`hub`** - Central coordination service (Port: 12001)
- **`validator`** - Validation and verification service (Port: 12003)
- **`web`** - Frontend React application built with Vite

### Packages

- **`@repo/db`** - Shared database layer with Prisma ORM
- **`@repo/ui`** - Shared React component library
- **`@repo/eslint-config`** - Shared ESLint configurations
- **`@repo/typescript-config`** - Shared TypeScript configurations
- **`@repo/server-utils`** - Shared server utilities

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm (recommended package manager)
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vishwas-babar/decentralized-uptime.git
cd decent_uptime
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up the database:

```bash
# Start PostgreSQL with Docker
docker run -d \
  --name uptime-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=uptime-db \
  -p 12325:5432 \
  postgres:latest
```

4. Configure environment variables:

```bash
# Copy environment template and configure
cp .env.example .env
# Set DATABASE_URL=postgresql://postgres:postgres@localhost:12325/uptime-db
```

## 🛠️ Development

### Start All Services

```bash
# Start all applications in development mode
pnpm dev

# Start specific service
pnpm dev --filter=api
pnpm dev --filter=hub
pnpm dev --filter=validator
pnpm dev --filter=web
```

### Service URLs

- **API Service**: http://localhost:12000
- **Hub Service**: http://localhost:12001
- **Validator Service**: http://localhost:12003
- **Web App**: http://localhost:5173

## 🔨 Build & Production

### Build All

```bash
# Build all apps and packages
pnpm build

# Build specific app
pnpm build --filter=api
```

### Start Production

```bash
# Start production builds
pnpm start

# Start specific service
pnpm start --filter=api
```

## 🧹 Code Quality & Linting

This project uses ESLint and Prettier for code quality and consistent formatting.

### Linting Commands

```bash
# Lint all projects
pnpm lint

# Lint specific project
pnpm lint --filter=api

# Auto-fix linting issues
pnpm lint:fix

# Auto-fix specific project
pnpm lint:fix --filter=web
```

### Formatting Commands

```bash
# Format all files with Prettier
pnpm format

# Check if files are properly formatted
pnpm format:check
```

### Type Checking

```bash
# Check TypeScript types across all projects
pnpm check-types

# Check specific project
pnpm check-types --filter=api
```

## 🗄️ Database

The project uses PostgreSQL with Prisma ORM for database management.

### Database Commands

```bash
# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Reset database
pnpm db:reset

# Open Prisma Studio
pnpm db:studio
```

### Database Connection

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:12325/uptime-db"
```

## 🔧 VS Code Integration

The project includes VS Code settings for optimal development experience:

- **Format on Save**: Automatically formats code using Prettier
- **ESLint Auto-fix**: Fixes ESLint issues on save
- **Type checking**: Real-time TypeScript error detection
- **Multi-root workspace**: Proper ESLint support across all packages

## 🎯 Available Scripts

### Root Level Commands

```bash
pnpm dev          # Start all services in development
pnpm build        # Build all packages and apps
pnpm start        # Start all production builds
pnpm lint         # Lint all projects
pnpm lint:fix     # Auto-fix linting issues
pnpm format       # Format all files
pnpm format:check # Check formatting
pnpm check-types  # TypeScript type checking
```

### Service-Specific Commands

```bash
# API Service
pnpm dev --filter=api
pnpm build --filter=api
pnpm start --filter=api

# Web App
pnpm dev --filter=web
pnpm build --filter=web
pnpm preview --filter=web

# Other services (hub, validator)
pnpm dev --filter=<service-name>
pnpm build --filter=<service-name>
```

## 🚀 Deployment

Each service can be deployed independently:

1. **Build the service**: `pnpm build --filter=<service>`
2. **Set environment variables** for production
3. **Start the service**: `pnpm start --filter=<service>`

## 🤝 Contributing

1. **Code Style**: Follow the ESLint and Prettier configurations
2. **Type Safety**: All code must be TypeScript with proper types
3. **Testing**: Write tests for new features
4. **Commits**: Use conventional commit messages

### Before Committing

```bash
# Run these commands to ensure code quality
pnpm lint:fix
pnpm format
pnpm check-types
pnpm build
```

## 📚 Tech Stack

- **Language**: TypeScript
- **Backend**: Express.js, Node.js
- **Frontend**: React, Vite
- **Database**: PostgreSQL, Prisma ORM
- **Monorepo**: Turborepo
- **Linting**: ESLint, Prettier
- **Package Manager**: pnpm
