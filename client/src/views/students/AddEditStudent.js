import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStudent } from "../../actions/studentActions";

import Main from "../layouts/Main";
import Spinner from "../../components/Spinner";
import isEmpty from "../../utils/is-empty";

class AddEditStudent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addMode: true,
      id: undefined
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      addMode: isEmpty(id),
      id
    });

    this.props.getStudent(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { addMode } = this.state;
    const { student, loading } = this.props.student;

    let formContent;
    if (!student || loading) {
      formContent = <Spinner />;
    } else {
      formContent = (
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={student.name}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Date of Birth: </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                value={student.dateOfBirth}
              />
            </div>
          </div>
        </form>
      );
    }

    return (
      <Main>
        <div className="row wrapper border-bottom white-bg page-heading">
          <div className="col-lg-9 pb-3 pt-3">
            <h2>{addMode ? "Add" : "Edit"} Student</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  Students
                </li>
                <li className="breadcrumb-item">{addMode ? "Add" : "Edit"}</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="wrapper wrapper-content">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Details</h5>
            </div>
            <div className="ibox-content">{formContent}</div>
          </div>
        </div>
      </Main>
    );
  }
}

AddEditStudent.propTypes = {
  student: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  student: state.student
});

export default connect(
  mapStateToProps,
  { getStudent }
)(AddEditStudent);
