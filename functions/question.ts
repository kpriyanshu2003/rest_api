import { Response, Request } from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

function addUser(val: string): boolean {
  const filePath = path.join(__dirname, "..", "logs", "users.json");
  try {
    const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    fileData.push(val);
    fs.writeFileSync(filePath, JSON.stringify(fileData), "utf-8");
    return true;
  } catch (err) {
    console.error("Error reading or writing data:", err);
    return false;
  }
}

function auth(req: Request, res: Response) {
  if (req.query.token === process.env.AUTHTOKEN && req.query.user) {
    if (!addUser(req.query.user as string)) res.sendStatus(500);
    else res.send("Added User");
  } else res.sendStatus(401);
}

function tool(req: Request, res: Response) {
  res.json({ "Endpoint ": req.url });
}
function profile(req: Request, res: Response) {
  res.json({
    message: "EndPoint " + req.url,
    authToken: req.query.auth,
  });
}

export { auth, tool, profile };
