import { EVENT_TOAST_ADDED, TOAST_TYPE_ERROR, TOAST_TYPE_INFO, TOAST_TYPE_SUCCESS, TOAST_TYPE_WARNING } from './constants'
import store from './store'

const toast = (toast) => {
  store.dispatch({ type: EVENT_TOAST_ADDED, toast: toast })
}

export const toastr = {
  success: (message, timeout) => {
    toast({ type: TOAST_TYPE_SUCCESS, message: message, timeout: timeout })
  },
  info: (message, timeout) => {
    toast({ type: TOAST_TYPE_INFO, message: message, timeout: timeout })
  },
  warning: (message, timeout) => {
    toast({ type: TOAST_TYPE_WARNING, message: message, timeout: timeout })
  },
  error: (message, timeout) => {
    toast({ type: TOAST_TYPE_ERROR, message: message, timeout: timeout })
  },
  custom: (descriptor, timeout) => {
    toast({ descriptor: descriptor, timeout: timeout })
  }
}