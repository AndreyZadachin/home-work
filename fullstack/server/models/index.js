import mongoose from "mongoose";
import dbConfig from "../config/db.config.js";

import User from "./user.model.js";

const db = {};

db.mongoose = mongoose;
db.User = User;
db.config = dbConfig;

export default db;
