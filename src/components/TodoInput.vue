<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])

const title = ref('')

function submit() {
  if (!title.value.trim()) return
  emit('add-todo', title.value)
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
