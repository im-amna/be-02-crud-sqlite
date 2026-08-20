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

docker compose up -d

The API runs on:

http://localhost:3000

## API Endpoints

GET /tasks

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

## Persistence Verification

A task named "Persistence Test" was created through the API.

The complete Docker stack was then restarted using:

docker compose down

docker compose up -d

After the restart, GET /tasks still returned the "Persistence Test" task.

This proves that PostgreSQL data persists across application and container restarts because PostgreSQL uses a Docker volume.

## Database Verification

The PostgreSQL database was verified using:

docker exec flyrank-postgres psql -U postgres -d flyrank -c "\dt"

The tasks table was present.

PostgreSQL connection was also verified successfully.

## CRUD Verification

The following operations were tested successfully:

- CREATE
- READ
- UPDATE
- DELETE

## Persistence Test Result

Before restart:

id: 2
title: Persistence Test
done: 0

After:

docker compose down
docker compose up -d

The task was still available through GET /tasks.