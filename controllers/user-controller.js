"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.delUser = exports.addUser = exports.getAllUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../model/User"));
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.default.find();
            res.status(200).json({ users });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.getAllUser = getAllUser;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            const existingUser = yield User_1.default.findOne({ email });
            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "User Already Exists! Login Instead" });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = new User_1.default({ name, email, password: hashedPassword });
            yield user.save();
            return res.status(201).json({ user });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.addUser = addUser;
function delUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const existingUser = yield User_1.default.findOneAndDelete({ email });
            if (!existingUser) {
                return res.status(404).json({ message: "User does not exist" });
            }
            return res
                .status(200)
                .json({ message: "User deleted successfully", email });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.delUser = delUser;
function authUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const existingUser = yield User_1.default.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({
                    message: "You are not an authorized user.",
                    information: "Add yourself by sending a POST request at /addUser. Or include email: dummyEmail@example.com and password: dummyPassword to see functionality.",
                });
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
            if (isPasswordValid) {
                return res.status(200).json({ message: "You are an authorized user." });
            }
            else {
                return res.status(401).json({
                    message: "Invalid email or password.",
                });
            }
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.authUser = authUser;
