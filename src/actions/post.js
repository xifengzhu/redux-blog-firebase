import {
  POST_QERUEST, POST_SUCCESS, POST_FAILURE,
  POSTS_QERUEST, POSTS_SUCCESS, POSTS_FAILURE
} from './../constants/actionTypes'
import { push } from 'react-router-redux';
import { FirebaseBaseRef } from "../initFirebase"
import firebase from 'firebase'

const postsFirebaseRef = FirebaseBaseRef.ref("posts")

export function fetchPost(id) {
  return dispatch => {
    dispatch({type: POST_QERUEST})
    return postsFirebaseRef.child(id).on("value", (snapshot) => {
      let post = snapshot.val()
      dispatch({type: POST_SUCCESS, post })
    }, (errorObject) => {
      const errorMessage = errorObject.message
      dispatch({type: POST_FAILURE, errorMessage});
      console.log("The read failed: " + errorMessage);
    })
  }
}

export function createPost(params) {
  return dispatch => {
    dispatch({type: POSTS_QERUEST})
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
        dispatch({type: POSTS_FAILURE, errorMessage});
      }
    })
  }
}

export function fetchPosts(category) {
  return dispatch => {
    dispatch({type: POSTS_QERUEST})
    return postsFirebaseRef.on("value", (snapshot) => {
      let postsObj = snapshot.val()//.filter((post) => post != undefined)
      const posts = Object.keys(postsObj).map(key => postsObj[key])
      dispatch({type: POSTS_SUCCESS, posts })
    }, (errorObject) => {
      const errorMessage = errorObject.message
      dispatch({type: POSTS_FAILURE, errorMessage});
      console.log("The read failed: " + errorMessage);
    })
  }
}


