import fs from "fs";
import path from "path";
import { Request, Response } from "express";

function readFile(fileName: string): any[] {
  const filePath = path.join(__dirname, `../data/${fileName}`);
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e: any) {
    console.error(`Error reading ${fileName}:`, e.message);
    return [];
  }
}

function getRandomItem<T>(data: T[]): T | undefined {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

function randomResponse(
  req: Request,
  res: Response,
  fileName: string,
  key: string
) {
  const data = readFile(fileName);
  const random = getRandomItem(data);
  if (random) res.status(200).json({ [key]: random });
  else res.status(500).json({ [key]: "Internal Server Error" });
}

function bully(req: Request, res: Response) {
  randomResponse(req, res, "bully.json", "bully");
}

function quote(req: Request, res: Response) {
  randomResponse(req, res, "quotes.json", "quote");
}

function joke(req: Request, res: Response) {
  randomResponse(req, res, "jokes.json", "joke");
}

function fact(req: Request, res: Response) {
  randomResponse(req, res, "facts.json", "fact");
}

function advice(req: Request, res: Response) {
  randomResponse(req, res, "advice.json", "advice");
}

function greet(req: Request, res: Response) {
  const name = req.query.name as string;
  res.json({ message: `Hello ${name ? name : "User"}!` });
}

export { bully, quote, fact, joke, advice, greet };
