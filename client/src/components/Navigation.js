import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import {
  getCurrentProfile,
  clearCurrentProfile
} from "../actions/profileActions";
import classnames from "classnames";

import { Menu, Layout, Icon } from "antd";
const { Sider } = Layout;

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profileDropdown: false
    };

    this.onToggleDropdown = this.onToggleDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
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
    const { profile } = this.props.profile;

    return (
      <Sider>
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
              {profile ? (
                <Link
                  to={`/profile/${profile.handle}`}
                  className="dropdown-item"
                >
                  Profile
                </Link>
              ) : null}
              <a className="dropdown-item">Change password</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={this.handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/dashboard" className="nav-link">
              <Icon type="home" />
              <span className="nav-label">Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/profiles" className="nav-link">
              <i className="fa fa-th-large" />
              <span className="nav-label">Teachers</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link className="nav-link" to="/feed">
              <i className="fa fa-list" />{" "}
              <span className="nav-label">Post Feed</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link className="nav-link" to="/students">
              <i className="fa fa-user" />
              <span className="nav-label">Students</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
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
  ui: state.ui,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getCurrentProfile }
)(Navigation);
