import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { createPost } from './../../actions/post'
import './AddPostPage.scss'

class AddPostPage extends Component {
  constructor(props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSummaryChange = this.handleSummaryChange.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.state = {
      title: "",
      content: "",
      category: ""
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const title = this.state.title.trim();
    const content = this.state.content.trim();
    const summary = this.state.summary.trim();
    if(title && content && summary) {
      // submit to server
      this.props.createPost({
        title: title,
        content: content,
        summary: summary,
        category: category
      })
    }
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleSummaryChange(event) {
    this.setState({summary: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Post title</label>
          <input type="text"
            className="form-control"
            placeholder="Enter title"
            value={this.state.title}
            onChange={ this.handleTitleChange }
             />
        </div>

        <div className="form-group">
          <label>Post summary</label>
          <input type="text"
            className="form-control"
            placeholder="Enter summary"
            value={this.state.summary}
            onChange={ this.handleSummaryChange }
             />
        </div>

        <div className="form-group">
          <label>Post category</label>
          <select value={this.state.category} onChange={this.handleCategoryChange}>
            <option value="javascript">javascript</option>
            <option value="ror">ruby on rails</option>
            <option value="others">others</option>
          </select>
        </div>

        <div className="post-content">
          <ul className="nav nav-tabs" role="tablist" id="myTab">
            <li role="presentation" className="active">
              <a href="#Write" role="tab" data-toggle="tab">Write</a>
            </li>
            <li role="presentation">
              <a href="#Preview" role="tab" data-toggle="tab">Preview</a>
            </li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="Write">
              <textarea
                className="form-control"
                placeholder="content"
                value={ this.state.content }
                onChange={ this.handleContentChange } >
              </textarea>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="Preview">
              <div className="preview-content"><ReactMarkdown source={this.state.content} /></div>
            </div>
          </div>
        </div>
        <button type="submit"
                className="btn btn-default"
                disabled={!(this.state.title && this.state.content)}>
          Submit
        </button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (params) => dispatch(createPost(params)),
  }
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPostPage)
