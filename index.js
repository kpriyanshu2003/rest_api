const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  const file = path.join(__dirname, "index.html");
  res.sendFile(file);
});

app.get("/api/data", (req, res) => {
  res.json({ message: "GET request received" });
});

app.post("/api/data", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}! POST request received` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
