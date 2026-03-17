import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import userRepository from "../repositories/user.repository.js";

const SINGLE_USER_USERNAME = process.env.TEST_USER_USERNAME || "testuser";

class AuthService {
  async signin(credentials) {
    if (credentials.username !== SINGLE_USER_USERNAME) {
      return {
        status: 401,
        body: {
          accessToken: null,
          message: "Invalid credentials!",
        },
      };
    }

    const user = await userRepository.findByUsername(SINGLE_USER_USERNAME);
    if (!user) {
      return {
        status: 404,
        body: { message: "User Not found." },
      };
    }

    const passwordIsValid = bcrypt.compareSync(
      credentials.password,
      user.password,
    );
    if (!passwordIsValid) {
      return {
        status: 401,
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
      status: 200,
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
