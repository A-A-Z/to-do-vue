export type TodoFilter = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  title: string
  done: boolean
  isNew?: boolean
}
