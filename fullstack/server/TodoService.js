import Todo from './Todo.js';

class TodoService {
  async create(todo) {
    const createdTodo = await Todo.create(todo);
    return createdTodo;
  }
  async getAll() {
    const todos = await Todo.find();
    return todos;
  }
  async delete(id) {
    const todo = await Todo.findByIdAndDelete(id);
    return todo;
  }
}

export default new TodoService();
