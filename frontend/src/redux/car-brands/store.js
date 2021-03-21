import { createStore, combineReducers } from 'redux'
import carBrandsReducer from './reducers/car-brands'

const rootReducer = combineReducers({ carBrandsReducer })
const store = createStore(rootReducer)

export { store }