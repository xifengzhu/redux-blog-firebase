import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Navbar from "./../Navbar/Navbar";
import { Link } from 'react-router';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    const MENU_ITEMS = [
      { name: "全部分类",
        link: "/posts?category=all",
        iconClass: "fa fa-home fa-fw"
      },
      { name: "javascript",
        link: "/posts?category=javascript",
        iconClass: "fa fa-book fa-fw"
      },
      { name: "ruby on rails",
        link: "/posts?category=ror" ,
        iconClass: "fa fa-book fa-fw"
      },
      { name: "others",
        link: "/posts?category=others",
        iconClass: "fa fa-book fa-fw"
      }
    ]
    return (
      <div id="wrapper">
        <Navbar />
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a href="#">
                xifengzhu's blog
              </a>
            </li>
            <li>
              { MENU_ITEMS.map(menu =>
                <Link
                  key={menu.name}
                  to={`${ menu.link }`}
                  activeClassName="active">
                  <i className={ `${menu.iconClass}` }></i> &nbsp;&nbsp;&nbsp;&nbsp;
                  {menu.name}
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { routing } = state;

  return {
    routing
  };
}

export default connect(mapStateToProps)(App);
