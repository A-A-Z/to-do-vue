import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

const STORAGE_KEY_THEME = 'todo-theme'

export const useTheme = (): Ref<string> => {
  const theme = ref<string>('night')

  onMounted(() => {
    // Restore persisted theme choice if user set one previously.
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME)
    if (savedTheme !== null) {
      theme.value = savedTheme
    }
  })

  watch(
    theme,
    value => {
      // Persist every change so a reload uses the same theme.
      localStorage.setItem(STORAGE_KEY_THEME, value)
    }
  )

  return theme
}
