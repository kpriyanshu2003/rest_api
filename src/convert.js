"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
function convert(data) {
    switch (data.type) {
        case "binary":
        case "bin":
            return binary(data.value);
            break;
        case "octal":
        case "oct":
            return octal(data.value);
            break;
        case "decimal":
        case "dec":
            return decimal(data.value);
            break;
        case "hexadecimal":
        case "hex":
            return hexadecimal(data.value);
            break;
        default:
            return error();
    }
}
exports.convert = convert;
function binary(bin) {
    const binaryRegex = /^(0b)?[01]+$/i;
    if (!binaryRegex.test(bin))
        return error();
    const val = parseInt(bin, 2);
    const hex = val.toString(16);
    const oct = val.toString(8);
    const dec = val.toString();
    return { bin, dec, hex, oct };
}
function decimal(dec) {
    const decimalRegex = /^\d+$/;
    if (!decimalRegex.test(dec))
        return error();
    const val = parseInt(dec);
    const bin = val.toString(2);
    const hex = val.toString(16);
    const oct = val.toString(8);
    return { bin, dec, hex, oct };
}
function octal(oct) {
    const octalRegex = /^(0o)?[0-7]+$/i;
    if (!octalRegex.test(oct))
        return error();
    const val = parseInt(oct, 8);
    const bin = val.toString(2);
    const hex = val.toString(16);
    const dec = val.toString();
    return { bin, dec, hex, oct };
}
function hexadecimal(hex) {
    const hexRegex = /^(0x)?[0-9a-f]+$/i;
    if (!hexRegex.test(hex))
        return error();
    const val = parseInt(hex, 16);
    const bin = val.toString(2);
    const oct = val.toString(8);
    const dec = val.toString();
    return { bin, dec, hex, oct };
}
function error() {
    return { message: "Invalid Paramters" };
}
