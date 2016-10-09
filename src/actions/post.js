import {
  POST_QERUEST, POST_SUCCESS, POST_FAILURE,
  POSTS_QERUEST, POSTS_SUCCESS, POSTS_FAILURE
} from './../constants/actionTypes';
import { FirebaseBaseRef } from "../initFirebase";

const postsFirebaseRef = FirebaseBaseRef.ref("posts")

export function fetchPost(id) {
  return dispatch => {
    dispatch({type: POST_QERUEST})
    return postsFirebaseRef.child(id).on("value", (snapshot) => {
      let post = snapshot.val()
      dispatch({type: POST_SUCCESS, post })
    }, (errorObject) => {
      dispatch({type: POST_FAILURE, error: errorObject.message});
      console.log("The read failed: " + errorObject.code);
    })
  }
}

export function createPost(params) {
  return dispatch => {
    dispatch({type: POSTS_QERUEST})
    const newPostRef = postsFirebaseRef.push()
    return newPostRef.set({
      id: newPostRef.key,
      created_at: Firebase.ServerValue.TIMESTAMP,
      ...params
    }, (error) => {
      if(error){
        dispatch({type: POSTS_SUCCESS, posts })
      } else {
        dispatch({type: POSTS_FAILURE, error: error});
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
      dispatch({type: POSTS_FAILURE, error: errorObject.message});
      console.log("The read failed: " + errorObject.code);
    })
  }
}


