import {
  LOGIN_QERUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from './../constants/actionTypes';
import initialState from './initialState';

export default function auth(state = initialState.auth, action) {
  switch (action.type) {
    case LOGIN_QERUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, {
        currentUser: action.user,
        isAuth: true,
        isFetching: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
}
