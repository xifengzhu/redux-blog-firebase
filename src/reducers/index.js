import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import post from './post';
import posts from './posts';
import auth from './auth';

const rootReducer = combineReducers({
  post,
  posts,
  auth,
  routing: routerReducer
});

export default rootReducer;
