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
  <fieldset class="filters" aria-label="Filter tasks">
    <legend class="filters__legend">Show</legend>

    <label class="filters__option">
      <input
        type="radio"
        name="todo-filter"
        value="all"
        :checked="props.filter === 'all'"
        @change="setFilter('all')"
      />
      <span>All</span>
    </label>

    <label class="filters__option">
      <input
        type="radio"
        name="todo-filter"
        value="active"
        :checked="props.filter === 'active'"
        @change="setFilter('active')"
      />
      <span>Active</span>
    </label>

    <label class="filters__option">
      <input
        type="radio"
        name="todo-filter"
        value="completed"
        :checked="props.filter === 'completed'"
        @change="setFilter('completed')"
      />
      <span>Completed</span>
    </label>
  </fieldset>
</template>
