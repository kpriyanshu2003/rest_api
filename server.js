// This file handles all endpoints

const express = require("express");
const router = express.Router();
const path = require("path");

const { time, date } = require("./src/datentime");
const { bully, quote, joke, fact, advice, greet } = require("./src/fun");
const { convert } = require("./src/convert");
const { test } = require("./src/test");

router.get("/convert", (req, res) => {
  res.send(convert(req.query));
});

router.get("/time", (req, res) => {
  res.send(time(req.query));
});

router.get("/date", (req, res) => {
  res.send(date(req.query));
});

router.get("/bully", (req, res) => {
  res.send(bully());
});

router.get("/joke", (req, res) => {
  res.send(joke());
});

router.get("/advice", (req, res) => {
  res.send(advice());
});

router.get("/greet", (req, res) => {
  res.send(greet());
});

router.get("/fact", (req, res) => {
  res.send(fact());
});

router.get("/quote", (req, res) => {
  res.send(quote());
});

router.get("/test", (req, res) => {
  console.log("\n------------------");
  console.log("Body ", req.body);
  console.log("Query ", req.query);
  console.log("URL ", req.url);
  console.log("Params ", req.params);
  res.send(test());
});

module.exports = router;
