import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  getStudent,
  insertStudent,
  updateStudent
} from "../../actions/studentActions";

import Main from "../layouts/Main";
import Spinner from "../../components/Spinner";
import isEmpty from "../../utils/is-empty";

import TextFieldGroup from "../../components/TextFieldGroup";

class AddEditStudent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addMode: true,
      id: undefined,
      errors: {},
      student: {
        name: "",
        gender: "",
        dateOfBirth: "",
        contactNo: "",
        email: "",
        address: "",
        class: "",
        section: "",
        joinDate: ""
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

    if (nextProps.student.student) {
      const student = nextProps.student.student;
      student.name = !isEmpty(student.name) ? student.name : "";
      student.address = !isEmpty(student.address) ? student.address : "";
      student.gender = !isEmpty(student.gender) ? student.gender : "";
      student.dateOfBirth = !isEmpty(student.dateOfBirth)
        ? student.dateOfBirth
        : "";
      student.email = !isEmpty(student.email) ? student.email : "";
      student.contactNo = !isEmpty(student.contactNo) ? student.contactNo : "";
      student.joinDate = !isEmpty(student.joinDate) ? student.joinDate : "";
      student.class = !isEmpty(student.class) ? student.class : "";
      student.section = !isEmpty(student.section) ? student.section : "";

      this.setState({
        student
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { addMode, id, student } = this.state;
    if (addMode) {
      this.props.insertStudent(student);
    } else {
      this.props.updateStudent(id, student);
    }
  }

  onChange(e) {
    this.setState({
      student: {
        ...this.state.student,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    const { addMode, errors, student } = this.state;

    //const { student, loading } = this.props.student;
    const loading = false;

    let formContent;
    if (!student || loading) {
      formContent = <Spinner />;
    } else {
      formContent = (
        <form className="form-horizontal" onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="name"
            label="Name"
            placeholder="Student name"
            error={errors.name}
            value={this.state.student.name}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="gender"
            placeholder="Gender"
            error={errors.gender}
            value={student.gender}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="dateOfBirth"
            placeholder="Date of Birth"
            error={errors.dateOfBirth}
            value={student.dateOfBirth}
            type="date"
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="contactNo"
            placeholder="Contact No"
            error={errors.contactNo}
            value={student.contactNo}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="email"
            placeholder="Email"
            error={errors.email}
            value={student.email}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="address"
            placeholder="Address"
            error={errors.address}
            value={student.address}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="joinDate"
            placeholder="Join Date"
            error={errors.joinDate}
            value={student.joinDate}
            onChange={this.onChange}
            type="date"
          />
          <TextFieldGroup
            name="class"
            placeholder="Class"
            error={errors.class}
            value={student.class}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="section"
            placeholder="Section"
            error={errors.section}
            value={student.section}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-info btn-block mb-4"
          />
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
  { getStudent, insertStudent, updateStudent }
)(AddEditStudent);
