# Hub Service

The Hub service is the central coordinator for the decentralized uptime monitoring system. It manages validator connections, distributes monitoring tasks, and handles result verification.

## Architecture

The service has been refactored into a modular architecture with clear separation of concerns:

### File Structure

```
src/
├── index.ts                    # Entry point
├── server.ts                   # Main server setup and coordination
├── config.ts                   # Configuration management
├── exports.ts                  # Public API exports
├── types/
│   └── index.ts               # TypeScript type definitions
├── handlers/
│   ├── websocketHandlers.ts   # WebSocket event handlers
│   └── signupHandler.ts       # Validator signup logic
├── services/
│   ├── validatorManager.ts    # Validator connection management
│   ├── callbackManager.ts     # Request/response callback handling
│   ├── monitoringService.ts   # Website monitoring coordination
│   └── cleanupService.ts      # Connection cleanup and maintenance
└── utils/
    └── crypto.ts              # Cryptographic verification utilities
```

### Key Components

#### **Server** (`server.ts`)

- Main WebSocket server setup
- Coordinates all services
- Handles graceful shutdown

#### **Validator Manager** (`services/validatorManager.ts`)

- Maintains validator socket connections
- Database state synchronization
- Connection lifecycle management

#### **Monitoring Service** (`services/monitoringService.ts`)

- Orchestrates website monitoring tasks
- Distributes requests to validators
- Handles monitoring responses and verification

#### **Callback Manager** (`services/callbackManager.ts`)

- Manages request/response callbacks
- Handles timeouts and cleanup
- Provides callback execution interface

#### **Cleanup Service** (`services/cleanupService.ts`)

- Periodic connection health checks
- Database state cleanup
- Graceful shutdown procedures

#### **Crypto Utils** (`utils/crypto.ts`)

- Ed25519 signature verification
- Solana public key handling
- Message validation utilities

## Features

- **Validator Management**: Handles validator signup and authentication using Solana public key cryptography
- **Task Distribution**: Automatically distributes website monitoring tasks to available validators
- **Result Collection**: Collects and verifies monitoring results from validators
- **Reward Distribution**: Tracks pending payouts for validators based on completed validations

## Architecture

### WebSocket Communication

The hub communicates with validators through WebSocket connections:

1. **Signup Flow**:
   - Validators connect and send a signed message containing their public key
   - Hub verifies the signature and registers the validator
   - Returns a validator ID for future communications

2. **Validation Flow**:
   - Hub periodically queries for websites to monitor
   - Sends validation requests to all connected validators
   - Validators respond with signed results (status, latency)
   - Hub verifies signatures and stores results in the database

### Message Types

#### Incoming Messages (from validators):

- `signup`: Validator registration with signed public key
- `validate`: Validation result with status, latency, and signature

#### Outgoing Messages (to validators):

- `signup`: Confirmation with assigned validator ID
- `validate`: Website monitoring request with URL and callback ID

### Security

- All messages are cryptographically signed using ed25519 signatures
- Validators must prove ownership of their registered public key
- Results are only accepted from verified validators

## Configuration

Environment variables:

- `PORT`: WebSocket server port
- `COST_PER_VALIDATION`: Lamports paid per validation

## Running the Service

```bash
# Development
pnpm dev

# Production
pnpm build
pnpm start
```

## Monitoring

The service logs important events including:

- Validator connections/disconnections
- Validation task distribution
- Result verification status
- Database transaction results

## Error Handling

- Invalid signatures are rejected silently
- Database errors are logged but don't crash the service
- WebSocket errors are handled gracefully with reconnection support
- Callback timeouts prevent memory leaks from unresponsive validators
