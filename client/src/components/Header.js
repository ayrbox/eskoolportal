import React from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

class Header extends React.Component {
  toggleNavigation(e) {
    e.preventDefault();
    // $("body").toggleClass("mini-navbar");
    // smoothlyMenu();
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
          role="navigation"
          style={{ marginBottom: 0, width: "100%" }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary "
              onClick={this.toggleNavigation}
              href="#"
            >
              <i className="fa fa-bars" />{" "}
            </a>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);
