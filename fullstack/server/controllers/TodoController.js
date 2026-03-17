import todoService from "../services/todo.service.js";

class TodoController {
  async create(req, res) {
    try {
      const todo = await todoService.create(req.body);
      res.json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const todos = await todoService.getAll();
      return res.json(todos);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const todo = await todoService.delete(req.params.id);
      return res.json(todo);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoController();
