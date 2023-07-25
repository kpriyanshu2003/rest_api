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
exports.test = void 0;
function fetchWordMeaning(word) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/fact`);
            if (!response.ok) {
                throw new Error("Failed to fetch data from the API.");
            }
            const data = yield response.json();
            const meaning = data.fact;
            if (meaning) {
                return meaning;
            }
            else {
                throw new Error("No meaning found for the word.");
            }
        }
        catch (error) {
            console.error("Error fetching meaning:", error.message);
            return null;
        }
    });
}
function test(val) {
    try {
        switch (val.func) {
            case "dictionary":
                console.log(fetchWordMeaning("val"));
                return fetchWordMeaning("value");
                break;
            default:
                throw new Error("Error thorown");
        }
    }
    catch (e) {
        return {
            message: "Endpoint used for testing only.",
            instruction: "Endpoint runnig in default case.",
            statusCode: "200",
        };
    }
}
exports.test = test;
