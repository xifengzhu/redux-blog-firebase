import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchPosts } from './../../actions/post'
import moment from 'moment'

import './PostsPage.scss'

class PostsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount')
    const category = this.props.location.query.category
    this.props.fetchPosts(category)
  }

  componentWillReceiveProps(NextProps) {
    console.log('componentWillReceiveProps', NextProps)
    if(this.props.location.query != NextProps.location.query){
      const category = NextProps.location.query.category
      this.props.fetchPosts(category)
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const { posts: { data } } = this.props
    return (
      <div className="contanier posts-list">
        { data.map((post) =>
          <div key={post.id} className="panel panel-default">
            <div className="panel-heading">
              <Link to={ `/posts/${post.id}` } className="heading-link" >
                { post.title }
              </Link>
            </div>
            <div className="panel-body">
              <span title="文章分类">
                <i className="fa fa-map-signs"></i>
                <a className="category-name">{ post.category || " None" }</a>
              </span>
              <span className="margin-left-20" title="发布时间">
                <i className="fa fa-clock-o"></i>
                <span className="publish-time">{ moment(post.created_at).format("YYYY-MM-DD") }</span>
              </span>
              <p className="post-summary"> { post.summary } </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsPage);
