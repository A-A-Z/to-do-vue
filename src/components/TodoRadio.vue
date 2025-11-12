<script setup lang="ts">
const props = defineProps<{
  name: string
  value: string
  modelValue: string
  label: string
  index: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onChange(): void {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label class="filters__option">
    <input
      class="visually-hidden"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="onChange"
      :data-index="props.index"
    />
    <span>{{ label }}</span>
  </label>
</template>

<style>

</style>