import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { sendConfirmationCode } from "../nodemailer.js";
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email });
    const status = result.status;

    if (!result) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    // if (!status) {
    //   return res.status(400).json({ message: "Account not confirmed" });
    // }
    const isPasswordCorrect = await bcrypt.compare(password, result.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const signup = async (req, res) => {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWxyz";
  let confCode = "0";
  for (let i = 0; i < 25; i++) {
    confCode += characters[Math.floor(Math.random() * characters.length)];
  }
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exists." });
    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      activationCode: confCode,
    });
    sendConfirmationCode(result.email, result.activationCode);
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
