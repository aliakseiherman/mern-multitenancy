import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { Provider } from 'react-redux'
import './styles.css'

import http from './helpers/axios-helper'
import { store as userStore, SET_TENANT, SET_USER } from './redux/user/store'
import { store as carBrandsStore } from './redux/car-brands/store'
import { PrivateRoute } from './helpers/PrivateRoute'
import { Login } from './views/account/Login'
import App from './views/app/App'
import { Register } from './views/account/Register'

const hist = createBrowserHistory()

http.get('/session')
  .then(function (response) {

    userStore.dispatch({
      type: SET_TENANT,
      payload: {
        tenantId: response.data.tenantId
      }
    })
    userStore.dispatch({
      type: SET_USER,
      payload: {
        userId: response.data.userId
      }
    })

    ReactDOM.render(
      <Provider store={userStore}>
        <Provider store={carBrandsStore}>
          <HashRouter history={hist} basename='/'>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <PrivateRoute path='/app' component={App} />
              <Redirect from='/' to='/app' />
            </Switch>
          </HashRouter>
        </Provider>
      </Provider>,
      document.getElementById('root')
    )
  })