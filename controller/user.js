import User from "../models/auth.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../index.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials or User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });
    user.token = token;

    res
      .status(200)
      .json({ message: "Login Successful", data: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    if (!name || !username || !password)
      return res.status(400).json({ message: "All fields are required" });
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      username,
      password: hashedPassword,
    });
    await user.save();

    const payload = { id: user._id };
    const token = jwt.sign(payload, secretKey, { expiresIn: "6h" });
    user.token = token;

    res
      .status(200)
      .json({ message: "Registration Successful", data: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { login, register };
