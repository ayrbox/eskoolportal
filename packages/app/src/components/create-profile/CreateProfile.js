import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../TextFieldGroup";
import TextAreaGroup from "../TextAreaGroup";
import SelectField from "../SelectField";
import InputGroup from "../InputGroup";

import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInput: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInput } = this.state;

    let socialInputs;
    if (displaySocialInput) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="facebook profile url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="linkedin profile url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="youtube profile url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="instagram profile url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    //select option for status
    const options = [
      { label: "*Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your profile</h1>
              <p className="lead text-center">
                Let'g get some ifnormation to make your porfile statnd out
              </p>
              <small className="d-block pb-3">* - required field</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Profile handle"
                  value={this.state.handle}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                  onChange={this.onChange}
                />

                <SelectField
                  name="status"
                  placeholder="Status"
                  value={this.state.status}
                  error={errors.status}
                  options={options}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  error={errors.website}
                  info="Your website"
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="location"
                  placeholder="location"
                  value={this.state.location}
                  error={errors.location}
                  info="Your Location"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="skills"
                  value={this.state.skills}
                  error={errors.skills}
                  info="Your skills separated by comman (hTML, css, javascript)"
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name="githubusername"
                  placeholder="githubusername"
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  info="Your githubusername"
                  onChange={this.onChange}
                />

                <TextAreaGroup
                  name="bio"
                  placeholder="bio"
                  value={this.state.bio}
                  error={errors.bio}
                  info="Your bio"
                  onChange={this.onChange}
                />

                <div className="mb-3">
                  <button
                    onClick={e => {
                      e.preventDefault();
                      this.setState(prevState => ({
                        displaySocialInput: !prevState.displaySocialInput
                      }));
                    }}
                    className="btn btn-outline-primary"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted"> (Optional)</span>
                </div>

                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
