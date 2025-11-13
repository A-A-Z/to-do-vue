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
  <div v-else class="empty">

  </div>
</template>

<style scoped>
.list {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
  list-style-type: none;
  margin: 0;
  padding: var(--spacing-100) 0;
}

.empty {
  height: var(--spacing-100);
}
</style>
