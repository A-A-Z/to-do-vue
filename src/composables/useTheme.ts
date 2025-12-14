import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'

const STORAGE_KEY_THEME = 'todo-theme'

export const useTheme = (): Ref<string> => {
  const theme = ref<string>('night')

  onMounted(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME)
    if (savedTheme !== null) {
      theme.value = savedTheme
    }
  })

  watch(
    theme,
    value => {
      localStorage.setItem(STORAGE_KEY_THEME, value)
    }
  )

  return theme
}
