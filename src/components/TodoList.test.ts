import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
// import { nextTick } from 'vue'
import TodoList from './TodoList.vue'

import type { Todo } from '../types'

describe('<TodoList />', () => {
  const todos: Todo[] = [
      { id: '1', title: 'Item 1', done: false },
      { id: '2', title: 'Item 2', done: true },
      { id: '3', title: 'Item 3', done: false }
    ]

  test('will render', () => {
    const { getByRole, queryAllByRole } = render(TodoList, { props: { todos } })
    expect(getByRole('list', { name: 'To do item list' })).toBeInTheDocument()
    expect(queryAllByRole('listitem').length).toBe(3)
  })

  test('will handle no items', () => {
    const { queryByRole } = render(TodoList, { props: { todos: [] } })
    expect(queryByRole('list', { name: 'To do item list' })).not.toBeInTheDocument()
  })

  test('can toggle items', async () => {
    const { getByLabelText, emitted } = render(TodoList, { props: { todos } })
     await userEvent.click(getByLabelText('Item 1'))
     expect(emitted().toggle).toStrictEqual([['1']])
  })

  // Delete doesn't delete...
  // test('xxx', async () => {
  //   const { getByRole, emitted } = render(TodoList, { props: { todos } })
  //   // expect(getByRole('button', { description: 'Item 1x' })).toBeInTheDocument()
  //    await userEvent.click(getByRole('button', { name: 'Delete task', description: 'Item 1' }))
  //    expect(emitted().remove).toStrictEqual([['1']])
  // })

  test('handle arrow keys', async () => {
    const { getByLabelText } = render(TodoList, { props: { todos } })

    // start on item 1
    const firstItem = getByLabelText('Item 1')
    firstItem.focus()

    // Down arrow takes to the second item
    await userEvent.keyboard('{ArrowDown}')
    expect(getByLabelText('Item 2')).toHaveFocus()

    // Up arrow takes us back to the first item
    await userEvent.keyboard('{ArrowUp}')
    expect(getByLabelText('Item 1')).toHaveFocus()

    // Page down takes us to the last item
    fireEvent.keyDown(getByLabelText('Item 1'), { key: 'PageDown' })
    expect(getByLabelText('Item 3')).toHaveFocus()

    // Page up takes us to the first item
    fireEvent.keyDown(getByLabelText('Item 1'), { key: 'PageUp' })
    expect(getByLabelText('Item 1')).toHaveFocus()
  })
})
