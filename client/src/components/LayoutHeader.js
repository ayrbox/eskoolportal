import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import { toogleMenu } from "../actions/uiActions";

import { Layout, Icon } from "antd";
const { Header } = Layout;

class LayoutHeader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  toggleNavigation(e) {
    e.preventDefault();
    const { menuState } = this.props.ui;
    const nextMenuState = menuState === "open" ? "close" : "open"; //need to switch if there are may states

    this.props.toogleMenu(nextMenuState);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className="sidebar-trigger"
          type={
            this.props.ui.menuState === "close" ? "menu-unfold" : "menu-fold"
          }
          onClick={this.toggleNavigation}
        />
        <ul className="nav navbar-top-links navbar-right">
          <li>
            <a onClick={this.onLogout.bind(this)}>
              <i className="fa fa-sign-out" /> Log out
            </a>
          </li>
        </ul>
      </Header>
    );
  }
}

Header.propTypes = {
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
  { logoutUser, clearCurrentProfile, toogleMenu }
)(LayoutHeader);
