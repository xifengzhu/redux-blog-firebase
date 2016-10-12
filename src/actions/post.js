import {
  POST_QERUEST, POST_SUCCESS, POST_FAILURE,
  POSTS_QERUEST, POSTS_SUCCESS, POSTS_FAILURE
} from './../constants/actionTypes'
import { push } from 'react-router-redux'
import { FirebaseBaseRef } from "../initFirebase"
import firebase from 'firebase'
import { showLoading, hideLoading } from 'react-redux-loading-bar'


const postsFirebaseRef = FirebaseBaseRef.ref("posts")

export function fetchPost(id) {
  return dispatch => {
    dispatch(showLoading())
    dispatch({type: POST_QERUEST})
    return postsFirebaseRef.child(id).on("value", (snapshot) => {
      let post = snapshot.val()
      dispatch({type: POST_SUCCESS, post })
      dispatch(hideLoading())
    }, (errorObject) => {
      const errorMessage = errorObject.message
      dispatch({type: POST_FAILURE, errorMessage})
      dispatch(hideLoading())
      console.log("The read failed: " + errorMessage)
    })
  }
}

export function createPost(params) {
  return dispatch => {
    dispatch({type: POSTS_QERUEST})
    dispatch(showLoading())
    const newPostRef = postsFirebaseRef.push()
    return newPostRef.set({
      id: newPostRef.key,
      created_at: firebase.database.ServerValue.TIMESTAMP,
      ...params
    }, (errorMessage) => {
      if(!errorMessage){
        dispatch({type: POSTS_SUCCESS })
        dispatch(push(`/posts/${ newPostRef.key }`))
      } else {
        dispatch({type: POSTS_FAILURE, errorMessage})
      }
      dispatch(hideLoading())
    })
  }
}

export function fetchPosts(category) {
  return dispatch => {
    dispatch({type: POSTS_QERUEST})
    dispatch(showLoading())
    return postsFirebaseRef.on("value", (snapshot) => {
      let postsObj = snapshot.val()//.filter((post) => post != undefined)
      const posts = Object.keys(postsObj).map(key => postsObj[key])
      dispatch({type: POSTS_SUCCESS, posts })
      dispatch(hideLoading())
    }, (errorObject) => {
      const errorMessage = errorObject.message
      dispatch({type: POSTS_FAILURE, errorMessage})
      dispatch(hideLoading())
      console.log("The read failed: " + errorMessage)
    })
  }
}


