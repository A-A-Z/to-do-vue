<script setup lang="ts">
import { useTemplateRef } from 'vue'
import TodoItem from './TodoItem.vue'

import type { Todo } from '../types'

const { todos } = defineProps<{
  todos: Todo[]
}>()

type ItemType = InstanceType<typeof TodoItem>
const itemRefs = useTemplateRef<ItemType[]>('items')

const emit = defineEmits<{
  (e: 'toggle', id: string): void
  (e: 'remove', id: string): void
}>()

const handleToggle = (id: string): void => {
  emit('toggle', id)
}

const handleRemove = (id: string, index: number): void => {
  emit('remove', id)

  if (itemRefs.value === null) return

  // after delete we should focus on the next item in the list.
  const next = itemRefs.value.find(item => item.$props.index === (index + 1))
  if (next !== undefined) { 
    next?.inputRef?.focus()
    return
  }
  
  // No next item?  Then try to focus on the prevous item.
  const pre = itemRefs.value.find(item => item.$props.index === (index - 1))
  pre?.inputRef?.focus()
}

// hanlde arrow keys
const handleKeydown = (key: string, index: number): void => {
  if (itemRefs.value === null || itemRefs.value.length === 0) return
  const refCount = itemRefs.value.length

  switch (key) {
    case 'ArrowUp':
      // we have to do it this way because the refs might not be in order
      const prev = itemRefs.value.find(item => item.$props.index === (index - 1))
      prev?.inputRef?.focus()
      break

    case 'ArrowDown':
      const next = itemRefs.value.find(item => item.$props.index === (index + 1))
      next?.inputRef?.focus()
      break

    case 'PageUp':
      const first = itemRefs.value.find(item => item.$props.index === 0)
      first?.inputRef?.focus()
      break

    case 'PageDown':
      const last = itemRefs.value.find(item => item.$props.index === (refCount - 1))
      last?.inputRef?.focus()
      break
  }
}
</script>

<template>
  <ul v-if="todos.length" class="list">
    <TodoItem
      v-for="(todo, index) in todos"
      ref="items"
      :key="todo.id"
      :index="index"
      :todo="todo"
      @toggle="handleToggle"
      @remove="handleRemove"
      @keydown="handleKeydown"
    />
  </ul>
  <div v-else class="empty"></div>
</template>

<style scoped>
.list {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
  list-style-type: none;
  margin: 0;
  padding: var(--spacing-100) 0;
}

.empty {
  height: var(--spacing-100);
}
</style>
