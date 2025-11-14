<script setup lang="ts">
import { computed } from 'vue'
import TodoRadio from './TodoRadio.vue'
import type { TodoFilter } from '../types'

const { filter } = defineProps<{
  filter: TodoFilter
}>()

const emit = defineEmits<{
  (e: 'update:filter', value: TodoFilter): void
}>()

// Bridge parent v-model:filter <-> child v-model
const model = computed<TodoFilter>({
  get: () => filter,
  set: (value) => emit('update:filter', value)
})

const options: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
]
</script>

<template>
  <fieldset class="filters focus" aria-label="Filter tasks">
    <legend class="visually-hidden">Show</legend>
    <TodoRadio
      v-for="(option, index) in options"
      :key="option.value"
      v-model="model"
      name="todo-filter"
      :value="option.value"
      :label="option.label"
      :index="index"
    />
    <div class="filters__backing">
      <div class="filters__mask">
        <div
          v-for="option in options"
          :key="option.value"
          class="filters__option"
        >{{ option.label }}</div>
      </div>
    </div>
  </fieldset>
</template>

<style>
.filters {
  --option-width: 110px;
  --option-height: 26px;
  --option-gutter: var(--spacing-25);
  --option-gap: var(--spacing-25);
  --option-trans: left 0.3s ease-in-out;

  border: var(--border);
  border-radius: 6px;
  display: flex;
  gap: var(--option-gap);
  padding: var(--option-gutter);
  position: relative;
  width: fit-content;
}

.filters__option {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  height: var(--option-height);
  justify-content: center;
  min-width: var(--option-width);
  width: var(--option-width);
}

.filters__backing {
  background-color: var(--colour-pos);
  border-radius: 4px;
  color: var(--colour-neg);
  display: flex;
  height: var(--option-height);
  justify-content: center;
  left: var(--option-gutter);
  overflow: clip;
  position: absolute;
  transition: left 0.3s ease-in-out;
  width: var(--option-width);
}

.filters__mask {
  display: flex;
  gap: var(--option-gap);
  position: absolute;
  inset: 0;
  overflow: clip;
  pointer-events: none;
  min-width: 800px;
  transition: var(--option-trans);
}

.filters {
  /* 
    Do get the masking effect we have to move the backing one way while 
    moving the mask the other way
  */

  /* Second option */
  &:has([data-index="1"]:checked) .filters__backing {
    left: calc(var(--option-gutter) + var(--option-gap) + var(--option-width));
  }
  &:has([data-index="1"]:checked) .filters__mask {
    left: calc((var(--option-gap) + var(--option-width)) * -1);
  }

  /* First option */
  &:has([data-index="2"]:checked) .filters__backing {
    left: calc(var(--option-gutter) + ((var(--option-gap) + var(--option-width)) * 2));
  }
  &:has([data-index="2"]:checked) .filters__mask {
    left: calc((var(--option-gap) + var(--option-width)) * -2);
  }
}
</style>
