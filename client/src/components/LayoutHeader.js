import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import { toogleMenu } from "../actions/uiActions";

import { Layout, Icon, Menu } from "antd";
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

        <div className="pageheader-right">
          <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item />
            <Menu.Item key="3">
              <a onClick={this.onLogout.bind(this)}>
                <Icon type="logout" />
                Log out
              </a>
            </Menu.Item>
          </Menu>
        </div>
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
