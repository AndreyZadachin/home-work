import "dotenv/config";

const secret = process.env.JWT_SECRET || "dev-jwt-secret-change-me";

if (!process.env.JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set. Using insecure fallback secret for development only.",
  );
}

export default {
  secret,
};
