import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { logoutSaga, loginSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const SET_TENANT = 'SET_TENANT'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'

const initialState = {
  userId: null,
  tenantId: null,
}

function data(state = initialState, action) {
  switch (action.type) {
    case SET_TENANT:
      const { tenantId } = action.payload
      return {
        ...state,
        tenantId
      }
    case SET_USER:
      const { userId } = action.payload
      return {
        ...state,
        userId
      }
    case LOGOUT:
      return {
        ...state,
        userId: null
      }
    default:
      return state
  }
}

const reducer = combineReducers({ data })

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(logoutSaga)
sagaMiddleware.run(loginSaga)

export { store }