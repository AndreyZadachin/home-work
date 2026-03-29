import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import userService from "../services/user.service.js";
import STATUS_CODES from "../constants/status-codes.js";

const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: "No token provided!" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    const user = await userService.findById(decoded.id);
    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: "Unauthorized!" });
  }
};

const authJwt = {
  verifyToken,
};

export default authJwt;
