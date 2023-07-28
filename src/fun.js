"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = exports.advice = exports.joke = exports.fact = exports.quote = exports.bully = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readFile(fileName) {
    const filePath = path_1.default.join(__dirname, `../data/${fileName}`);
    try {
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    }
    catch (e) {
        console.error("Error reading facts.json : ", e.message);
        return [];
    }
}
function bully(req, res) {
    const data = readFile("bully.json");
    const random = data[Math.floor(Math.random() * data.length)];
    if (random)
        res.status(200).json({ bully: random });
    else
        res.status(500).json({ bully: "Internal Server Error" });
}
exports.bully = bully;
function quote(req, res) {
    const data = readFile("quotes.json");
    const random = data[Math.floor(Math.random() * data.length)];
    if (random)
        res.status(200).json({ quote: random });
    else
        res.status(500).json({ quote: "Internal Server Error" });
}
exports.quote = quote;
function joke(req, res) {
    const data = readFile("jokes.json");
    const random = data[Math.floor(Math.random() * data.length)];
    if (random)
        res.status(200).json({ joke: random });
    else
        res.status(500).json({ joke: "Internal Server Error" });
}
exports.joke = joke;
function fact(req, res) {
    const data = readFile("facts.json");
    const random = data[Math.floor(Math.random() * data.length)];
    if (random)
        res.status(200).json({ fact: random });
    else
        res.status(500).json({ fact: "Internal Server Error" });
}
exports.fact = fact;
function advice(req, res) {
    const advice = readFile("advice.json");
    const random = advice[Math.floor(Math.random() * advice.length)];
    if (random)
        res.status(200).json({ advice: random });
    else
        res.status(500).json({ advice: "Internal Server Error" });
}
exports.advice = advice;
function greet(req, res) {
    const name = req.query.name;
    if (typeof name === "string")
        res.json({ message: `Hello ${name}!` });
    else
        res.json({ message: "Hello User!" });
}
exports.greet = greet;
