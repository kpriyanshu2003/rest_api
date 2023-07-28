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
        console.error(`Error reading ${fileName}:`, e.message);
        return [];
    }
}
function getRandomItem(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}
function randomResponse(req, res, fileName, key) {
    const data = readFile(fileName);
    const random = getRandomItem(data);
    if (random)
        res.status(200).json({ [key]: random });
    else
        res.status(500).json({ [key]: "Internal Server Error" });
}
function bully(req, res) {
    randomResponse(req, res, "bully.json", "bully");
}
exports.bully = bully;
function quote(req, res) {
    randomResponse(req, res, "quotes.json", "quote");
}
exports.quote = quote;
function joke(req, res) {
    randomResponse(req, res, "jokes.json", "joke");
}
exports.joke = joke;
function fact(req, res) {
    randomResponse(req, res, "facts.json", "fact");
}
exports.fact = fact;
function advice(req, res) {
    randomResponse(req, res, "advice.json", "advice");
}
exports.advice = advice;
function greet(req, res) {
    const name = req.query.name;
    res.json({ message: `Hello ${name ? name : "User"}!` });
}
exports.greet = greet;
