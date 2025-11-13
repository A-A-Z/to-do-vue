<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add-todo', title: string): void
}>()

const title = ref('')

function submit(): void {
  const value = title.value.trim()
  if (value === '') return
  emit('add-todo', value)
  title.value = ''
}
</script>

<template>
  <form class="input" @submit.prevent="submit">
    <input
      v-model="title"
      type="text"
      class="input__field focus"
      placeholder="New item"
      aria-label="New to do item"
    />
    <button
      type="submit"
      class="input__submit focus"
      aria-label="Add item"
    >
      <span class="icon-plus"></span>
    </button>
  </form>
</template>

<style scoped>
.input {
  display: flex;
  gap: var(--spacing-100);
  margin-block-end: var(--spacing-100);
}
.input__field {
  background-color: var(--colour-neg);
  border: 2px solid var(--colour-pos);
  border-radius: 6px;
  box-sizing: border-box;
  color: var(--colour-pos);
  flex-grow: 1;
  font: inherit;
  font-size: 1.2rem;
  height: var(--item-height);
  padding: 0 var(--spacing-50);

  &::placeholder {
    color: var(--colour-pos);
  }
}

.input__submit {
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: var(--colour-pos);
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  height: var(--item-height);
  justify-content: center;
  width: var(--item-height);
}

.icon-plus {
  --icon-size: 14px;
  --icon-line: 3px;

  aspect-ratio: 1 / 2;
  color: var(--colour-neg);
  display: block;
  height: 1px;
  margin: -1px 0 0 calc(var(--icon-size) * -1);
  position: relative;
  width: 1px;
}
.icon-plus:before {
  content: '';
  position: absolute;
  width: var(--icon-size);
  height: var(--icon-line);
  background-color: currentColor;
}
.icon-plus:after {
  content: '';
  position: absolute;
  width: var(--icon-size);
  height: var(--icon-line);
  background-color: currentColor;
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}


</style>
