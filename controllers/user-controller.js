const User = require("../model/User");

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(e);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists ! Login Instead" });
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
  return res.status(201).json({ user });
};
