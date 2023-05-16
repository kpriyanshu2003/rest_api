import { bully, quote, fact, joke, advice, greet } from "./fun";
import { date, time } from "./datentime";
import { convert, dict } from "./utils";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") return await home();
    else if (url.pathname === "/time") {
      const zone = url.searchParams.get("zone");
      return time(zone);
    } else if (url.pathname === "/date") {
      const zone = url.searchParams.get("zone");
      return date(zone);
    } else if (url.pathname === "/test") return test();
    else if (url.pathname === "/advice") return await advice();
    else if (url.pathname === "/fact") return await fact();
    else if (url.pathname === "/joke") return await joke();
    else if (url.pathname === "/quote") return await quote();
    else if (url.pathname === "/bully") return await bully();
    else if (url.pathname === "/greet") {
      const name = url.searchParams.get("name");
      return greet(name);
    } else if (url.pathname === "/convert") {
      let value;
      if ((value = url.searchParams.get("bin")))
        return convert(value, "binary");
      else if ((value = url.searchParams.get("dec")))
        return convert(value, "decimal");
      else if ((value = url.searchParams.get("hex")))
        return convert(value, "hexadecimal");
      else if ((value = url.searchParams.get("oct")))
        return convert(value, "octal");
      else return convert(value, "error");
    } else if (url.pathname === "/dictionary") {
      const word = url.searchParams.get("query");
      return await dict(word);
    } else return new Response("Page not found", { status: 404 });
  },
};

function test() {
  return new Response(JSON.stringify({ message: "this is a test message" }), {
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}

async function home() {
  const html = await fetch(
    "https://raw.githubusercontent.com/kpriyanshu2003/api/main/src/index.html"
  );
  const text = await html.text();
  return new Response(text, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
