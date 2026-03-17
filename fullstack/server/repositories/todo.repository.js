import Todo from "../models/todo.model.js";

class TodoRepository {
  create(todoData) {
    return Todo.create(todoData);
  }

  findAll() {
    return Todo.find();
  }

  findByIdAndDelete(id) {
    return Todo.findByIdAndDelete(id);
  }
}

export default new TodoRepository();
