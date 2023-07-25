const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
// const port = 3000;
const fs = require("fs");
// const morgan = require("morgan");
const mustacheExpress = require("mustache-express");

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
// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "logs", "access.log"),
//   {
//     flags: "a",
//   }
// );
// const customFormat =
//   ':url :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"';

app.use(cors());
app.use(bodyParser.json());
// app.use(morgan(customFormat, { stream: accessLogStream }));
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

// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// mongoose
//   .connect(process.env.DATABASE_URL)
//   .then(() =>
//     app.listen(port, () => {
//       console.log(`Database Connected and server is running on port ${port}`);
//     })
//   )
//   .catch((err) => console.log(err));

app.listen(9000, () => {
  console.log(`Server running at http://localhost:${9000}`);
});
