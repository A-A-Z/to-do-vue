import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import TodoInput from './TodoInput.vue'

describe('<TodoInput />', () => {
  const inputLabel = 'New to do item'
  const value = '123'

  test('will render', () => {
    const { getByLabelText, getByRole } = render(TodoInput)
    expect(getByLabelText(inputLabel)).toBeInTheDocument()
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  test('handle user input', async () => {
    const { getByLabelText } = render(TodoInput)
    const input = getByLabelText(inputLabel)
    await userEvent.type(input, value)
    expect(input).toHaveValue(value)
  })

  test('handle clicking submit button', async () => {
    const { getByLabelText, getByRole, emitted } = render(TodoInput)
    const input = getByLabelText(inputLabel)
    const submit = getByRole('button', { name: 'Submit' })

    // submitting while blank will do nothing
    await userEvent.click(submit)

    expect(emitted()['add-todo']).toBe(undefined)

    // add value to input
    await userEvent.type(input, value)

    // now clicked submit will emit event and clear value
    await userEvent.click(submit)
    expect(emitted()['add-todo']).toStrictEqual([[value]])
    expect(input).toHaveValue('')
  })
})
