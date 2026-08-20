const express = require("express");
const taskRepository = require("./repositories/taskRepository");

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

// GET all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskRepository.getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});

// GET task by ID
app.get("/tasks/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    try {
        const task = await taskRepository.getTaskById(id);

        if (!task) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch task"
        });
    }
});

// CREATE task
app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    try {
        const newTask = await taskRepository.createTask(title.trim(), 0);
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create task"
        });
    }
});

// UPDATE task
app.put("/tasks/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const { title, done } = req.body;

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    if (
        (title !== undefined &&
            (typeof title !== "string" || title.trim() === "")) ||
        (done !== undefined &&
            (typeof done !== "number" || !Number.isInteger(done)))
    ) {
        return res.status(400).json({
            error: "Invalid title or done value"
        });
    }

    try {
        const task = await taskRepository.getTaskById(id);

        if (!task) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        const updatedTitle =
            title !== undefined ? title.trim() : task.title;

        const updatedDone =
            done !== undefined ? done : task.done;

        const updatedTask = await taskRepository.updateTask(
            id,
            updatedTitle,
            updatedDone
        );

        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to update task"
        });
    }
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    try {
        const task = await taskRepository.getTaskById(id);

        if (!task) {
            return res.status(404).json({
                error: `Task ${id} not found`
            });
        }

        await taskRepository.deleteTask(id);

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to delete task"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});