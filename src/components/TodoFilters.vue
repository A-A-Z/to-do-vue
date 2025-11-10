<script setup lang="ts">
import type { TodoFilter } from '../types'

const props = defineProps<{
  filter: TodoFilter
}>()

const emit = defineEmits<{
  (e: 'update:filter', value: TodoFilter): void
}>()

function setFilter(value: TodoFilter): void {
  emit('update:filter', value)
}
</script>

<template>
  <div class="filters">
    <button
      type="button"
      class="filters__btn"
      :class="{ 'filters__btn--active': props.filter === 'all' }"
      @click="setFilter('all')"
    >
      All
    </button>
    <button
      type="button"
      class="filters__btn"
      :class="{ 'filters__btn--active': props.filter === 'active' }"
      @click="setFilter('active')"
    >
      Active
    </button>
    <button
      type="button"
      class="filters__btn"
      :class="{ 'filters__btn--active': props.filter === 'completed' }"
      @click="setFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>
