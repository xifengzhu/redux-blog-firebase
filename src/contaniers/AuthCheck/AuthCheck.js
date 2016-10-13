import React from 'react'
import { firebaseRef } from "../../initFirebase"

const AuthCheck = (nextState, replace, callback) => {
  if(firebaseRef.auth().currentUser == null){
    replace("/")
  }
  callback()
}

export default AuthCheck
