import { ADD_TODO } from '../actiontypes'

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  }
}
