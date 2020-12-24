import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Route, Switch, BrowserRouter, HashRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Provider } from 'react-redux';
import './styles.css';

import http from './helpers/axios-helper';
import store from './store/store';
import { PrivateRoute } from './helpers/PrivateRoute';
import { Login } from './views/account/Login';
import { App } from './views/app/App';
import { Register } from './views/account/Register';

const hist = createBrowserHistory();

http.get('/session')
  .then(function (response) {

    store.dispatch({ type: 'SET_TENANT', tenantId: response.data.tenantId });
    store.dispatch({ type: 'SET_USER', userId: response.data.userId });

    ReactDOM.render(
      <Provider store={store}>
        <HashRouter history={hist} basename='/'>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/app' component={App} />
            <Redirect from='/' to='/app' />
          </Switch>
        </HashRouter>
      </Provider>,
      document.getElementById('root')
    );
  });