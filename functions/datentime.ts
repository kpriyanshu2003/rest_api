interface TimeZone {
  zone: string;
}

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

function time(tz: TimeZone):
  | {
      time: string;
      hours: string;
      minutes: string;
      seconds: string;
      timezone: string;
    }
  | { message: string } {
  if (isValidTimeZone(tz.zone)) {
    const dt = new Date(
      new Date().toLocaleString("en-US", { timeZone: tz.zone })
    );
    const h = dt.getHours() < 10 ? `0${dt.getHours()}` : `${dt.getHours()}`;
    const m =
      dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : `${dt.getMinutes()}`;
    const s =
      dt.getSeconds() < 10 ? `0${dt.getSeconds()}` : `${dt.getSeconds()}`;
    const t = `${h}:${m}:${s}`;

    return {
      time: t,
      hours: h,
      minutes: m,
      seconds: s,
      timezone: tz.zone,
    };
  }
  return { message: "Invalid timezone" };
}

function date(tz: TimeZone):
  | {
      date: string;
      days: string;
      month: string;
      year: string;
      timezone: string;
    }
  | { message: string } {
  if (isValidTimeZone(tz.zone)) {
    const dt = new Date(
      new Date().toLocaleString("en-US", { timeZone: tz.zone })
    );
    const d = dt.getDate() < 10 ? `0${dt.getDate()}` : `${dt.getDate()}`;
    const m =
      dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : `${dt.getMonth() + 1}`;
    const y = dt.getFullYear().toString();
    const t = `${d}/${m}/${y}`;

    return {
      date: t,
      days: d,
      month: m,
      year: y,
      timezone: tz.zone,
    };
  }
  return { message: "Invalid timezone" };
}

export { time, date };
