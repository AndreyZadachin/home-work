import express from "express";
import TodoController from "../controllers/TodoController.js";

const router = express.Router();

router.get("/todos", TodoController.getAll);
router.post("/todos", TodoController.create);
router.delete("/todos/:id", TodoController.delete);

export default router;
