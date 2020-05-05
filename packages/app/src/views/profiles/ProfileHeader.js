import React, { Component } from "react";
import isEmpty from "../../utils/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row row m-b-lg m-t-lg">
        <div className="col-md-12">
          <div className="profile-image">
            <img
              className="rounded-circle circle-border m-b-md"
              alt="profile"
              src={profile.user.avatar}
            />
          </div>

          <div className="profile-info">
            <div className="">
              <div>
                <h2 className="no-margins">{profile.user.name}</h2>
                <h4>
                  {profile.status}
                  {isEmpty(profile.company) ? null : (
                    <span> at {profile.company}</span>
                  )}
                </h4>
                <small>{profile.bio}</small>

                {isEmpty(profile.location) ? null : (
                  <p>
                    <i className="fa fa-map-marker" /> {profile.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
