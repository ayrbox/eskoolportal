import React, { Component } from "react";
import isEmpty from "../../utils/is-empty";
import ProfileIconLink from "./ProfileIconLink";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    const links = [
      {
        key: "website",
        link: profile.website,
        icon: "fas fa-globe"
      },
      {
        key: "twitter",
        link: profile.social.twitter,
        icon: "fab fa-twitter"
      },
      {
        key: "youtube",
        link: profile.social.youtube,
        icon: "fab fa-youtube"
      },
      {
        key: "linkedin",
        link: profile.social.linkedin,
        icon: "fab fa-linkedin"
      },
      {
        key: "facebook",
        link: profile.social.facebook,
        icon: "fab fa-facebook"
      },
      {
        key: "instagram",
        link: profile.social.instagram,
        icon: "fab fa-instagram"
      }
    ];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}
                {isEmpty(
                  profile.company ? null : <span> at {profile.company}</span>
                )}
              </p>

              {isEmpty(profile.location) ? null : <p> {profile.location}</p>}

              <p>{links.map(l => <ProfileIconLink key={l.key} {...l} />)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
