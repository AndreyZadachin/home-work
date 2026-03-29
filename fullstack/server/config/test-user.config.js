const username = process.env.TEST_USER_USERNAME || "testuser";
const email = process.env.TEST_USER_EMAIL || "testuser@example.com";
const password = process.env.TEST_USER_PASSWORD || "test123456";

export default {
  username,
  email,
  password,
};
