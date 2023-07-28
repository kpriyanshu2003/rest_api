import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../model/User";

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

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
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
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "You are not an authorized user.",
        information:
          "Add yourself by sending a POST request at /addUser. Or include email: dummyEmail@example.com and password: dummyPassword to see functionality.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      return res.status(200).json({ message: "You are an authorized user." });
    } else {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getAllUser, addUser, delUser, authUser };
