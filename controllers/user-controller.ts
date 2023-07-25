import User from "../model/User";
import { Request, Response } from "express";

async function getAllUser(req: Request, res: Response) {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(e);
  }
  if (existingUser) {
    res.status(400).json({ message: "User Already Exists ! Login Instead" });
  }
  const user = new User({
    name,
    email,
    password,
  });
  try {
    user.save();
  } catch (e) {
    console.log(e);
  }
  res.status(201).json({ user });
}

export { getAllUser, signup };
