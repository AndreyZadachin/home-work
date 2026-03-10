<template>
  <div>
    <form @submit.prevent="addItem">
      <h1>Список дел</h1>
      <input placeholder="Введите новую задачу..." v-model="title" />
      <button type="submit" class="button">Добавить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
    };
  },
  methods: {
    addItem() {
      if (this.title.trim()) {
        const newItem = {
          title: this.title,
          status: false,
        };
        this.$emit('add-item', newItem);
        this.title = '';
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 26px;
}

form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

input {
  margin-left: 10%;
  margin-right: 10px;
  height: 25px;
  width: 300px;
  border-radius: 50px;
  border: 1px solid #2947cc;
  padding-left: 5px;
}

.button {
  background: #2947cc;
  border: 1px solid #2947cc;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 800;
  line-height: 10px;
  min-height: 30px;
  outline: 0;
  padding: 8px 10px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.button:hover,
.button:active {
  background-color: initial;
  background-position: 0 0;
  color: #2947cc;
}

.button:active {
  opacity: 0.5;
}
</style>
