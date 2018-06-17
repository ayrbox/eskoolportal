import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getGithubProfile } from "../../actions/githubActions";
import Spinner from "../../components/Spinner";

class ProfileGithub extends Component {
  componentDidMount() {
    this.props.getGithubProfile();
  }
  render() {
    const { loading, repos, errors } = this.props.github;
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {loading ? (
          <Spinner />
        ) : repos.length > 0 ? (
          <div key={"/repo/id"} className="card card-body mb-2">
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <Link
                    to={"/repo/github"}
                    className="text-info"
                    target="_blank"
                  >
                    {" "}
                    Repository One
                  </Link>
                </h4>
                <p>Repository description</p>
              </div>
              <div className="col-md-6">
                <span className="badge badge-info mr-1">Stars: 44</span>
                <span className="badge badge-secondary mr-1">Watchers: 21</span>
                <span className="badge badge-success">Forks: 122</span>
              </div>
            </div>
          </div>
        ) : null}
        {errors ? <pre>{JSON.stringify(errors)}</pre> : null}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  getGithubProfile: PropTypes.func.isRequired,
  githubusername: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  github: state.github
});

export default connect(
  mapStateToProps,
  { getGithubProfile }
)(ProfileGithub);
