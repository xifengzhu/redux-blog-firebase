import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

import post from './post'
import posts from './posts'
import auth from './auth'

const rootReducer = combineReducers({
  post,
  posts,
  auth,
  routing: routerReducer,
  loadingBar: loadingBarReducer,
});

export default rootReducer;
