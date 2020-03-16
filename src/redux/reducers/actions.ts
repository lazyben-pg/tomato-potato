import { ADD_TODO, UPDATE_TODO, INIT_TODOS, EDIT_TODO, ADD_TOMATO, INIT_TOMATOES } from '../actiontypes'

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload
  }
}

export const updateTodo = (payload: any) => {
  return {
    type: UPDATE_TODO,
    payload
  }
}

export const initTodos = (payload: []) => {
  return {
    type: INIT_TODOS,
    payload
  }
}

export const editTodo = (payload: number) => {
  return {
    type: EDIT_TODO,
    payload
  }
}

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload
  }
}

export const initTomatoes = (payload: []) => {
  return {
    type: INIT_TOMATOES,
    payload
  }
}