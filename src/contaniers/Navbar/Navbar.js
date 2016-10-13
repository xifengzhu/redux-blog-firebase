import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import './Navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('Navbar componentWillMount');
  }

  componentDidMount() {
    console.log('Navbar componentDidMount')
  }

  componentWillReceiveProps(NextProps) {
    console.log('Navbar componentWillReceiveProps', NextProps)
  }

  componentWillUnmount() {
    console.log('Navbar componentWillUnmount');
  }

  render() {
    const isAuth = this.props.isAuth
    const currentUser = this.props.currentUser
    const linkTo = isAuth ? "/" : "/login"
    const linkText = isAuth ? `${currentUser.displayName}` : "Login"
    return (
      <header>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to={ "/" } className="navbar-brand">
                Blog
              </Link>
            </div>
            <ul className="nav navbar-nav pull-right">
              <li>
                <Link to={ linkTo }>
                  { linkText }
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

Navbar.propTypes = {
};

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    currentUser: state.auth.currentUser
  };
}

export default connect(mapStateToProps)(Navbar);
