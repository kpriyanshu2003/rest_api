"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = exports.advice = exports.joke = exports.fact = exports.quote = exports.bully = void 0;
function bully() {
    return { message: "Bully String" };
}
exports.bully = bully;
function quote() {
    return { message: "Quote String" };
}
exports.quote = quote;
function joke() {
    return { message: "Joke String" };
}
exports.joke = joke;
function fact() {
    return { message: "Fact String" };
}
exports.fact = fact;
function advice() {
    return { message: "Advice String" };
}
exports.advice = advice;
function greet(name) {
    if (typeof name === "string")
        return { message: `Hello ${name}!` };
    return { message: "Hello User!" };
}
exports.greet = greet;
