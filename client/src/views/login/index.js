import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../../components/TextFieldGroup";

import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    var loginModel = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(loginModel, this.props.history);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
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
          <h3>Welcome to eskoolPortal</h3>
          <p>Simple school management designed for teachers.</p>
          <p>Login in. To see it in action.</p>
          <form noValidate onSubmit={this.onSubmit} className="m-t">
            <TextFieldGroup
              type="email"
              name="email"
              placeholder="Email"
              error={errors.email}
              value={this.state.email}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="password"
              name="password"
              placeholder="Password"
              error={errors.password}
              value={this.state.password}
              onChange={this.onChange}
            />
            <input
              type="submit"
              className="btn btn-primary block full-width m-b"
              value="Login"
            />
            <Link to="/forgotpassword">Forgot Password</Link>

            <p className="text-muted text-center">
              <small>Do not have an account?</small>
            </p>
            <Link
              to="/register"
              className="btn btn-sm btn-white btn-block"
              href="register.html"
            >
              Create an account
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
