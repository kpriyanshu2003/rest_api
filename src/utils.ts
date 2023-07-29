import { Response, Request } from "express";

async function dict(req: Request, res: Response) {
  const word = req.query.word as string;
  try {
    if (!word) {
      throw new Error("Missing Parameter: word");
    }

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok)
      if (response.status === 404) {
        const data = await response.json();
        return res.status(404).json(data);
      } else throw new Error("Failed to fetch data from the API.");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export { dict };
