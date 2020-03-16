import { ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO } from '../actiontypes'

export default (state: any[], action: any) => {
  state = state || [];
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state]
    case INIT_TOMATOES:
      return [...action.payload]
    case UPDATE_TOMATO:
      return state.map(t => t.id === action.payload.id ? action.payload : t)
    default:
      return state
  }
}