import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCredentials extends Component {
  render() {
    const { experience, education } = this.props;

    return (
      <div className="row">
        <div className="col-md-6">
          <div className="ibox">
            <div className="ibox-content">
              <h3>Experience</h3>
              <div class="feed-activity-list">
                {experience.map(exp => (
                  <div class="feed-element" key={exp._id}>
                    <div class="media-body ">
                      <span className="pull-right">
                        <Moment format="MMM YYYY">{exp.from}</Moment>
                        {" - "}
                        {exp.current ? (
                          "Current"
                        ) : (
                          <Moment format="MMM YYYY">{exp.to}</Moment>
                        )}
                      </span>
                      <h4>{exp.company}</h4>
                      <p>
                        <strong>Position:</strong> {exp.title}
                      </p>
                      <p>
                        <strong>Description:</strong> {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="ibox">
            <div className="ibox-content">
              <h3>Education</h3>
              <div class="feed-activity-list">
                {education.map(edu => (
                  <div className="feed-element" key={edu._id}>
                    <div class="media-body ">
                      <span className="pull-right">
                        <Moment format="MMM YYYY">{edu.from}</Moment>
                        {" - "}
                        {edu.current ? (
                          "Current"
                        ) : (
                          <Moment format="MMM YYYY">{edu.to}</Moment>
                        )}
                      </span>
                      <h4>{edu.school}</h4>
                      <p>
                        <strong>Degree: </strong>
                        {edu.degree}
                      </p>
                      <p>
                        <strong>Field Of Study: </strong>
                        {edu.fieldofstudy}
                      </p>
                      <p>
                        <strong>Description:</strong> {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCredentials;
