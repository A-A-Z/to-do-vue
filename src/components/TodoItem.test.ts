import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import TodoItem from './TodoItem.vue'

describe('<TodoItem />', () => {
  test('will render', () => {
    const { getByLabelText } = render(TodoItem, {
      props: {
        index: 0,
        todo: { id: 'x', title: 'This is a test', done: false }
      }
    })
    expect(getByLabelText('This is a test')).toBeInTheDocument()
  })
})
