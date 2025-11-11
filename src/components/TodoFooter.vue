<script setup lang="ts">
const props = defineProps<{
  remainingCount: number
  hasCompleted: boolean
}>()

const emit = defineEmits<{
  (e: 'clearCompleted'): void
}>()

const handleClear = (): void => {
  emit('clearCompleted')
}
</script>

<template>
  <footer class="footer">
    <span>
      {{ props.remainingCount }} task<span v-if="props.remainingCount !== 1">s</span> left
    </span>
    <button
      class="btn-link"
      type="button"
      :disabled="!props.hasCompleted"
      @click="handleClear"
    >
      Clear completed
    </button>
  </footer>
</template>