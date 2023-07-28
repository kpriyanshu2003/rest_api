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

async function addUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }

    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function delUser(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const existingUser = await User.findOneAndDelete({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", email });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function authUser(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "You are an authorised user." });
    } else {
      return res.status(401).json({
        message:
          "You are not an authorised user. Send a POST request at /addUser. Or include email: dummyuser@example.com to see the functionality.",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getAllUser, addUser, delUser, authUser };
