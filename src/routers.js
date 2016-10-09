import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './contaniers/App/App'
import AuthCheck from './contaniers/AuthCheck/AuthCheck'
import PostsPage from './contaniers/PostsPage/PostsPage'
import PostDetailPage from './contaniers/PostDetailPage/PostDetailPage'
import AddPostPage from './contaniers/AddPostPage/AddPostPage'
import Login from './contaniers/Login/Login'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsPage}/>
    <Route path="/posts" component={PostsPage}/>
    <Route path="/posts/new" component={AddPostPage} onEnter={AuthCheck}/>
    <Route path="/posts/:id" component={PostDetailPage}/>
    <Route path="/login" component={Login}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
