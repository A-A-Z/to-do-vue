import { describe, test, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { defineComponent, nextTick } from 'vue'
import { useTheme } from './useTheme'

const renderUseThemeHarness = () => {
  const Harness = defineComponent({
    name: 'UseThemeHarness',
    setup() {
      const theme = useTheme()
      const setTheme = (value: string) => {
        theme.value = value
      }

      return { theme, setTheme }
    },
    template: `
      <div>
        <p role="status">{{ theme }}</p>
        <button type="button" @click="setTheme('day')">Switch theme</button>
      </div>
    `
  })

  return render(Harness)
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('defaults to night theme and saves updates', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderUseThemeHarness()

    await nextTick()
    expect(getByRole('status')).toHaveTextContent('night')

    await user.click(getByRole('button', { name: 'Switch theme' }))
    await nextTick()

    expect(getByRole('status')).toHaveTextContent('day')
    expect(localStorage.getItem('todo-theme')).toBe('day')
  })

  test('restores saved theme on mount', async () => {
    localStorage.setItem('todo-theme', 'day')
    const { getByRole } = renderUseThemeHarness()

    await nextTick()
    expect(getByRole('status')).toHaveTextContent('day')
  })
})
