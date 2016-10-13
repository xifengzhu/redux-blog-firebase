import {
  LOGIN_QERUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_QERUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from './../constants/actionTypes';
import { firebaseRef } from "../initFirebase"

export function login(params) {
  return dispatch => {
    dispatch({type: LOGIN_QERUEST})
    return firebaseRef.auth()
      .signInWithEmailAndPassword(params['email'], params['password'])
      .then((user) => {
        dispatch({type: LOGIN_SUCCESS, user })
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        dispatch({type: LOGIN_FAILURE, errorMessage})
      })
  }
}

export function signup(params) {
  return dispatch => {
    dispatch({type: SIGNUP_QERUEST})
    return firebaseRef.auth()
      .createUserWithEmailAndPassword(params['email'], params['password'])
      .then((user) => {
        user.updateProfile({displayName: params['username']});
        dispatch({type: SIGNUP_SUCCESS, user })
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        dispatch({type: SIGNUP_FAILURE, errorMessage})
      })
  }
}

export function startListeningToAuth(){
  return dispatch => {
    return firebaseRef.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({type: LOGIN_SUCCESS, user })
      }
    })
  }
}
