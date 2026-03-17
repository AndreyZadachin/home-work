<template>
  <div id="app">
    <TodoView />
  </div>
</template>

<script>
import TodoView from "@/views/TodoView.vue";

export default {
  name: "App",
  components: {
    TodoView,
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
  margin: 60px auto 0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}
</style>
