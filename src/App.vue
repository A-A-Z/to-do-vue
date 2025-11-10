<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'

const STORAGE_KEY = 'vue-3.5-todo-example'

// state
const todos = ref([])
/**
 * filter can be: "all", "active", "completed"
 */
const filter = ref('all')

// load from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      todos.value = JSON.parse(saved)
    } catch {
      todos.value = []
    }
  }
})

// persist to localStorage whenever todos change
watch(
  todos,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

// derived state
const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.done)
  }
  if (filter.value === 'completed') {
    return todos.value.filter(t => t.done)
  }
  return todos.value
})

const remainingCount = computed(
  () => todos.value.filter(t => !t.done).length
)

// actions
function addTodo(title) {
  const trimmed = title.trim()
  if (!trimmed) return

  todos.value.push({
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
    title: trimmed,
    done: false
  })
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function clearCompleted() {
  todos.value = todos.value.filter(t => !t.done)
}
</script>

<template>
  <main class="app">
    <h1 class="app__title">Vue 3.5 To-Do List</h1>

    <section class="card">
      <TodoInput @add-todo="addTodo" />

      <TodoFilters v-model:filter="filter" />

      <TodoList
        :todos="filteredTodos"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />

      <footer class="footer">
        <span>{{ remainingCount }} task<span v-if="remainingCount !== 1">s</span> left</span>
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
