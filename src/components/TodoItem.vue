<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'remove'])

function toggle() {
  emit('toggle', props.todo.id)
}

function remove() {
  emit('remove', props.todo.id)
}
</script>

<template>
  <li class="todo-item">
    <label class="todo-item__label">
      <input
        type="checkbox"
        :checked="todo.done"
        @change="toggle"
      />
      <span
        class="todo-item__title"
        :class="{ 'todo-item__title--done': todo.done }"
      >
        {{ todo.title }}
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
