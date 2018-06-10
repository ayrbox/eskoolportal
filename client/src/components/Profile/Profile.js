import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCredentials from "./ProfileCredentials";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../Spinner";

import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent =
      profile === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredentials
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGithub githubusername={profile.githubusername} />
          ) : null}
        </div>
      );

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-6" />
          </div>
          {profileContent}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToPros = state => ({
  profile: state.profile
});

export default connect(
  mapStateToPros,
  { getProfileByHandle }
)(Profile);
