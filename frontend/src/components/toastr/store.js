import { createStore, combineReducers } from 'redux'
import { EVENT_TOAST_ADDED } from './constants'

const data = (state = {}, action) => {
  switch (action.type) {
    case EVENT_TOAST_ADDED:
      state.type = action.type
      state.toast = action.toast
      state.timeout = action.timeout
      state.descriptor = action.descriptor
      return state
    default:
      return state
  }
}

const reducer = combineReducers({ data })

const store = createStore(reducer)

export default store