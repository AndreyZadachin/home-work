import api from "@/services/api";
import { TODOS_ENDPOINT } from "@/utils/constants";

class TodoService {
  fetchTodos() {
    return api.get(TODOS_ENDPOINT);
  }

  createTodo(todo) {
    return api.post(TODOS_ENDPOINT, todo);
  }

  removeTodo(id) {
    return api.delete(`${TODOS_ENDPOINT}/${id}`);
  }
}

export default new TodoService();
