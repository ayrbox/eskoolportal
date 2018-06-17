import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../../components/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "../../components/Experience";
import Education from "../../components/Education";

import Main from "../layouts/Main";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onDeleteProfile = this.onDeleteProfile.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteProfile() {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="load text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>

            <ProfileActions />

            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div style={{ marginBottom: "60px" }}>
              <button className="btn btn-danger" onClick={this.onDeleteProfile}>
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        //User login without content
        dashboardContent = (
          <div>
            <p className="load text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <Main>
        <div className="dashboard wrapper wrapper-content animated fadeInRight">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center m-t-lg">
                  <h1>Dashboard</h1>
                </div>
              </div>
              <div className="col-lg-12">{dashboardContent}</div>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
