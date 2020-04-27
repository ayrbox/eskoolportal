import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../../components/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const registerModel = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };

    this.props.registerUser(registerModel, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">esk+</h1>
          </div>
          <h3 className="display-4 text-center">Sign Up</h3>
          <p className="lead text-center">
            Create your <strong>eskoolportal</strong> free account.
          </p>
          <form onSubmit={this.onSubmit} noValidate>
            <TextFieldGroup
              name="name"
              placeholder="Name"
              error={errors.name}
              value={this.state.name}
              onChange={this.onChange}
            />
            <TextFieldGroup
              name="email"
              type="email"
              placeholder="Email"
              error={errors.email}
              value={this.state.email}
              onChange={this.onChange}
              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
            />

            <TextFieldGroup
              name="password"
              type="password"
              placeholder="Password"
              error={errors.password}
              value={this.state.password}
              onChange={this.onChange}
            />
            <TextFieldGroup
              name="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              error={errors.passwordConfirm}
              value={this.state.passwordConfirm}
              onChange={this.onChange}
            />
            <input
              type="submit"
              className="btn btn-primary block full-width m-b"
              value="Register"
            />
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
