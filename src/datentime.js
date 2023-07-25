"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = exports.time = void 0;
function isValidTimeZone(tz) {
    try {
        if (!Intl ||
            !Intl.DateTimeFormat().resolvedOptions().timeZone ||
            typeof tz !== "string") {
            return false;
        }
        Intl.DateTimeFormat(undefined, { timeZone: tz });
        return true;
    }
    catch (error) {
        return false;
    }
}
function time(req, res) {
    let tz = req.query.zone;
    if (isValidTimeZone(tz)) {
        const dt = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
        const h = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
        const m = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
        const s = dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : `${dt.getSeconds()}`;
        const t = `${h}:${m}:${s}`;
        res
            .status(200)
            .json({ time: t, hours: h, minutes: m, seconds: s, timezone: tz });
    }
    res.status(400).json({ message: "Invalid Timezone" });
}
exports.time = time;
function date(req, res) {
    let tz = req.query.zone;
    if (isValidTimeZone(tz)) {
        const dt = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
        const d = dt.getDate() < 10 ? `0${dt.getDate()}` : `${dt.getDate()}`;
        const m = dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : `${dt.getMonth() + 1}`;
        const y = dt.getFullYear().toString();
        const t = `${d}/${m}/${y}`;
        res.status(200).json({ date: t, days: d, month: m, year: y, timezone: tz });
    }
    res.status(400).json({ message: "Invalid timezone" });
}
exports.date = date;
