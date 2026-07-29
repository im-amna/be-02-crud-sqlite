# BE-02 CRUD API with SQLite

## Overview

This project is a simple CRUD API built with Express.js and SQLite.

Instead of storing tasks in an in-memory array, all tasks are stored in a SQLite database.

Data remains available even after restarting the server.

---

## Technologies

- Node.js
- Express.js
- SQLite
- better-sqlite3

---

## Why SQLite?

SQLite is lightweight, fast, requires no separate database server, and stores everything in a single file.

---

## Database

Database file:

```
tasks.db
```

---

## Installation

```bash
npm install
node server.js
```

Server:

```
http://localhost:3000
```

---

## API Endpoints

GET /

GET /health

GET /tasks

GET /tasks/:id

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

---

## Example SQL Query

```sql
SELECT * FROM tasks;
```

---<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9adf417d-fe7c-4093-afa7-3dc64a155eb4" />

