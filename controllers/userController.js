import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName, gender, DOB, country } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !fullName ||
      !gender ||
      !DOB ||
      !country
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const userExit = await User.findOne({ $or: [{ username }, { email }] });
    if (userExit) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      fullName,
      gender,
      DOB,
      country,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    let user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password", success: false });
    }

    const tokenData = { userId: user._id };

    let token;
    try {
      console.log("Generating token...");
      token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
    } catch (err) {
      console.error("JWT Sign Error:", err);
      return res
        .status(500)
        .json({ message: "Error generating token", success: false });
    }

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      DOB: user.DOB,
      country: user.country,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Prevents client-side access
        sameSite: "strict", // CSRF protection
      })
      .json({
        message: `Welcome back, ${user.fullName}!`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Username or email is required", success: false });
    }

    const user = await User.findOne({
      $or: [{ username: query }, { email: query }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      DOB: user.DOB,
      country: user.country,
    };

    return res.status(200).json({ success: true, user: userData });
  } catch (error) {
    console.error("Search user error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
