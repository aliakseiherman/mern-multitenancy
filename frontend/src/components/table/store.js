import { createStore, combineReducers } from 'redux'
import { EVENT_COLUMN_CHANGED, EVENT_DIRECTION_CHANGED, EVENT_HEADER_CELL_CLICKED, EVENT_PAGE_CHANGED, EVENT_SIZE_CHANGED } from './constants'

function data(state = {}, action) {
  switch (action.type) {
    case EVENT_COLUMN_CHANGED:
      state.type = action.type
      state.orderByColumn = action.orderByColumn
      return state
    case EVENT_DIRECTION_CHANGED:
      state.type = action.type
      state.orderDirection = action.orderDirection
      return state
    default:
      return state
  }
}

function bus(state = {}, action) {
  switch (action.type) {
    case EVENT_HEADER_CELL_CLICKED:
      state.type = action.type
      state.tableGuid = action.tableGuid
      state.columnName = action.columnName
      state.orderDirection = action.orderDirection
      return state
    case EVENT_SIZE_CHANGED:
      state.type = action.type
      state.tableGuid = action.tableGuid
      state.size = action.size
      return state
    case EVENT_PAGE_CHANGED:
      state.type = action.type
      state.tableGuid = action.tableGuid
      state.number = action.number
      return state
    default:
      return state
  }
}

const reducer = combineReducers({ data, bus })

const store = createStore(reducer)

export default store