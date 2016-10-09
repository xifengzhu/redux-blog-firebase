import { firebaseRef } from "../initFirebase"

// 统一声明默认State
export default {
  post: {
    isFetching: false,
    data: {
      title: "",
      content: ""
    }
  },
  posts: {
    isFetching: false,
    data: []
  },
  auth: {
    errorMessage: '',
    isFetching: false,
    isAuth: false,
    currentUser: firebaseRef.auth().currentUser
  }
};
