import fs from "fs";
import path from "path";
import { Request, Response } from "express";

function readFile(fileName: string) {
  const filePath = path.join(__dirname, `../data/${fileName}`);
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e: any) {
    console.error("Error reading facts.json : ", e.message);
    return [];
  }
}

function bully(req: Request, res: Response) {
  const data = readFile("bully.json");
  const random = data[Math.floor(Math.random() * data.length)];
  if (random) res.status(200).json({ bully: random });
  else res.status(500).json({ bully: "Internal Server Error" });
}

function quote(req: Request, res: Response) {
  const data = readFile("quotes.json");
  const random = data[Math.floor(Math.random() * data.length)];
  if (random) res.status(200).json({ quote: random });
  else res.status(500).json({ quote: "Internal Server Error" });
}

function joke(req: Request, res: Response) {
  const data = readFile("jokes.json");
  const random = data[Math.floor(Math.random() * data.length)];
  if (random) res.status(200).json({ joke: random });
  else res.status(500).json({ joke: "Internal Server Error" });
}

function fact(req: Request, res: Response) {
  const data = readFile("facts.json");
  const random = data[Math.floor(Math.random() * data.length)];
  if (random) res.status(200).json({ fact: random });
  else res.status(500).json({ fact: "Internal Server Error" });
}

function advice(req: Request, res: Response) {
  const advice = readFile("advice.json");
  const random = advice[Math.floor(Math.random() * advice.length)];
  if (random) res.status(200).json({ advice: random });
  else res.status(500).json({ advice: "Internal Server Error" });
}

function greet(name: string | undefined) {
  if (typeof name === "string") return { message: `Hello ${name}!` };
  return { message: "Hello User!" };
}

export { bully, quote, fact, joke, advice, greet };
