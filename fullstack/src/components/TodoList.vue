<template>
  <div>
    <ul>
      <TodoItem v-for="(item, index) in todoLists" :key="item._id" :index="index" :item="item" @remove-item="removeItem" />
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

export default {
  props: ['todoLists'],
  components: {
    TodoItem,
  },
  methods: {
    removeItem(id) {
      this.$emit('removeItem', id);
    },
  },
};
</script>

<style scoped></style>
