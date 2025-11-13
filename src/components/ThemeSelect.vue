<script setup lang="ts">
import { computed } from 'vue'
import { THEMES } from '../constants'

const props = defineProps<{
  theme: string
}>()

const emit = defineEmits<{
  'update:theme': [value: string]
}>()

const model = computed<string>({
  get: () => props.theme,
  set: (value) => emit('update:theme', value)
})
</script>

<template>
<div class="theme-select">
  <label for="theme-select">Theme:</label>
  <select id="theme-select" class="theme-select__input focus" v-model="model">
    <option
      v-for="[index, label] in Object.entries(THEMES)"
      :key="index"
      :value="index"
    >{{ label }}</option>
  </select>
</div>
</template>

<style scoped>
.theme-select {
  align-items: center;
  display: flex;
  gap: 0.5rem;
  inset: 5px 5px auto auto;
  position: fixed;
}

.theme-select__input {
  border: 0;
  border-radius: 6px;
  padding: 2px;

  &, &::picker(select) {
    appearance: base-select;    
  }

  & option {
    background-color: var(--colour-pos);
    color: var(--colour-neg);

    &:hover {
      background-color: var(--colour-neg);
    color: var(--colour-pos);
    }
  }
}
</style>
