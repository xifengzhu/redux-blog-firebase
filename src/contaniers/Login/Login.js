import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { login } from './../../actions/auth'
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    if(email && password) {
      this.props.login({email: email, password: password})
    }
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuth) {
      this.props.pushState('/');
    }
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
          onClick={(event) => this.handleSubmit(event)}
          className="btn btn-primary">
          Login
        </button>
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
    pushState: (location) => dispatch(push(location))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
