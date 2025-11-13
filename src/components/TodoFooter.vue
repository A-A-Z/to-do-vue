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
    <span v-if="props.remainingCount > 0">
      {{ props.remainingCount }} task<span v-if="props.remainingCount !== 1">s</span> left
    </span>
    <span v-else-if="hasCompleted">All done</span>
    <span v-else>No tasks</span>
    <button
      class="clear-button focus"
      type="button"
      :disabled="!props.hasCompleted"
      @click="handleClear"
    >
      Clear completed
    </button>
  </footer>
</template>

<style>
.footer {
  align-items: center;
  border-top: var(--border);
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
  padding-block-start: var(--spacing-100);
}

.clear-button {
  align-items: center;
  background-color: var(--colour-pos);
  border: 0;
  border-radius: 6px;
  color: var(--colour-neg);
  cursor: pointer;
  display: flex;
  font: inherit;
  font-size: 1.1rem;
  height: 30px;
  justify-content: center;
  line-height: 1;
  padding: 0 1.5rem;

  &:disabled {
    background-color: var(--colour-neg);
    border: var(--border);
    color: var(--colour-pos);
    cursor: default;
  }
}
</style>
