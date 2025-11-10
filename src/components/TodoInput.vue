<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add-todo', title: string): void
}>()

const title = ref('')

function submit(): void {
  const value = title.value.trim()
  if (!value) return
  emit('add-todo', value)
  title.value = ''
}
</script>

<template>
  <form class="todo-input" @submit.prevent="submit">
    <input
      v-model="title"
      type="text"
      class="todo-input__field"
      placeholder="What do you need to do?"
    />
    <button type="submit" class="todo-input__btn">
      Add
    </button>
  </form>
</template>
