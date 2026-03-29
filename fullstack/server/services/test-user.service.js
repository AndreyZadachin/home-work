import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository.js";
import testUserConfig from "../config/test-user.config.js";

class TestUserService {
  async ensureTestUser() {
    try {
      const existingUser = await userRepository.findByUsernameOrEmail(
        testUserConfig.username,
        testUserConfig.email,
      );

      if (!existingUser) {
        await userRepository.create({
          username: testUserConfig.username,
          email: testUserConfig.email,
          password: bcrypt.hashSync(testUserConfig.password, 8),
        });

        console.log(`Created test user '${testUserConfig.username}'.`);
        return;
      }

      let needsUpdate = false;

      if (existingUser.username !== testUserConfig.username) {
        existingUser.username = testUserConfig.username;
        needsUpdate = true;
      }

      if (existingUser.email !== testUserConfig.email) {
        existingUser.email = testUserConfig.email;
        needsUpdate = true;
      }

      const hasValidPassword =
        Boolean(existingUser.password) &&
        bcrypt.compareSync(testUserConfig.password, existingUser.password);
      if (!hasValidPassword) {
        existingUser.password = bcrypt.hashSync(testUserConfig.password, 8);
        needsUpdate = true;
      }

      if (needsUpdate) {
        await userRepository.save(existingUser);
        console.log(`Updated test user '${testUserConfig.username}'.`);
      } else {
        console.log(`Test user '${testUserConfig.username}' is ready.`);
      }
    } catch (err) {
      console.error("Error creating test user:", err);
      throw err;
    }
  }
}

export default new TestUserService();
