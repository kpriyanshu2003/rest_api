// This file handles all endpoints
const express = require("express");
const router = express.Router();

const { date, time } = require("./src/datentime");
const { bully, quote, joke, fact, advice, greet } = require("./src/fun");
const { convert } = require("./src/convert");
const { test, templating } = require("./src/test");
const { auth, tool, profile } = require("./src/question");
// const { getAllUser, signup } = require("./controllers/user-controller");

router.get("/convert", (req, res) => {
  res.send(convert(req.query));
});

// router.get("/userData", getAllUser);
// router.post("/addUser", signup);
router.get("/template", templating);
router.get("/auth", auth);
router.get("/tool", tool);
router.get("/profile", profile);
router.get("/time", time);
router.get("/date", date);
router.get("/bully", bully);
router.get("/joke", joke);
router.get("/advice", advice);
router.get("/fact", fact);
router.get("/quote", quote);
router.get("/greet", greet);

router.get("/test", (req, res) => {
  console.log("\n------------------");
  console.log("Body ", req.body);
  console.log("Query ", req.query);
  console.log("URL ", req.url);
  console.log("Params ", req.params);
  console.log("User IP ", req.ip);
  console.log("User IPs ", req.ips);
  console.log(req.path);
  res.send(test(req.query));
});

module.exports = router;
