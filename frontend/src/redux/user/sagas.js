import { takeEvery } from 'redux-saga/effects'
import { LOGOUT, SET_USER } from './store'

function* logoutSaga() {
  yield takeEvery(LOGOUT, (action) => {
    localStorage.removeItem('token')
    window.location.hash = '#/login'
  })
}

function* loginSaga() {
  yield takeEvery(SET_USER, (action) => {
    window.location.hash = '#/app'
  })
}

export { logoutSaga, loginSaga }