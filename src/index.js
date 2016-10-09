import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { startListeningToAuth } from './actions/auth'

import routers from './routers'

// load favicon.ico
require('./favicon.ico');

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// setup Firebase listeners
setTimeout(function(){
  store.dispatch( startListeningToAuth() )
})

render(
  <Provider store={store}>
    <Router history={history} routes={routers} />
  </Provider>,
  document.getElementById('root')
)
