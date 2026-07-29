const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.get("/tasks", (req, res) => {

    const tasks = db.prepare("SELECT * FROM tasks").all();

    res.json(tasks);

});

app.get("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {

        return res.status(404).json({
            error: `Task ${id} not found`
        });

    }

    res.json(task);

});

app.post("/tasks", (req, res) => {

    const { title } = req.body;

    // Validation
    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    // Insert into database
    const result = db
        .prepare("INSERT INTO tasks (title, done) VALUES (?, ?)")
        .run(title.trim(), 0);

    // Get newly created task
    const newTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(result.lastInsertRowid);

    res.status(201).json(newTask);

});


app.put("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    // Check if task exists
    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    // Validation
    if (
        (title !== undefined && (typeof title !== "string" || title.trim() === "")) ||
        (done !== undefined && typeof done !== "number")
    ) {
        return res.status(400).json({
            error: "Invalid title or done value"
        });
    }

    // Keep old values if not provided
    const updatedTitle = title !== undefined ? title.trim() : task.title;
    const updatedDone = done !== undefined ? done : task.done;

    // Update database
    db.prepare(`
        UPDATE tasks
        SET title = ?, done = ?
        WHERE id = ?
    `).run(updatedTitle, updatedDone, id);

    // Return updated task
    const updatedTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    res.json(updatedTask);

});


app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    // Check if task exists
    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: `Task ${id} not found`
        });
    }

    // Delete task
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);

    res.status(204).send();

});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});