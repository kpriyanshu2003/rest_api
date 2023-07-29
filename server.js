// This file handles all endpoints
const express = require("express");
const router = express.Router();

const { date, time } = require("./src/datentime");
const { bully, quote, joke, fact, advice, greet } = require("./src/fun");
const { convert } = require("./src/convert");
const { test, templating } = require("./src/test");
const {
  getAllUser,
  addUser,
  delUser,
  authUser,
} = require("./controllers/user-controller");
const { emailValidation, passwordValidaton } = require("./src/validation");
const { dict } = require("./src/utils");

router.get("/convert", convert);
router.get("/userData", getAllUser);
router.get("/template", templating);
router.get("/time", time);
router.get("/date", date);
router.get("/bully", bully);
router.get("/joke", joke);
router.get("/advice", advice);
router.get("/fact", fact);
router.get("/quote", quote);
router.get("/greet", greet);
router.get("/dict", dict);
router.get("/test", test);

router.post("/addUser", addUser);
router.post("/delUser", delUser);
router.post("/authUser", authUser);
router.post("/emailValidate", emailValidation);
router.post("/passwordValidate", passwordValidaton);

module.exports = router;
