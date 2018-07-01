import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import {
  getStudent,
  insertStudent,
  updateStudent
} from "../../actions/studentActions";

import Main from "../layouts/Main";
import Spinner from "../../components/Spinner";
import isEmpty from "../../utils/is-empty";

import TextFieldGroup from "../../components/TextFieldGroup";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { Button, Table, Breadcrumb, Icon, Divider, Alert } from "antd";
import { Link } from "react-router-dom";

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
      this.props.insertStudent(student, this.props.history);
    } else {
      this.props.updateStudent(id, student, this.props.history);
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

    const { loading } = this.props.student;

    let formContent;
    if (!student || loading) {
      formContent = <Spinner />;
    } else {
      formContent = (
        <form className="form-horizontal" onSubmit={this.onSubmit}>
          <TextFieldGroup
            name="referenceCode"
            label="Reference Code"
            placeholder="Unique Reference code"
            vlaue={errors.referenceCode}
            value={student.referenceCode}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="name"
            label="Name"
            placeholder="Student name"
            error={errors.name}
            value={student.name}
            onChange={this.onChange}
          />
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Gender</label>
            <div className="col-sm-10">
              <FormControl>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={student.gender}
                  onChange={this.onChange}
                  inputProps={{
                    name: "gender",
                    id: "gender"
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <TextFieldGroup
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            defaultValue={moment(student.dateOfBirth).format("YYYY-MM-DD")}
            className="form-control"
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="contactNo"
            label="Contact No"
            error={errors.contactNo}
            value={student.contactNo}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="email"
            label="Email"
            error={errors.email}
            value={student.email}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="address"
            label="Address"
            error={errors.address}
            value={student.address}
            onChange={this.onChange}
          />
          <TextFieldGroup
            id="joinDate"
            name="joinDate"
            label="Join Date"
            type="date"
            defaultValue={moment(student.joinDate).format("YYYY-MM-DD")}
            className="form-control"
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="class"
            label="Class"
            error={errors.class}
            value={student.class}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="section"
            label="Section"
            error={errors.section}
            value={student.section}
            onChange={this.onChange}
          />
          <TextFieldGroup
            name="classRollNo"
            label="Class Roll No:"
            error={errors.section}
            value={student.classRollNo}
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
        <div className="page-header">
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to={"dashboard"}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={"students"}>Students</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{addMode ? "Add" : "Edit"}</Breadcrumb.Item>
          </Breadcrumb>
          <h2>{addMode ? "Add" : "Edit"} Student</h2>
        </div>
        <div
          style={{
            margin: "24px 16px",
            padding: "24px",
            background: "#fff",
            minHeight: 360
          }}
        >
          {formContent}
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
  student: state.student,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getStudent, insertStudent, updateStudent }
)(AddEditStudent);
