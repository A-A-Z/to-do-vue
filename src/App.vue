<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import ThemeSelect from './components/ThemeSelect.vue'
import { createId } from './utils/createId'
import './assets/themes.css'

import type { Todo, TodoFilter } from './types'

/* TODO:

Must:

- [x] Arrow keys on item list
- [ ] Fix style trans on filter change
- [x] Theme selector
- [x] Footer
- [ ] Fix layout
- [ ] Unit testing

Optional:

- [ ] More themes
- [ ] Search

*/

const STORAGE_KEY_ITEMS = 'todo-items'
const STORAGE_KEY_THEME = 'todo-theme'

const todos = ref<Todo[]>([])
const filter = ref<TodoFilter>('all')
const theme = ref<string>('night')

// load from localStorage
onMounted(() => {
  const savedItems = localStorage.getItem(STORAGE_KEY_ITEMS)
  if (savedItems !== null) {
    try {
      const parsed = JSON.parse(savedItems) as Todo[]
      if (Array.isArray(parsed)) {
        todos.value = parsed.map(item => ({ ...item, isNew: false }))
      }
    } catch {
      todos.value = []
    }
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME)
  if (savedTheme !== null) {
    theme.value = savedTheme
  }
})

// persist to localStorage
watch(
  todos,
  value => {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(value))
  },
  { deep: true }
)
watch(
  theme,
  value => {
    localStorage.setItem(STORAGE_KEY_THEME, value)
  }
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
  <main class="app" :data-theme="theme">
    <section class="card">
      <ThemeSelect v-model:theme="theme" />

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
.app__title {
  font-size: 3.5rem;
  margin: 0;
  padding: 0;
}

.card {
  margin: auto;
  width: clamp(100px, 100vw, 500px);
}
</style>
