import todoRepository from "../repositories/todo.repository.js";

class TodoService {
  create(todo) {
    return todoRepository.create(todo);
  }

  getAll() {
    return todoRepository.findAll();
  }

  delete(id) {
    return todoRepository.findByIdAndDelete(id);
  }
}

export default new TodoService();
