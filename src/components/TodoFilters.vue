<script setup>
const props = defineProps({
  filter: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:filter'])

function setFilter(value) {
  emit('update:filter', value)
}
</script>

<template>
  <div class="filters">
    <button
      type="button"
      class="filters__btn"
      :class="{ 'filters__btn--active': filter === 'all' }"
      @click="setFilter('all')"
    >
      All
    </button>
    <button
      type="button"
      class="filters__btn"
      :class="{ 'filters__btn--active': filter === 'active' }"
      @click="setFilter('active')"
    >
      Active
    </button>
    <button
      type="button"
      class="filters__btn"
      :class="{ 'filters__btn--active': filter === 'completed' }"
      @click="setFilter('completed')"
    >
      Completed
    </button>
  </div>
</template>
