<script setup lang="ts">
import type { Todo } from '../types'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()

const toggle = (): void => {
  emit('toggle', props.todo.id)
}

const remove = (): void => {
  emit('remove', props.todo.id)
}
</script>

<template>
  <li class="item">
    <label class="item__label">
      <input
        type="checkbox"
        class="visually-hidden"
        :checked="props.todo.done"
        @change="toggle"
        tabindex="0"
      />
      <span
        class="item__title"
        :class="{ 'item__title--done': props.todo.done }"
      >
        {{ props.todo.title }}
      </span>
    </label>
    <button
      type="button"
      class="item__remove"
      @click="remove"
      aria-label="Delete task"
    >
      ✕
    </button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item__label {
  background-color: #555;
  flex-grow: 1;
          text-align: left;

  &:has(:checked) {
    background-color: #0f0;
  }

  &:has(:focus-visible) {
    outline: 2px solid #f00;
  }
}
</style>
