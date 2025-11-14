<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { Todo } from '../types'

const props = defineProps<{
  index: number
  todo: Todo
}>()

const inputRef = useTemplateRef<HTMLInputElement>('input-ref')

defineExpose({
  // expose the input so we can manage focus
  inputRef
})

const isDeleted = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string, index: number): void
  (e: 'keydown', key: string, index: number): void
}>()

const toggle = (): void => {
  emit('toggle', props.todo.id)
}

const handleKeyDown = (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'Enter':
      emit('toggle', props.todo.id)
      break

    case 'Backspace':
    case 'Delete':
      isDeleted.value = true
      break

    default:
      emit('keydown', event.key, props.index)
  }
}

const remove = (): void => {
  // because we want a delete animation to play we first just mark the item as deleted...
  isDeleted.value = true
}

const handleDelete = (event: AnimationEvent): void => {
  if (event.animationName === 'slide-out') {
    // ...then we delete it for real once the animation is done.
    emit('remove', props.todo.id, props.index)
  }
}
</script>

<template>
  <li
    class="item"
    :class="{ 'item--new': props.todo.isNew, 'item--deleted': isDeleted }"
    v-on:animationend="handleDelete"
  >
    <label class="item__label focus">
      <input
        ref="input-ref"
        :id="props.todo.id"
        type="checkbox"
        class="visually-hidden"
        :checked="props.todo.done"
        :onkeydown="handleKeyDown"
        :disabled="isDeleted"
        @change="toggle"
      />
      <span class="item__check"></span>
      <span
        :id="`${props.todo.id}-text`"
        class="item__title"
        :class="{ 'item__title--done': props.todo.done }"
      >
        {{ props.index }} - {{ props.todo.title }}
      </span>
    </label>
    <button
      type="button"
      class="item__remove focus"
      @click="remove"
      :disabled="isDeleted"
      aria-label="Delete task"
      :aria-describedby="`${props.todo.id}-text`"
    >
      <span class="icon-remove"></span>
    </button>
  </li>
</template>

<style>
@keyframes slide-in {
  0% {
    translate: 0 32px;
    scale: 100% 0.01;
    margin-top: -48px;
  }

  100% {
    translate: 0 0;
    scale: 100% 1;
    margin-top: 0;
  }
}

@keyframes slide-out {
  0% {
    translate: 0 0;
    scale: 100% 1;
    margin-top: 0;
  }

  100% {
    translate: 0 32px;
    scale: 100% 0.01;
    margin-top: -48px;
  }
}

.item {
  display: flex;
  gap: var(--spacing-100);
  justify-content: space-between;
  width: 100%;
}
.item--new {
  animation-duration: 0.3s;
  animation-name: slide-in;
  animation-timing-function: ease-out;
}
.item--deleted {
  animation-duration: 0.2s;
  animation-name: slide-out;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}

.item__label {
  align-items: center;
  background-color: var(--colour-pos);
  border-radius: 6px;
  color: var(--colour-neg);
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  font-size: 1.2rem;
  gap: var(--spacing-100);
  height: var(--item-height);
  overflow: hidden;
  padding: 0 var(--spacing-50);
  width: inherit;
}

.item__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - (20px + 16px));
}

.item__check {
  aspect-ratio: 1 / 1;
  background-color: var(--colour-pos);
  border-radius: 4px;
  box-shadow: inset 0 0 0 10px var(--colour-neg);
  display: inline-block;
  transition: box-shadow 0.1s ease-out;
  width: 20px;
}
.item__label:has(:checked) .item__check {
  box-shadow: inset 0 0 0 3px var(--colour-neg);
}

.item__remove {
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

.icon-remove {
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
.icon-remove:before {
  content: "";
  position: absolute;
  width: var(--icon-size);
  height: var(--icon-line);
  background-color: currentColor;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}
.icon-remove:after {
  content: "";
  position: absolute;
  width: var(--icon-size);
  height: var(--icon-line);
  background-color: currentColor;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

</style>
