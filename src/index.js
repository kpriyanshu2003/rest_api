import { bully, quote, fact, joke, advice, greet } from "./fun";
import { date, time } from "./datentime";
import { convert } from "./utils";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") return home();
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
    } else return new Response("Page not found", { status: 404 });
  },
};

// Functions

function test() {
  return new Response(JSON.stringify({ message: "this is a test message" }), {
    headers: { "content-type": "application/json;charset=UTF-8" },
  });
}

// home page

function home() {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-family: "Courier New", Courier, monospace;
      }
    </style>
  </head>
  <body>
    <h1>Home Page for https://www.api-uno.workers.dev</h1>
    <p>
      This is an api link which can do multiple functions. And they are
      described as follows :<br />
      GET Requests only
    </p>
    <ol>
      <li>/ : Displays home page</li>
      <li>
        /time : Displays current time (Asia/Kolkata). Accepts parameter 'zone'
      </li>
      <li>
        /date : Displays current date (Asia/Kolkata). Accepts parameter 'zone'
      </li>
      <li>/fact : Get a random fac</li>
      <li>/advice : Get a random advice</li>
      <li>/joke : Get a random joke</li>
      <li>/quote : Get a random quote</li>
      <li>/bully : Get a random insult</li>
      <li>/greet : Greets the user. Requires parameter 'name'</li>
      <li>
        /convert : Convert binary, decimal, hexadecimal, and octal. Accepts
        parameter 'bin', 'dec', 'hex' and 'oct'. Single parameter
      </li>
    </ol>
  </body>
</html>
`;
  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}

// Example usage
// const scriptUrl = "https://example.com/path/to/script.js";
// const scriptModule = await loadScript(scriptUrl);

// Use functions from the script module
// scriptModule.someFunction();
