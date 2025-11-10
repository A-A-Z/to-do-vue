<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import TodoInput from './components/TodoInput.vue' // './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import { createId } from './utils/createId'
import type { Todo, TodoFilter } from './types'

const STORAGE_KEY = 'vue-3.5-todo-example'

const todos = ref<Todo[]>([])
const filter = ref<TodoFilter>('all')

// load from localStorage
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as Todo[]
      // naive validation
      if (Array.isArray(parsed)) {
        todos.value = parsed
      }
    } catch {
      todos.value = []
    }
  }
})

// persist to localStorage
watch(
  todos,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

const filteredTodos = computed<Todo[]>(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(t => !t.done)
    case 'completed':
      return todos.value.filter(t => t.done)
    default:
      return todos.value
  }
})

const remainingCount = computed<number>(
  () => todos.value.filter(t => !t.done).length
)

function addTodo(title: string): void {
  const trimmed = title.trim()
  if (!trimmed) return

  todos.value.push({
    id: createId(),
    title: trimmed,
    done: false
  })
}

function toggleTodo(id: string): void {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

function removeTodo(id: string): void {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearCompleted(): void {
  todos.value = todos.value.filter(t => !t.done)
}
</script>

<template>
  <main class="app">
    <section class="card">
      <h1 class="app__title">ToDoVue</h1>

      <TodoFilters v-model:filter="filter" />

      <TodoList
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />

      <TodoInput @add-todo="addTodo" />

      <footer class="footer">
        <span>
          {{ remainingCount }} task<span v-if="remainingCount !== 1">s</span> left
        </span>
        <button
          class="btn-link"
          type="button"
          @click="clearCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </main>
</template>
