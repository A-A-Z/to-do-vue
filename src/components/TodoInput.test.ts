import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/vue'
// import { nextTick } from 'vue'
// import userEvent from '@testing-library/user-event'
import TodoInput from './TodoInput.vue'

describe('<TodoInput />', () => {

  test('will render', () => {
    const { getByLabelText, getByRole } = render(TodoInput)
    expect(getByLabelText('New to do item')).toBeInTheDocument()
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  // https://stackoverflow.com/questions/75367944/vue-3-vitest-test-v-model-on-input
  // test('will render', () => {
  //   const { getByLabelText, getByRole } = render(TodoInput)
  //   expect(getByLabelText('New to do item')).toBeInTheDocument()
  //   expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  // })
})
