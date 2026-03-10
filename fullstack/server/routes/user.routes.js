import express from "express";
import { userBoard } from "../controllers/user.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = express.Router();

router.get("/user", [authJwt.verifyToken], userBoard);

export default router;
