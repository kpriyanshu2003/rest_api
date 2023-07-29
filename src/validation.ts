import { Request, Response } from "express";

function emailValidation(req: Request, res: Response) {
  const { email } = req.body;
  const regex = /^[a-zA-Z0-9_.]+$/;
  try {
    if (!email) throw new Error("Please enter an email");
    const [usrname, domainExtension] = email.split("@");
    const [domain, extension] = domainExtension.split(".");

    if (!usrname) throw new Error("Please include a username");
    if (usrname.includes(" ")) throw new Error("Username contains spaces");
    if (!regex.test(usrname))
      throw new Error("Use alphabets, numbers, underscores, and periods only");

    if (!domain) throw new Error("Please include a domain name");
    if (!extension) throw new Error("Please include an extension name");

    return res.status(200).json({ message: "You are good to go" });
  } catch (e: any) {
    return res.status(404).json({ message: e.message });
  }
}

function passwordValidaton(req: Request, res: Response) {
  const { password } = req.body;
  const unoUppercase = /[A-Z]+/,
    unoLowercase = /[a-z]+/,
    unoSpecialChar = /[!@#$%^&*()\[\]{}|;:'",.<>/?\\]+/,
    unoNumber = /[0-9]+/;
  try {
    if (!password) throw new Error("Please enter a password");
    if (password.length < 8) throw new Error("Minimum Password Length is 8");
    if (!unoUppercase.test(password))
      throw new Error("Include at least one uppercase alphabet");
    if (!unoLowercase.test(password))
      throw new Error("Include at least one lowercase alphabet");
    if (!unoNumber.test(password))
      throw new Error("Include at least one number");
    if (!unoSpecialChar.test(password))
      throw new Error("Include at least one special charater");
    return res.status(200).json({ message: "You are good to go" });
  } catch (e: any) {
    return res.status(404).json({ message: e.message });
  }
}

export { emailValidation, passwordValidaton };
