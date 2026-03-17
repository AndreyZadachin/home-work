import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";

const TEST_USER_USERNAME = process.env.TEST_USER_USERNAME || "testuser";
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || "testuser@example.com";
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || "test123456";

class TestUserService {
  async ensureTestUser() {
    try {
      const existingUser = await userRepository.findByUsernameOrEmail(
        TEST_USER_USERNAME,
        TEST_USER_EMAIL,
      );

      if (!existingUser) {
        await userRepository.create({
          username: TEST_USER_USERNAME,
          email: TEST_USER_EMAIL,
          password: bcrypt.hashSync(TEST_USER_PASSWORD, 8),
        });

        console.log(`Created test user '${TEST_USER_USERNAME}'.`);
        return;
      }

      let needsUpdate = false;

      if (existingUser.username !== TEST_USER_USERNAME) {
        existingUser.username = TEST_USER_USERNAME;
        needsUpdate = true;
      }

      if (existingUser.email !== TEST_USER_EMAIL) {
        existingUser.email = TEST_USER_EMAIL;
        needsUpdate = true;
      }

      const hasValidPassword =
        Boolean(existingUser.password) &&
        bcrypt.compareSync(TEST_USER_PASSWORD, existingUser.password);
      if (!hasValidPassword) {
        existingUser.password = bcrypt.hashSync(TEST_USER_PASSWORD, 8);
        needsUpdate = true;
      }

      if (needsUpdate) {
        await userRepository.save(existingUser);
        console.log(`Updated test user '${TEST_USER_USERNAME}'.`);
      } else {
        console.log(`Test user '${TEST_USER_USERNAME}' is ready.`);
      }
    } catch (err) {
      console.error("Error creating test user:", err);
      throw err;
    }
  }
}

export default new TestUserService();
