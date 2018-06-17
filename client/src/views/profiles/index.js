import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../../components/Spinner";

import ProfileItem from "./ProfileItem";

import { getProfiles } from "../../actions/profileActions";

import Main from "../layouts/Main";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;

    let profileItems;
    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found.</h4>;
      }
    }

    return (
      <Main>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-9 pb-3 pt-3">
            <h2>Teacher Profiles</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Profiles
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="wrapper wrapper-content">
          <div className="row">
            <div className="col-12">{profileItems}</div>
          </div>
        </div>
      </Main>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
