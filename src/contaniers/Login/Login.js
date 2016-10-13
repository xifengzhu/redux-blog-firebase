import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { login, signup } from './../../actions/auth'
import Modal from 'react-modal'

import './Login.scss'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '30%'
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.state = {
      email: '',
      password: '',
      modalIsOpen: false,
      username: ''
    }
  }

  handleSubmit(event, type) {
    event.preventDefault()
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    const username = this.state.username.trim()
    if(email && password) {
      if(type == 'login'){
        this.props.login({email: email, password: password})
      } else {
        if(username) {
          this.props.signup({email: email, password: password, username: username})
        }
      }
    }
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      this.props.pushState('/');
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const errorMessage = this.props.errorMessage
    return (
      <div>
        { errorMessage &&
          <div className="alert alert-danger">{ errorMessage }</div>
        }
        <input
          type='text'
          className="form-control"
          value={this.state.email}
          onChange={ this.handleEmailChange }
          placeholder='Email'/>
        <input
          type='password'
          className="form-control"
          placeholder='Password'
          value={this.state.password}
          onChange={ this.handlePasswordChange } />
        <button
          onClick={(event) => this.handleSubmit(event, 'login')}
          className="btn btn-primary">
          Login
        </button>
        <a href="####" onClick={this.openModal}>Sign Up</a>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">Sign Up</h2>
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type='text'
                className="form-control"
                value={this.state.email}
                onChange={ this.handleEmailChange }
                placeholder='Email'/>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type='text'
                className="form-control"
                value={this.state.username}
                onChange={ this.handleUsernameChange } />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type='password'
                className="form-control"
                placeholder='Password'
                value={this.state.password}
                onChange={ this.handlePasswordChange } />
            </div>
            { errorMessage &&
              <div className="alert alert-danger">{ errorMessage }</div>
            }
            <div className="form-group">
              <button className="btn btn-primary pull-right" onClick={ (event) => this.handleSubmit(event, 'signup') }>Submit</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { errorMessage, isAuth  } = state.auth
  return {
    errorMessage,
    isAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (params) => dispatch(login(params)),
    signup: (params) => dispatch(signup(params)),
    pushState: (location) => dispatch(push(location))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
