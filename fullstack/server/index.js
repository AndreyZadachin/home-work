import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import db from "./models/index.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const PORT = Number(process.env.PORT) || 5050;
const DB_URL =
  process.env.MONGO_URI ||
  `mongodb://${db.config.HOST}:${db.config.PORT}/${db.config.DB}`;
const allowedOrigins = (
  process.env.CLIENT_ORIGIN || "http://localhost:8080,http://localhost:8081"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const TEST_USER_USERNAME = process.env.TEST_USER_USERNAME || "testuser";
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || "testuser@example.com";
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || "test123456";

if (!process.env.MONGO_URI) {
  console.warn(
    "MONGO_URI is not set. Using local MongoDB connection from db.config.js",
  );
}

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", todoRoutes);

db.mongoose
  .connect(DB_URL)
  .then(async () => {
    console.log("Successfully connected to MongoDB.");
    await ensureTestUser();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit();
});

async function ensureTestUser() {
  try {
    const existingUser = await db.User.findOne({
      $or: [{ username: TEST_USER_USERNAME }, { email: TEST_USER_EMAIL }],
    });

    if (!existingUser) {
      const user = new db.User({
        username: TEST_USER_USERNAME,
        email: TEST_USER_EMAIL,
        password: bcrypt.hashSync(TEST_USER_PASSWORD, 8),
      });

      await user.save();
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
      await existingUser.save();
      console.log(`Updated test user '${TEST_USER_USERNAME}'.`);
    } else {
      console.log(`Test user '${TEST_USER_USERNAME}' is ready.`);
    }
  } catch (err) {
    console.error("Error creating test user:", err);
    throw err;
  }
}
