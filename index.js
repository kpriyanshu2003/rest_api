const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const fs = require("fs");
const mustacheExpress = require("mustache-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const checkAuth = (req, res, next) => {
  if (req.path === "/profile" && req.query.auth) {
    const filePath = path.join(__dirname, "logs", "users.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        res.status(500).end("Error reading the file");
      }
      const jsonData = JSON.parse(data);
      if (jsonData.includes(req.query.auth)) console.log("Token Confirmed");
      else {
        console.error("Unauthorised User tried to access " + req.url);
        res.status(401).json({ error: "Unauthorisd Access" });
      }
      next();
    });
  } else next();
};

const setCustomHeader = (req, res, next) => {
  res.removeHeader("x-powered-by");
  next();
};

app.use(cors());
app.use(bodyParser.json());
app.use(setCustomHeader);
app.use(checkAuth);
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "static")));
const server = require("./server");
app.use("/", server);

app.use(function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"));
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(
        `Database Connected and server is running on port ${process.env.PORT}`
      );
    })
  )
  .catch((err) => console.log(err));
