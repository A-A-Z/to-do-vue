<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import { createId } from './utils/createId'
import './assets/themes.css'

import type { Todo, TodoFilter } from './types'

const STORAGE_KEY = 'to-do-vue-app'

const todos = ref<Todo[]>([])
const filter = ref<TodoFilter>('all')

// load from localStorage
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved !== null) {
    try {
      const parsed = JSON.parse(saved) as Todo[]
      // naive validation
      if (Array.isArray(parsed)) {
        todos.value = parsed.map(item => ({ ...item, isNew: false }))
      }
    } catch {
      todos.value = []
    }
  }
})

// persist to localStorage
watch(
  todos,
  value => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

const filteredTodos = computed<Todo[]>(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(({ done }) => !done)

    case 'completed':
      return todos.value.filter(({ done }) => done)

    default:
      return todos.value
  }
})

const remainingCount = computed<number>(
  () => todos.value.filter(({ done }) => !done).length
)

const hasCompleted = computed<boolean>(
  () => todos.value.some(({ done }) => done)
)

const addTodo = (title: string): void => {
  const trimmed = title.trim()
  if (trimmed === '') return

  todos.value.push({
    id: createId(),
    title: trimmed,
    done: false,
    isNew: true
  })
}

const toggleTodo = (id: string): void => {
  const todo = todos.value.find(item => item.id === id)
  if (todo !== undefined) {
    todo.done = !todo.done
  }
}

const removeTodo = (id: string): void => {
  todos.value = todos.value.filter(item => item.id !== id)
}

const clearCompleted = (): void => {
  todos.value = todos.value.filter(({ done }) => !done)
}
</script>

<template>
  <main class="app" data-theme="night">
    <section class="card">
      <h1 class="app__title">ToDoVue</h1>

      <TodoFilters v-model:filter="filter" />

      <TodoList
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />

      <TodoInput @add-todo="addTodo" />

      <TodoFooter
        :remaining-count="remainingCount"
        :has-completed="hasCompleted"
        @clear-completed="clearCompleted"
      />
    </section>
  </main>
</template>

<style scoped>
.card {
  margin: auto;
  width: 500px;
}
</style>
