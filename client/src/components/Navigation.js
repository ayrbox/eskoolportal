import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import classnames from "classnames";

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profileDropdown: false
    };

    this.onToggleDropdown = this.onToggleDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  onToggleDropdown(e) {
    e.preventDefault();
    this.setState(prevState => ({
      profileDropdown: !prevState.profileDropdown
    }));
  }

  render() {
    const { user } = this.props.auth;

    return (
      <nav className="navbar-default navbar-static-side">
        <ul className="nav flex-column metismenu" id="side-menu" ref="menu">
          <li className="nav-header">
            <div className="text-center profile-element">
              <span>
                <img
                  src={user.avatar}
                  alt={user.name}
                  title="You must have gravatar for email"
                  style={{ width: "64px" }}
                  className="rounded-circle"
                />
              </span>

              <div className="dropdown">
                <a
                  className="btn btn-link dropdown-toggle"
                  role="button"
                  onClick={this.onToggleDropdown}
                >
                  {user.name}
                </a>

                <div
                  className={classnames("dropdown-menu", {
                    show: this.state.profileDropdown
                  })}
                  aria-labelledby="dropdownMenuLink"
                >
                  <a className="dropdown-item">Profile</a>
                  <a className="dropdown-item">Change password</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" onClick={this.handleLogout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="fa fa-th-large" />
              <span className="nav-label">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profiles" className="nav-link">
              <i className="fa fa-th-large" />
              <span className="nav-label">Teachers</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feed">
              <i className="fa fa-list" />{" "}
              <span className="nav-label">Post Feed</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/students">
              <i className="fa fa-user" />
              <span className="nav-label">Students</span>
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
  auth: state.auth,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navigation);
