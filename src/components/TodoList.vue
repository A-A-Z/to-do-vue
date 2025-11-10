<script setup>
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['toggle', 'remove'])

function handleToggle(id) {
  emit('toggle', id)
}

function handleRemove(id) {
  emit('remove', id)
}
</script>

<template>
  <ul v-if="todos.length" class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="handleToggle"
      @remove="handleRemove"
    />
  </ul>
  <p v-else class="empty">
    No tasks yet. Add something above 👆
  </p>
</template>
