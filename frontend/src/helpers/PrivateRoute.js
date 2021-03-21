import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { store } from '../redux/user/store'

export const PrivateRoute = ({ component: Component, ...rest }) => {

  let isLoggedIn = !!store.getState().data.userId

  return (
    <Route {...rest} render={props => isLoggedIn
      ? (
        <Component key={props.match.params.id || 'empty'} {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    } />
  )
}