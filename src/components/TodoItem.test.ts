import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
import { nextTick } from 'vue'
// import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem.vue'

describe('<TodoItem />', () => {
  const itemId = 'foo'
  const itemTitle = 'This is a test'
  const props = {
      index: 0,
      todo: { id: itemId, title: itemTitle, done: false }
    }

  test('will render', () => {
    const { getByLabelText, getByRole } = render(TodoItem, { props })
    expect(getByLabelText(itemTitle)).not.toBeChecked()
    expect(getByRole('button', { name: 'Delete task' })).toBeInTheDocument()
  })

  test('will checked checkbox if isDone is true', () => {
    const { getByLabelText } = render(TodoItem, {
      props: {
        index: 0,
        todo: { id: itemId, title: itemTitle, done: true }
      }
    })
    expect(getByLabelText('This is a test')).toBeChecked()
  })

  test('clicking on checkbox will call toggle', () => {
    const { getByLabelText, emitted } = render(TodoItem, { props })
    const checkbox = getByLabelText(itemTitle)
    fireEvent.click(checkbox)

    expect(emitted().toggle).toStrictEqual([[itemId]])
  })

  test('enter key will call toggle', () => {
    const { getByLabelText, emitted } = render(TodoItem, { props })
    const checkbox = getByLabelText(itemTitle)
    checkbox.focus()
    fireEvent.keyDown(checkbox, { key: 'Enter' })

    expect(emitted().toggle).toStrictEqual([[itemId]])
  })

  test('clicking on delete button will mark item as deleted', async () => {
    const { getByRole } = render(TodoItem, { props })
    const deleteBtn = getByRole('button', { name: 'Delete task' })
    fireEvent.click(deleteBtn)
    await nextTick()

    const liEl = getByRole('listitem')
    expect(liEl).toHaveClass('item--deleted')

    // There seems to be an issue with fireEvent where the animation event can be correctly set
    // Commenting this out for now
    // const event = new Event('animationEnd', { animationName: 'slide-out' } as AnimationEvent)
    // fireEvent.animationEnd(liEl, event)
    // expect(emitted().remove).toStrictEqual([[itemId, 0]])
  })

  test('backspace key will mark item as deleted', async () => {
    const { getByLabelText, getByRole } = render(TodoItem, { props })
    const checkbox = getByLabelText(itemTitle)
    checkbox.focus()
    fireEvent.keyDown(checkbox, { key: 'Backspace' })
    await nextTick()

    const liEl = getByRole('listitem')
    expect(liEl).toHaveClass('item--deleted')
  })

  test('arrow key will emit a keydown event', () => {
    const { getByLabelText, emitted } = render(TodoItem, { props })
    const checkbox = getByLabelText(itemTitle)
    checkbox.focus()
    fireEvent.keyDown(checkbox, { key: 'ArrowDown' })

    expect(emitted().keydown).toStrictEqual([['ArrowDown', 0]])
  })
})
