<template>
  <li>
    <div :class="{ lineThrough: item.status }">
      <input type="checkbox" v-model="item.status" />
      <span class="bold">{{ index + 1 }}</span>
      {{ item.title }}
    </div>
    <button @click="$emit('remove-item', item._id)">Удалить</button>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: Number,
  },
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #2c3e50;
}

.bold {
  font-weight: bold;
}

input {
  cursor: pointer;
  margin-right: 10px;
  align-items: left;
}

button {
  background: #ff4742;
  border: 1px solid #ff4742;
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
  width: 89px;
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

button:hover,
button:active {
  background-color: initial;
  background-position: 0 0;
  color: #ff4742;
}

button:active {
  opacity: 0.5;
}

.lineThrough {
  text-decoration: 2px line-through red;
}
</style>
