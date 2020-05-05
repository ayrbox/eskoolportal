import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../utils/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle img-fluid"
              src={profile.user.avatar}
              alt="Profile Avatar"
            />
          </div>

          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}
              {isEmpty(profile.company) ? null : (
                <span>@ {profile.company}</span>
              )}
            </p>
            {isEmpty(profile.location) ? null : (
              <p>
                <i className="fa fa-map-marker" /> {profile.location}
              </p>
            )}
            <Link
              to={`/profile/${profile.handle}`}
              className="btn btn-primary btn-outline btn-sm"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <table className="table">
              <thead>
                <tr>
                  <th>Skill Set</th>
                </tr>
              </thead>
              <tbody>
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <tr key={index}>
                    <td>
                      <i className="fa fa-check pr-2" />
                      {skill}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="list-group" />
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
