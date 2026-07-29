const express = require("express");
const db = require("./database");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("SQLite Connected Successfully!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});