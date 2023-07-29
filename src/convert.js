"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
function convert(req, res) {
    const { value, type } = req.body;
    if (!value || !type)
        return res.status(200).json({ message: "Missing parameters" });
    const typeValue = type;
    const baseMap = {
        bin: 2,
        oct: 8,
        dec: 10,
        hex: 16,
    };
    const regexMap = {
        bin: /^(0b)?[01]+$/i,
        oct: /^(0o)?[0-7]+$/i,
        dec: /^\d+$/,
        hex: /^(0x)?[0-9a-f]+$/i,
    };
    const base = baseMap[typeValue];
    const regex = regexMap[typeValue];
    if (!regex.test(value))
        return res.status(200).json({ message: "Invalid parameters" });
    const val = parseInt(value, base);
    const bin = val.toString(2);
    const oct = val.toString(8);
    const dec = val.toString();
    const hex = val.toString(16);
    return res.status(200).json({ bin, dec, hex, oct });
}
exports.convert = convert;
