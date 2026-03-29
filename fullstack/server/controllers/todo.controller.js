import todoService from "../services/todo.service.js";
import STATUS_CODES from "../constants/status-codes.js";

class TodoController {
  async create(req, res) {
    try {
      const todo = await todoService.create(req.body);
      res.json(todo);
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const todos = await todoService.getAll();
      return res.json(todos);
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(e);
    }
  }
  async delete(req, res) {
    try {
      const todo = await todoService.delete(req.params.id);
      return res.json(todo);
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(e);
    }
  }
}

export default new TodoController();
