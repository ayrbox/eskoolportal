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

import { Menu, Layout, Icon, Dropdown } from "antd";
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

    const userProfileMenu = (
      <Menu>
        {profile ? (
          <Menu.Item>
            <Link to={`/profile/${profile.handle}`} className="dropdown-item">
              Profile
            </Link>
          </Menu.Item>
        ) : null}
        <Menu.Item>
          <a className="dropdown-item">Change password</a>
        </Menu.Item>
        <Menu.Item>
          <a className="dropdown-item" onClick={this.handleLogout}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.ui.menuState === "close"}
      >
        <div className="text-center profile-area">
          <span>
            <img
              src={user.avatar}
              alt={user.name}
              title="You must have gravatar for email"
              style={{ width: "64px" }}
              className="rounded-circle"
            />
          </span>
          <br />
          <Dropdown
            overlay={userProfileMenu}
            trigger={["click"]}
            placement="bottomCenter"
          >
            <a className="ant-dropdown-link" href="#">
              {user.name} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/dashboard">
              <Icon type="desktop" />
              <span className="nav-label"> Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/profiles">
              <Icon type="profile" />
              <span className="nav-label"> Teachers</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/feed">
              <Icon type="file-text" />
              <span className="nav-label"> Post Feed</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/students">
              <Icon type="user" />
              <span className="nav-label"> Students</span>
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
