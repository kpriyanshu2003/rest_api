const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mustacheExpress = require("mustache-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const setCustomHeader = (req, res, next) => {
  res.removeHeader("x-powered-by");
  next();
};

app.use(cors());
app.use(bodyParser.json());
app.use(setCustomHeader);
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "static")));

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "docs.html"));
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "404.html"));
});

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
