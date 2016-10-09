import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers'

const logger = createLogger();
const router = routerMiddleware(browserHistory);

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, promise, logger, router)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
