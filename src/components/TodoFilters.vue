<script setup lang="ts">
import { computed } from 'vue'
import TodoRadio from './TodoRadio.vue'
import type { TodoFilter } from '../types'

const props = defineProps<{
  filter: TodoFilter
}>()

const emit = defineEmits<{
  (e: 'update:filter', value: TodoFilter): void
}>()

// Bridge parent v-model:filter <-> child v-model
const model = computed<TodoFilter>({
  get: () => props.filter,
  set: (value) => emit('update:filter', value)
})

const options: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' }
]

</script>

<template>
  <fieldset class="filters" aria-label="Filter tasks">
    <legend class="visually-hidden">Show</legend>
    <!-- <div class="filters__backing"></div> -->
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
      <div class="filters__foo">
        <div
          v-for="option in options"
          :key="option.value"
          class="filters__option"
        >{{ option.label }}</div>
      </div>
    </div>
    <!-- <div class="filter-mask">
      <div
        v-for="option in options"
        :key="option.value"
        class="filters__option"
      >{{ option.label }}</div>
  </div> -->
  </fieldset>
</template>

<style>
.filters {
  --option-width: 120px;
  --option-gutter: var(--spacing-50);
  --option-gap: var(--spacing-100);

  border: var(--border);
  border-radius: 6px;
  display: flex;
  gap: var(--option-gap);
  padding: var(--option-gutter);
  position: relative;
  width: fit-content;
}
.filters__option {
  /* background-color: rgb(200 0 0 / 0.5); */
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  /* width: 12ch; */
  width: var(--option-width);
  min-width: var(--option-width);
  font-size: 1rem;

  &:has(:checked) span {
    /* color: #000; */
  }
}

.filters__backing {
  background-color: var(--colour-pos);
  /* background-color: #00f; */
  display: flex;
  height: 40px;
  justify-content: center;
  /* width: 12ch; */
  width: 120px;
  /* min-width: 120px; */
  position: absolute;
  /* z-index: -1; */
  left: var(--option-gutter);
  transition: left 0.3s ease-in-out;

  overflow: clip;
  color: #111;
}

.filters__foo {
  display: flex;
  gap: var(--spacing-100);
  /* padding: var(--spacing-50); */
  position: absolute;
  inset: 0;
  overflow: clip;
  pointer-events: none;
  min-width: 800px;
  transition: left 0.3s ease-in-out;
}

.filters {
  &:has([data-index="1"]:checked) .filters__backing {
    left: calc(var(--option-gutter) + var(--option-gap) + var(--option-width));
  }
  &:has([data-index="1"]:checked) .filters__foo {
    /* transform: translateX(calc((var(--option-gutter) + var(--option-gap) + var(--option-width)) * -1)); */
    /* transform: translateX(-134px) */
    /* transform: translateX(calc((var(--option-gap) + var(--option-width)) * -1)); */
    left: calc((var(--option-gap) + var(--option-width)) * -1);
  }
  &:has([data-index="2"]:checked) .filters__backing {
    left: calc(var(--option-gutter) + ((var(--option-gap) + var(--option-width)) * 2));
  }
  &:has([data-index="2"]:checked) .filters__foo {
    /* transform: translateX(calc((var(--option-gutter) + var(--option-gap) + var(--option-width)) * -1)); */
    /* transform: translateX(-134px) */
    /* transform: translateX(calc((var(--option-gap) + var(--option-width)) * -2)); */
    left: calc((var(--option-gap) + var(--option-width)) * -2);
  }
}

.filter-mask {
  background-color: rgb(0 200 0 / 0.5);
  color: #f00;
  height: 30px;
  width: 50px;

  display: flex;
  gap: var(--spacing-100);
  padding: var(--spacing-50);
  position: absolute;
  inset: 0;
  overflow: clip;
  pointer-events: none;

  /* &:after {
    content: "";
    display: block;
    width: 80px;
    height: 80px;
    position: absolute;
    left: 100px;
    background-color: #0ff;
  } */

  & .filters__option {
    background-color: #00f;
    color: #000;
  }
  /* overflow: hidden; */
}
/* .mark-obj {
  white-space: nowrap;
} */
</style>
