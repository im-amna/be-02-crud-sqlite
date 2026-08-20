const pool = require("../db/postgres");

async function getAllTasks() {
    const result = await pool.query(
        "SELECT id, title, done FROM tasks ORDER BY id"
    );

    return result.rows;
}

async function getTaskById(id) {
    const result = await pool.query(
        "SELECT id, title, done FROM tasks WHERE id = $1",
        [id]
    );

    return result.rows[0];
}

async function createTask(title, done = 0) {
    const result = await pool.query(
        "INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING id, title, done",
        [title, done]
    );

    return result.rows[0];
}

async function updateTask(id, title, done) {
    const result = await pool.query(
        "UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING id, title, done",
        [title, done, id]
    );

    return result.rows[0];
}

async function deleteTask(id) {
    await pool.query(
        "DELETE FROM tasks WHERE id = $1",
        [id]
    );
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};