import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./models/index.js";
import apiRoutes from "./routes/index.js";
import testUserService from "./services/test-user.service.js";

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
app.use("/api", apiRoutes);

db.mongoose
  .connect(DB_URL)
  .then(async () => {
    console.log("Successfully connected to MongoDB.");
    await testUserService.ensureTestUser();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit();
  });
