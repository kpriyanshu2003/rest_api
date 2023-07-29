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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dict = void 0;
function dict(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const word = req.query.word;
        try {
            if (!word) {
                throw new Error("Missing Parameter: word");
            }
            const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok)
                if (response.status === 404) {
                    const data = yield response.json();
                    return res.status(404).json(data);
                }
                else
                    throw new Error("Failed to fetch data from the API.");
            const data = yield response.json();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
}
exports.dict = dict;
