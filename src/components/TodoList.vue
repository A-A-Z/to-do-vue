<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '../types'

const props = defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()

const handleToggle = (id: string): void => {
  emit('toggle', id)
}

const handleRemove = (id: string): void => {
  emit('remove', id)
}
</script>

<template>
  <ul v-if="props.todos.length" class="list">
    <TodoItem
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      @toggle="handleToggle"
      @remove="handleRemove"
    />
  </ul>
  <p v-else class="empty">
    No tasks
  </p>
</template>

<style scoped>
.list {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
