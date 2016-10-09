import React, { PropTypes, Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { fetchPost } from './../../actions/post'
import './PostDetailPage.scss'

class PostDetailPage extends Component {

  static propTypes = {
    post: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount');
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { fetchPost, params: { id } } = this.props;
    this.props.fetchPost(id);
  }

  componentWillReceiveProps(NextProps) {
    console.log('componentWillReceiveProps', NextProps);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const { post: { data } } = this.props
    return (
      <div>
        <h4>{ data.title }</h4>
        <ReactMarkdown source={ data.content} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    post: state.post
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailPage)
