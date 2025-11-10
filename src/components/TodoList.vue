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

function handleToggle(id: string): void {
  emit('toggle', id)
}

function handleRemove(id: string): void {
  emit('remove', id)
}
</script>

<template>
  <ul v-if="props.todos.length" class="todo-list">
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
