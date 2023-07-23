function bully(): { message: string } {
  return { message: "Bully String" };
}

function quote(): { message: string } {
  return { message: "Quote String" };
}

function joke(): { message: string } {
  return { message: "Joke String" };
}

function fact(): { message: string } {
  return { message: "Fact String" };
}

function advice(): { message: string } {
  return { message: "Advice String" };
}

function greet(name: string | undefined): { message: string } {
  if (typeof name === "string") return { message: `Hello ${name}!` };
  return { message: "Hello User!" };
}

export { bully, quote, fact, joke, advice, greet };
