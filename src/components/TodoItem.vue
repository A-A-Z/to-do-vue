<script setup lang="ts">
import type { Todo } from '../types'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()

function toggle(): void {
  emit('toggle', props.todo.id)
}

function remove(): void {
  emit('remove', props.todo.id)
}
</script>

<template>
  <li class="todo-item">
    <label class="todo-item__label">
      <input
        type="checkbox"
        :checked="props.todo.done"
        @change="toggle"
      />
      <span
        class="todo-item__title"
        :class="{ 'todo-item__title--done': props.todo.done }"
      >
        {{ props.todo.title }}
      </span>
    </label>
    <button
      type="button"
      class="todo-item__remove"
      @click="remove"
      aria-label="Delete task"
    >
      ✕
    </button>
  </li>
</template>
