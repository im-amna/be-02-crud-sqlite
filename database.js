const Database = require("better-sqlite3");

const db = new Database("tasks.db");

// Create table
db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
)
`).run();

// Check if table is empty
const count = db.prepare("SELECT COUNT(*) AS total FROM tasks").get();

if (count.total === 0) {
    const insert = db.prepare(
        "INSERT INTO tasks (title, done) VALUES (?, ?)"
    );

    insert.run("Learn Node.js", 0);
    insert.run("Build CRUD API", 0);
    insert.run("Connect SQLite Database", 1);

    console.log("Sample tasks inserted.");
}

module.exports = db;