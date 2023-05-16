export function time(tz) {
  let dt = "";
  if (!tz)
    dt = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
  else dt = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));

  let h = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
  let m = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
  let s = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();
  let t = `${h}:${m}:${s}`;

  let json = JSON.stringify({ time: t, hours: h, minutes: m, seconds: s });
  let headers = new Headers({ "Content-Type": "application/json" });
  return new Response(json, { headers: headers });
}

export function date(tz) {
  let dt = "";
  if (!tz)
    dt = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
  else dt = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));

  let d = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
  let m = dt.getMonth() < 10 ? "0" + dt.getMonth() : dt.getMonth();
  let y = dt.getFullYear() < 10 ? "0" + dt.getFullYear() : dt.getFullYear();
  let t = `${d}/${m}/${y}`;

  let json = JSON.stringify({ date: t, days: d, month: m, year: y });
  let headers = new Headers({ "Content-Type": "application/json" });
  return new Response(json, { headers: headers });
}
