import {
  POSTS_QERUEST, POSTS_SUCCESS, POSTS_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function post(state = initialState.posts, action) {
  switch (action.type) {
    case POSTS_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case POSTS_SUCCESS:
      return Object.assign({}, {
        data: action.posts,
        isFetching: false
      });
    case POSTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
}
