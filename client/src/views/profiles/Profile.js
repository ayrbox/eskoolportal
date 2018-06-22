import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileSkills from "./ProfileSkills";
import ProfileCredentials from "./ProfileCredentials";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../../components/Spinner";

import { getProfileByHandle } from "../../actions/profileActions";

import Main from "../layouts/Main";

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
          <div className="row">
            <div className="col-md-6">
              <ProfileAbout profile={profile} />
            </div>
            <div className="col-md-6">
              <ProfileSkills profile={profile} />
            </div>
          </div>
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
      <Main>
        <div className="wrapper wrapper-content profile">{profileContent}</div>
      </Main>
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
