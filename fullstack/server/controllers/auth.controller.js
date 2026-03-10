import "dotenv/config";
import config from "../config/auth.config.js";
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.User;
const SINGLE_USER_USERNAME = process.env.TEST_USER_USERNAME || "testuser";

export const signin = async (req, res) => {
  try {
    if (req.body.username !== SINGLE_USER_USERNAME) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid credentials!",
      });
    }

    const user = await User.findOne({ username: SINGLE_USER_USERNAME });

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      expiresIn: 86400,
    });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
