# Live Tracker Project

## Overview

Live Tracker is a real-time location tracking application that enables users to share and monitor their live location in real-time. The system comprises two main microservices: a real-time tracking service and an OIDC-based authentication server.

---

## Problem Statement

Organizations and applications need a secure, scalable solution to track real-time location data from multiple users with the following requirements:

- **Real-time Updates**: Location data must be transmitted and received with minimal latency
- **Secure Authentication**: User identity verification and authorization using industry-standard OIDC protocol
- **Scalability**: Handle multiple concurrent users and location updates
- **Data Management**: Store and manage user credentials and microservice registrations securely
- **Microservice Integration**: Support third-party applications through OAuth integration

---

## Solution

The Live Tracker system is implemented using a microservices architecture with the following components:

### 1. **Live Tracker Service** (`liveTracker/`)
A real-time location streaming service that handles live position updates.

**Technology Stack:**
- Node.js with Express.js
- Socket.io for WebSocket-based real-time communication
- Kafka for event streaming and message brokering
- Docker containerization

### 2. **OIDC Authentication Server** (`oidcAuth/`)
A secure authentication and authorization service following OpenID Connect standards.

**Technology Stack:**
- Node.js with Express.js and TypeScript
- PostgreSQL database
- Drizzle ORM for database management
- bcryptjs for password hashing
- node-jose for cryptographic operations
- Zod for runtime schema validation

```
## Getting Started

### Installation & Running

#### Live Tracker Service
```bash
cd liveTracker
npm install
cp env.sample .env
npm run dev
```

#### OIDC Auth Server
```bash
cd oidcAuth
npm install
cp env.sample .env
npm run build
npm run db:generate
npm run db:migrate
npm run dev
```

### Docker Setup
Each service includes a `docker-compose.yml` for containerized deployment.

---

## Project Structure

```
Live Tracker/
├── Readme.md
├── liveTracker/
│   ├── package.json
│   ├── docker-compose.yml
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── app.js             # Express app setup
│   │   ├── kafkaClient.js      # Kafka producer/consumer
│   │   ├── kafkaAdmin.js       # Kafka administration
│   │   └── dbProcessor.js      # Database processing
│   ├── public/
│   │   ├── index.html
│   │   └── signin.html
│   └── env.sample
│
└── oidcAuth/
    ├── package.json
    ├── docker-compose.yml
    ├── tsconfig.json
    ├── drizzle.config.js
    ├── src/
    │   ├── index.ts            # Entry point
    │   ├── app/
    │   │   ├── app.ts          # Express app setup
    │   │   ├── controllers/    # Route handlers
    │   │   ├── middleware/     # Custom middleware
    │   │   └── routes/         # API routes
    │   ├── app/utils/
    │   │   ├── config.ts       # Configuration
    │   │   └── cert.ts         # Certificate utilities
    │   └── db/
    │       ├── index.ts        # Database connection
    │       └── schema.ts       # Drizzle schema
    ├── drizzle/                # Migration files
    ├── cert/                   # SSL certificates
    └── env.sample
```

---

## API Endpoints

### Live Tracker Service
- `GET /health` - Health check endpoint
- `GET /login` - Login page
- **WebSocket Events:**
  - `client:locationUpdates` - Send location from client
  - `server:locationUpdates` - Receive location from server

---

## Environment Variables

Create `.env` files in both service directories based on `env.sample`:
