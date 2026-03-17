<template>
  <div>
    <div v-if="!isAuthenticated" class="auth-card">
      <h1>Вход</h1>

      <form class="auth-form" @submit.prevent="handleSubmitAuth">
        <label>
          Логин
          <input v-model.trim="authForm.username" required minlength="3" />
        </label>

        <label>
          Пароль
          <input
            v-model="authForm.password"
            type="password"
            required
            minlength="6"
          />
        </label>

        <button class="primary-btn" type="submit" :disabled="isAuthLoading">
          {{ isAuthLoading ? "Подождите..." : "Войти" }}
        </button>
      </form>

      <p v-if="authError" class="auth-error">{{ authError }}</p>
    </div>

    <template v-else>
      <div class="toolbar">
        <span class="welcome"
          >Пользователь: {{ currentUsername || "unknown" }}</span
        >
        <button type="button" class="logout-btn" @click="handleLogout">
          Выйти
        </button>
      </div>

      <InputItem @add-item="handleAddItem" />
      <TodoInProcess :count="todos.length" />
      <TodoList :items="todos" @remove-item="handleRemoveTodo" />
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import InputItem from "@/components/InputItem.vue";
import TodoInProcess from "@/components/TodoInProcess.vue";
import TodoList from "@/components/TodoList.vue";
import { useAuth } from "@/composables/useAuth";
import { useTodos } from "@/composables/useTodos";

const { todos, fetchTodos, addTodo, removeTodo, clearTodos } = useTodos();
const {
  isAuthenticated,
  isAuthLoading,
  currentUsername,
  authError,
  authForm,
  restoreSession,
  submitAuth,
  logout,
} = useAuth();

const handleSubmitAuth = () => submitAuth(fetchTodos);

const handleLogout = () => {
  logout();
  clearTodos();
};

const handleRemoveTodo = (id) => {
  if (!isAuthenticated.value) {
    return;
  }

  removeTodo(id).catch(() => {});
};

const handleAddItem = (item) => {
  if (!isAuthenticated.value) {
    return;
  }

  addTodo(item).catch(() => {});
};

onMounted(() => {
  restoreSession(fetchTodos);
});
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}

.auth-card {
  width: 100%;
  max-width: 460px;
  margin: 80px auto 0;
  border: 1px solid #d4d9e5;
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  background: #fff;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form label {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-form input {
  height: 36px;
  border: 1px solid #c3cbe0;
  border-radius: 8px;
  padding: 0 10px;
}

.primary-btn {
  height: 38px;
  border-radius: 8px;
  border: 1px solid #2947cc;
  background: #2947cc;
  color: #fff;
  cursor: pointer;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-error {
  margin-top: 12px;
  color: #d32f2f;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.welcome {
  font-weight: 700;
}

.logout-btn {
  border: 1px solid #d32f2f;
  background: #fff;
  color: #d32f2f;
  border-radius: 8px;
  height: 34px;
  padding: 0 12px;
  cursor: pointer;
}
</style>
