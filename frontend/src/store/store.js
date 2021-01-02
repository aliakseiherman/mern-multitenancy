import { createStore, combineReducers } from 'redux';

function data(state = {}, action) {
  switch (action.type) {
    case 'SET_TENANT':
      state.tenantId = action.tenantId;
      return state;
    case 'SET_USER':
      state.userId = action.userId;
      return state;
    default:
      return state;
  }
}

function bus(state = {}, action) {
  switch (action.type) {
    case 'NOTIFY':
      state.message = action.message;
      state.variant = action.variant;
      return state;
    default:
      return state;
  }
}

const reducer = combineReducers({ data, bus });

const store = createStore(reducer);

export default store;