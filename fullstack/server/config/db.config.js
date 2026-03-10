import "dotenv/config";

export default {
  HOST: process.env.DB_HOST || "localhost",
  PORT: Number(process.env.DB_PORT) || 27017,
  DB: process.env.DB_NAME || "node_js_jwt_auth_db",
};
