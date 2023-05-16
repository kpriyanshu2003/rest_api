export async function bully() {
  const response = await fetch("https://api.safone.me/bully");
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function quote() {
  const response = await fetch("https://api.safone.me/quote");
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function joke() {
  // const response = await fetch("https://api.safone.me/joke");
  // const data = await response.json();
  return new Response("Page not found", { status: 404 });
  // return new Response(JSON.stringify(data), {headers: { "Content-Type": "application/json" },})
}

export async function fact() {
  const response = await fetch("https://api.safone.me/fact");
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function advice() {
  const response = await fetch("https://api.safone.me/advice");
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export function greet(name) {
  if (!name) {
    return new Response("Please provide a name parameter", { status: 400 });
  }
  return new Response(`Hello, ${name}!`, {
    headers: { "content-type": "text/plain" },
  });
}
