<template>
  <div>
    <h3>Задач в списке</h3>
    <span>{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: "TodoInProcess",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 26px;
}

div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid blue;
  margin: 0 auto;
}

span {
  border: 1px solid #2c3e50;
  border-radius: 20px;
  padding: 5px 10px;
  font-weight: bold;
}
</style>
