import { ref } from "vue";
import todoService from "@/services/todo.service";

export const useTodos = () => {
  const todos = ref([]);

  const fetchTodos = () =>
    todoService.fetchTodos().then((response) => {
      todos.value = response.data;
    });

  const addTodo = (todo) => todoService.createTodo(todo).then(() => fetchTodos());

  const removeTodo = (id) =>
    todoService.removeTodo(id).then(() => fetchTodos());

  const clearTodos = () => {
    todos.value = [];
  };

  return {
    todos,
    fetchTodos,
    addTodo,
    removeTodo,
    clearTodos,
  };
};
