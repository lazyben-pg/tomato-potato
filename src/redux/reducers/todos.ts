import { ADD_TODO } from '../actiontypes'

export default (state: any[], action: any) => {
  state = state || [];
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state]
    default:
      return state
  }
}