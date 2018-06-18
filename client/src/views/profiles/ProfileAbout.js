import React, { Component } from "react";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //Get first name;
    const firstName = profile.user.name.trim().split(" ")[0];
    return (
      <div className="ibox">
        <div className="ibox-content">
          <h3>About {firstName}</h3>
          <p className="small">{profile.bio}</p>
          <p className="small font-bold">
            <span>
              <i className="fa fa-circle text-navy" /> Online status
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
