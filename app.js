const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "static")));

const server = require("./server");
app.use("/", server);

app.use(function (req, res) {
  res.status(404).end("error");
});

app.listen(port, () => {
  console.log("Server running at http://localhost:" + port);
});
