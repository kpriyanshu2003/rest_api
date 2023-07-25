"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.tool = exports.auth = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function addUser(val) {
    const filePath = path_1.default.join(__dirname, "..", "logs", "users.json");
    try {
        const fileData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        fileData.push(val);
        fs_1.default.writeFileSync(filePath, JSON.stringify(fileData), "utf-8");
        return true;
    }
    catch (err) {
        console.error("Error reading or writing data:", err);
        return false;
    }
}
function auth(req, res) {
    if (req.query.token === process.env.AUTHTOKEN && req.query.user) {
        if (!addUser(req.query.user))
            res.sendStatus(500);
        else
            res.send("Added User");
    }
    else
        res.sendStatus(401);
}
exports.auth = auth;
function tool(req, res) {
    res.json({ "Endpoint ": req.url });
}
exports.tool = tool;
function profile(req, res) {
    res.json({
        message: "EndPoint " + req.url,
        authToken: req.query.auth,
    });
}
exports.profile = profile;
