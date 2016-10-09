import {
  POST_QERUEST, POST_SUCCESS, POST_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function post(state = initialState.post, action) {
  switch (action.type) {
    case POST_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case POST_SUCCESS:
      return Object.assign({}, {
        data: action.post,
        isFetching: false
      });
    case POST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state;
  }
}
