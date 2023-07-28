import { Request, Response } from "express";

function isValidTimeZone(tz: string): boolean {
  try {
    if (
      !Intl ||
      !Intl.DateTimeFormat().resolvedOptions().timeZone ||
      typeof tz !== "string"
    ) {
      return false;
    }
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch (error) {
    return false;
  }
}

function time(req: Request, res: Response) {
  let tz = req.query.zone as string;
  if (isValidTimeZone(tz)) {
    const dt = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
    const h = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
    const m =
      dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
    const s =
      dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : `${dt.getSeconds()}`;
    const t = `${h}:${m}:${s}`;
    return res
      .status(200)
      .json({ time: t, hours: h, minutes: m, seconds: s, timezone: tz });
  }
  return res.status(400).json({ message: "Invalid Timezone" });
}

function date(req: Request, res: Response) {
  let tz = req.query.zone as string;
  if (isValidTimeZone(tz)) {
    const dt = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
    const d = dt.getDate() < 10 ? `0${dt.getDate()}` : `${dt.getDate()}`;
    const m =
      dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : `${dt.getMonth() + 1}`;
    const y = dt.getFullYear().toString();
    const t = `${d}/${m}/${y}`;
    return res
      .status(200)
      .json({ date: t, days: d, month: m, year: y, timezone: tz });
  }
  return res.status(400).json({ message: "Invalid timezone" });
}

export { time, date };
