import React, { useEffect, useRef, useState } from 'react'
import { EVENT_TOAST_ADDED, TOAST_TYPE_ERROR, TOAST_TYPE_INFO, TOAST_TYPE_SUCCESS, TOAST_TYPE_WARNING } from './constants'
import store from './store'

import '../../assets/styles/feasible-ui.css'

export const Toastr = (props) => {

  const timeout = props.timeout ?? 10000

  const [toasts, setToasts] = useState([])
  const toastsRef = useRef()
  toastsRef.current = toasts

  useEffect(() => {
    const unsubscribe =
      store.subscribe(() => {

        let data = store.getState().data

        if (data.type === EVENT_TOAST_ADDED) {
          showToast(data.toast)
        }
      })

    return () => {
      unsubscribe()
    }
  }, [])

  const addToast = (toast) => {
    setToasts(oldItems => [...oldItems, toast])
  }

  const removeToast = (toast) => {
    setToasts(toastsRef.current.filter(item => item !== toast))
  }

  const isPermanent = (toast) => toast.hasOwnProperty('timeout') && toast.timeout === 0

  const showToast = (toast) => {
    addToast(toast)
    if (!isPermanent(toast)) {
      setTimeout(() => {
        removeToast(toast)
      }, toast.timeout ? toast.timeout : timeout)
    }
  }

  const getClassName = (toast) => {
    let classes = ['toast', toast.type]
    return classes.join(' ')
  }

  const getHeading = (toast) => {
    switch (toast.type) {
      case TOAST_TYPE_SUCCESS:
        return 'Success!'
      case TOAST_TYPE_ERROR:
        return 'Error'
      case TOAST_TYPE_INFO:
        return 'Info'
      case TOAST_TYPE_WARNING:
        return 'Warning'
      default:
        return
    }
  }

  return (
    <React.Fragment>
      {toasts && toasts.length > 0 &&
        <div className='toastr-container'>
          {toasts.map((toast, i) => {

            if (toast.descriptor &&
              toast.descriptor.template) {
              const Template = toast.descriptor.template

              return (
                <Template
                  descriptor={toast.descriptor}
                  close={() => { removeToast(toast) }}
                  key={i}
                />
              )
            } else {
              return (
                <div
                  className={getClassName(toast)}
                  onClick={() => { removeToast(toast) }}
                  key={i}
                >
                  <div className='toast-heading'>{getHeading(toast)}</div>
                  <div className='toast-text'>{toast.message}</div>
                </div>
              )
            }
          })}
        </div>
      }
    </React.Fragment>
  )
}