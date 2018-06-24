import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import { toogleMenu } from "../actions/uiActions";

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.toggleNavigation = this.toggleNavigation.bind(this);
  }

  toggleNavigation(e) {
    e.preventDefault();
    // $("body").toggleClass("mini-navbar");
    // smoothlyMenu();
    const { menuState } = this.props.ui;
    const nextMenuState = menuState === "open" ? "close" : "open"; //need to switch if there are may states

    document.body.classList.toggle("mini-navbar", nextMenuState === "open");

    this.props.toogleMenu(nextMenuState);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top white-bg"
          style={{ marginBottom: 0, width: "100%" }}
        >
          <div className="navbar-header">
            {/* TODO: close navigation using redux  */}
            <button
              className="navbar-minimalize minimalize-styl-2 btn btn-primary"
              onClick={this.toggleNavigation}
            >
              <i className="fa fa-bars" />
            </button>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a onClick={this.onLogout.bind(this)}>
                <i className="fa fa-sign-out" /> Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
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
)(Header);
