import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

class Navigation extends Component {
  componentDidMount() {
    const { menu } = this.refs;
    // $(menu).metisMenu();
  }

  render() {
    const { user } = this.props.auth;

    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <ul className="nav flex-column metismenu" id="side-menu" ref="menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear">
                  <span className="block m-t-xs">
                    <strong className="font-bold">{user.name}</strong>
                  </span>
                </span>
              </a>
              <ul className="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a href="#"> Logout</a>
                </li>
              </ul>
            </div>
            <div className="logo-element">IN+</div>
          </li>

          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="fa fa-th-large" />
              <span className="nav-label">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/minor" className="nav-link">
              <i className="fa fa-th-large" />
              <span className="nav-label">Minor view</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navigation);
