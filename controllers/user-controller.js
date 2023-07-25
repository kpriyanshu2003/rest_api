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
exports.signup = exports.getAllUser = void 0;
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
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        let existingUser;
        try {
            existingUser = yield User_1.default.findOne({ email });
        }
        catch (e) {
            console.log(e);
        }
        if (existingUser) {
            res.status(400).json({ message: "User Already Exists ! Login Instead" });
        }
        const user = new User_1.default({
            name,
            email,
            password,
        });
        try {
            user.save();
        }
        catch (e) {
            console.log(e);
        }
        res.status(201).json({ user });
    });
}
exports.signup = signup;
