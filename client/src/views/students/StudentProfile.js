import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStudent } from "../../actions/studentActions";
import Spinner from "../../components/Spinner";
import Main from "../layouts/Main";

class StudentProfile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getStudent(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { student } = this.props.student;

    return (
      <Main>
        <h1>{id}</h1>
        <pre>{JSON.stringify(student, null, 2)}</pre>
      </Main>
    );
  }
}

StudentProfile.propType = {
  student: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  student: state.student
});

export default connect(
  mapStateToProps,
  { getStudent }
)(StudentProfile);
