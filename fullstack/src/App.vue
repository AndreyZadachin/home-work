<template>
  <div id="app">
    <div v-if="!isAuthenticated" class="auth-card">
      <h1>Вход</h1>

      <form class="auth-form" @submit.prevent="submitAuth">
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
          {{ isAuthLoading ? 'Подождите...' : 'Войти' }}
        </button>
      </form>

      <p v-if="authError" class="auth-error">{{ authError }}</p>
    </div>

    <template v-else>
      <div class="toolbar">
        <span class="welcome">Пользователь: {{ currentUsername || 'unknown' }}</span>
        <button type="button" class="logout-btn" @click="logout">Выйти</button>
      </div>

      <InputItem @add-item="addItem" />
      <TodoInProcess :db="db.length" />
      <TodoList :todoLists="db" @removeItem="removeTodo" />
    </template>
  </div>
</template>

<script>
import InputItem from '@/components/InputItem.vue';
import TodoInProcess from '@/components/TodoInProcess.vue';
import TodoList from '@/components/TodoList.vue';
import api from '@/services/api';

const TODOS_ENDPOINT = process.env.VUE_APP_TODOS_ENDPOINT || '/todos';
const SIGNIN_ENDPOINT = process.env.VUE_APP_AUTH_SIGNIN_ENDPOINT || '/auth/signin';
const AUTH_VERIFY_ENDPOINT = process.env.VUE_APP_AUTH_VERIFY_ENDPOINT || '/user';
const AUTH_TOKEN_KEY = process.env.VUE_APP_AUTH_TOKEN_KEY || 'accessToken';
const AUTH_USER_KEY = process.env.VUE_APP_AUTH_USER_KEY || 'authUsername';

export default {
  name: 'App',
  data() {
    return {
      db: [],
      isAuthenticated: false,
      isAuthLoading: false,
      currentUsername: '',
      authError: '',
      authForm: {
        username: '',
        password: '',
      },
    };
  },
  mounted() {
    this.restoreSession();
  },
  components: {
    InputItem,
    TodoInProcess,
    TodoList,
  },
  methods: {
    restoreSession() {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const savedUsername = localStorage.getItem(AUTH_USER_KEY);

      if (!token) {
        return Promise.resolve();
      }

      this.currentUsername = savedUsername || '';

      return api
        .get(AUTH_VERIFY_ENDPOINT)
        .then(() => {
          this.isAuthenticated = true;
          return this.fetchTodos();
        })
        .catch(() => {
          this.logout();
        });
    },
    submitAuth() {
      if (this.isAuthLoading) {
        return;
      }

      this.authError = '';
      this.isAuthLoading = true;

      this.signInWithCredentials(this.authForm.username, this.authForm.password)
        .catch((error) => {
          this.authError = error?.response?.data?.message || 'Ошибка авторизации.';
        })
        .finally(() => {
          this.isAuthLoading = false;
        });
    },
    signInWithCredentials(username, password) {
      return api.post(SIGNIN_ENDPOINT, { username, password }).then((response) => {
        const token = response?.data?.accessToken;

        if (!token) {
          throw new Error('Token was not returned');
        }

        const userName = response?.data?.username || username;

        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(AUTH_USER_KEY, userName);

        this.currentUsername = userName;
        this.isAuthenticated = true;
        this.authForm.password = '';

        return this.fetchTodos();
      });
    },
    fetchTodos() {
      return api.get(TODOS_ENDPOINT).then((response) => {
        this.db = response.data;
      });
    },
    logout() {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      this.isAuthenticated = false;
      this.currentUsername = '';
      this.authForm.password = '';
      this.db = [];
    },
    removeTodo(id) {
      if (!this.isAuthenticated) {
        return;
      }
      api
        .delete(`${TODOS_ENDPOINT}/${id}`)
        .then(() => this.fetchTodos())
        .catch(() => {});
    },
    addItem(item) {
      if (!this.isAuthenticated) {
        return;
      }
      api
        .post(TODOS_ENDPOINT, item)
        .then(() => this.fetchTodos())
        .catch(() => {});
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 80%;
  margin: 0 auto;
  margin-top: 60px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

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
