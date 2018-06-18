import React, { Component } from "react";

class ProfileSkills extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="ibox">
        <div className="ibox-content">
          <h3>Primary Skills</h3>
          <ul class="folder-list m-b-md" style={{ padding: "0px" }}>
            {profile.skills.map((s, i) => (
              <li key={i}>
                <div className="p-2">
                  <i class="fa fa-check " /> {s}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileSkills;
