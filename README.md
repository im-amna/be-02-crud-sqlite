# BE-04 A3 - Containerize Your Stack

## Overview

Containerized the Task API with PostgreSQL using Docker Compose.

## Stack

- Node.js
- Express
- PostgreSQL 16
- Docker
- Docker Compose

## Implementation

- PostgreSQL runs inside Docker.
- PostgreSQL data is persisted using a Docker volume.
- Database connection is provided through .env.
- .env.example is committed to the repository.
- The tasks table is created using db/schema.sql.
- A PostgreSQL repository replaces the previous storage implementation.
- Service and API routes remain unchanged.

## Run the Application

Start the complete stack with:

```bash
docker compose up -d