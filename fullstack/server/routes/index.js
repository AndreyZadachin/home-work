import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import todoRoutes from "./todo.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use(userRoutes);
router.use(todoRoutes);

export default router;
