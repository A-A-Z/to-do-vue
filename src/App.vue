<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
import ThemeSelect from './components/ThemeSelect.vue'
import { createId } from './utils/createId'
import { useTheme } from './composables/useTheme'
import './assets/themes.css'

import type { Todo, TodoFilter } from './types'

/* TODO:

Must:

- [x] Arrow keys on item list
- [ ] Fix style trans on filter change
- [x] Theme selector
- [x] Footer
- [x] Fix layout
- [ ] Unit testing

Optional:

- [ ] More themes
- [ ] Search

*/

const APP_NAME = 'ToDoVue'
const STORAGE_KEY_ITEMS = 'todo-items'

const todos = ref<Todo[]>([])
const filter = ref<TodoFilter>('all')
const theme = useTheme()

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
})

// persist to localStorage
watch(
  todos,
  value => {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(value))

    // update page title based on todo state
    if (todos.value.length === 0) {
      document.title = `${APP_NAME}: No items.`
      return
    }
    const doneCount = todos.value.filter(({ done }) => done).length
    document.title = `${APP_NAME}: ${doneCount}/${todos.value.length} tasks`
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
  <main class="app" :data-theme="theme">
    <ThemeSelect v-model:theme="theme" />
    <section class="card">

      <header class="header">
        <h1 class="header__title">ToDoVue</h1>
        <TodoFilters v-model:filter="filter" />
      </header>

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
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-block-start: var(--spacing-300);
}

.header__title {
  font-size: 2.2rem;
  margin: 0;
  padding: 0;
}

.card {
  margin: auto;
  width: clamp(100px, 100vw, 500px);
}
</style>
