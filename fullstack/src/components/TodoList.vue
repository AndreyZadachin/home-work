<template>
  <ul>
    <TodoItem
      v-for="(item, index) in items"
      :key="item._id"
      :index="index"
      :item="item"
      @remove-item="emitRemoveItem"
    />
  </ul>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["remove-item"],
  methods: {
    emitRemoveItem(id) {
      this.$emit("remove-item", id);
    },
  },
};
</script>

<style scoped></style>
