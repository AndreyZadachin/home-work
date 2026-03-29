import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import testUserConfig from "../config/test-user.config.js";
import userRepository from "../repositories/user.repository.js";
import STATUS_CODES from "../constants/status-codes.js";

class AuthService {
  async signin(credentials) {
    if (credentials.username !== testUserConfig.username) {
      return {
        status: STATUS_CODES.UNAUTHORIZED,
        body: {
          accessToken: null,
          message: "Invalid credentials!",
        },
      };
    }

    const user = await userRepository.findByUsername(testUserConfig.username);
    if (!user) {
      return {
        status: STATUS_CODES.NOT_FOUND,
        body: { message: "User Not found." },
      };
    }

    const passwordIsValid = bcrypt.compareSync(
      credentials.password,
      user.password,
    );
    if (!passwordIsValid) {
      return {
        status: STATUS_CODES.UNAUTHORIZED,
        body: {
          accessToken: null,
          message: "Invalid Password!",
        },
      };
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      expiresIn: 86400,
    });

    return {
      status: STATUS_CODES.OK,
      body: {
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      },
    };
  }
}

export default new AuthService();
